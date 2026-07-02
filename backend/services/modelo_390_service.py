from sqlalchemy.orm import Session
from models.historico import MovimientoCaja
from datetime import datetime


def modelo_390(db: Session, year: int):
    fecha_inicio = datetime(year, 1, 1)
    fecha_fin = datetime(year, 12, 31)

    movimientos = db.query(MovimientoCaja).filter(
        MovimientoCaja.fecha_venta >= fecha_inicio,
        MovimientoCaja.fecha_venta <= fecha_fin
    ).all()

    total_base = sum(m.subtotal or 0 for m in movimientos)
    total_iva = sum(m.iva_cuota or 0 for m in movimientos)
    total_facturado = sum(m.total_linea or 0 for m in movimientos)

    return {
        "year": year,
        "base_imponible": total_base,
        "iva_devengado": total_iva,
        "total_facturado": total_facturado,
        "movimientos": len(movimientos)
    }
