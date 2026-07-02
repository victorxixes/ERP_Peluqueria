import pandas as pd
from sqlalchemy.orm import Session
from models.excel_import import ExcelImport
from services.catalogo_service import registrar_item_catalogo
from datetime import datetime

def procesar_excel(db: Session, file_path: str):
    df = pd.read_excel(file_path)

    registros = []

    for _, row in df.iterrows():
        fecha = pd.to_datetime(row["fecha"]).date()
        tipo_venta = row["tipo_venta"]
        medio_pago = row["medio_pago"]
        descripcion = row.get("descripcion", "")
        importe = float(row["importe"])

        # IVA 21%
        base = round(importe / 1.21, 2)
        iva = round(importe - base, 2)

        registro = ExcelImport(
            fecha=fecha,
            tipo_venta=tipo_venta,
            medio_pago=medio_pago,
            descripcion=descripcion,
            importe=importe,
            base_imponible=base,
            iva_repercutido=iva,
            mes=fecha.month,
            año=fecha.year,
        )

        db.add(registro)
        registros.append(registro)

        # 🔥 INTEGRACIÓN CATÁLOGO DINÁMICO
        registrar_item_catalogo(
            db=db,
            nombre=descripcion,
            categoria=tipo_venta,
            tipo="servicio" if tipo_venta.lower() != "producto" else "producto",
            precio=importe,
            fecha=fecha,
        )

    db.commit()

    return {
        "total_registros": len(registros),
        "total_importe": sum(r.importe for r in registros),
        "total_iva": sum(r.iva_repercutido for r in registros),
    }
