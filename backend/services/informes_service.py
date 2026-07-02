from sqlalchemy.orm import Session
from datetime import datetime

from models.historico import MovimientoCaja
from services.cierre_fiscal_service import cierre_mensual, cierre_trimestral
from services.iva_service import modelo_390, prevision_iva
from services.logs_service import registrar_log


# ---------------------------------------------------------
# INFORME DE VENTAS
# ---------------------------------------------------------

def informe_ventas(db: Session, desde: datetime, hasta: datetime):
    movimientos = db.query(MovimientoCaja).filter(
        MovimientoCaja.fecha_venta >= desde,
        MovimientoCaja.fecha_venta <= hasta
    ).all()

    # Log interno opcional
    registrar_log(
        db,
        tipo="INFORME",
        accion="generar informe ventas",
        usuario="system",
        datos={"desde": str(desde), "hasta": str(hasta), "movimientos": len(movimientos)}
    )

    return [
        {
            "fecha": m.fecha_venta,
            "ticket": m.ticket_id,
            "concepto": m.concepto,
            "categoria": m.categoria,
            "cantidad": m.cantidad,
            "subtotal": m.subtotal,
            "iva": m.iva_cuota,
            "total": m.total_linea,
            "empleado": m.empleado,
            "cliente": m.cliente,
        }
        for m in movimientos
    ]


# ---------------------------------------------------------
# CIERRES FISCALES
# ---------------------------------------------------------

def generar_informe_cierre_mensual(db: Session, year: int, month: int):
    datos = cierre_mensual(db, year, month)

    registrar_log(
        db,
        tipo="CIERRE FISCAL",
        accion="cierre mensual",
        usuario="system",
        datos={"year": year, "month": month, "movimientos": datos.get("movimientos")}
    )

    return guardar_informe(db, f"Cierre mensual {month}/{year}", datos)


def generar_informe_cierre_trimestral(db: Session, year: int, quarter: int):
    datos = cierre_trimestral(db, year, quarter)

    registrar_log(
        db,
        tipo="CIERRE FISCAL",
        accion="cierre trimestral",
        usuario="system",
        datos={"year": year, "quarter": quarter, "movimientos": datos.get("movimientos")}
    )

    return guardar_informe(db, f"Cierre trimestral T{quarter} {year}", datos)


def generar_informe_cierre_anual(db: Session, year: int):
    datos = modelo_390(db, year)

    registrar_log(
        db,
        tipo="CIERRE FISCAL",
        accion="cierre anual",
        usuario="system",
        datos={"year": year}
    )

    return guardar_informe(db, f"Cierre anual {year}", datos)


def generar_informe_modelo_390(db: Session, year: int):
    datos = modelo_390(db, year)

    registrar_log(
        db,
        tipo="MODELO 390",
        accion="modelo 390",
        usuario="system",
        datos={"year": year}
    )

    return guardar_informe(db, f"Modelo 390 {year}", datos)


def generar_informe_prevision_iva(db: Session, year: int, month: int):
    datos = prevision_iva(db, year, month)

    registrar_log(
        db,
        tipo="IVA",
        accion="previsión IVA",
        usuario="system",
        datos={"year": year, "month": month}
    )

    return guardar_informe(db, f"Previsión IVA {month}/{year}", datos)


# ---------------------------------------------------------
# GUARDAR INFORME EN BD
# ---------------------------------------------------------

def guardar_informe(db: Session, nombre: str, datos: dict):
    from models.informes import Informe

    informe = Informe(
        nombre=nombre,
        fecha=datetime.now().strftime("%Y-%m-%d"),
        contenido=datos
    )

    db.add(informe)
    db.commit()
    db.refresh(informe)

    registrar_log(
        db,
        tipo="INFORME",
        accion="guardar informe",
        usuario="system",
        datos={"nombre": nombre}
    )

    return informe
