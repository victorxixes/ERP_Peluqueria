from sqlalchemy.orm import Session
from models.historico import MovimientoCaja
from datetime import datetime


def generar_alertas(db: Session):
    hoy = datetime.now()
    mes_inicio = datetime(hoy.year, hoy.month, 1)

    movimientos = db.query(MovimientoCaja).filter(
        MovimientoCaja.fecha_venta >= mes_inicio,
        MovimientoCaja.fecha_venta <= hoy
    ).all()

    total_mes = sum(m.total_linea or 0 for m in movimientos)
    iva_mes = sum(m.iva_cuota or 0 for m in movimientos)

    alertas = []

    # Alerta: caída de facturación
    if total_mes < 2000:
        alertas.append("⚠ Facturación baja este mes (<2000€).")

    # Alerta: IVA alto
    if iva_mes > 1000:
        alertas.append("⚠ IVA elevado este mes (>1000€).")

    # Alerta: demasiada venta de productos
    productos = [m for m in movimientos if m.categoria and "producto" in m.categoria.lower()]
    if len(productos) > 50:
        alertas.append("⚠ Se han vendido muchos productos este mes (>50).")

    return alertas
