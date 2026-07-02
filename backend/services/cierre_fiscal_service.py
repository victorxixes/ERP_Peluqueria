from sqlalchemy.orm import Session
from datetime import datetime

from models.historico import MovimientoCaja
from services.logs_service import registrar_log


def cierre_mensual(db: Session, year: int, month: int):
    fecha_inicio = datetime(year, month, 1)
    fecha_fin = datetime(year, month, 31)

    movimientos = db.query(MovimientoCaja).filter(
        MovimientoCaja.fecha_venta >= fecha_inicio,
        MovimientoCaja.fecha_venta <= fecha_fin
    ).all()

    base = sum(m.subtotal or 0 for m in movimientos)
    iva = sum(m.iva_cuota or 0 for m in movimientos)
    total = sum(m.total_linea or 0 for m in movimientos)

    datos = {
        "year": year,
        "month": month,
        "base": base,
        "iva": iva,
        "total": total,
        "movimientos": len(movimientos)
    }

    # Log interno del cálculo
    registrar_log(
        db,
        tipo="CIERRE FISCAL",
        accion="calculo cierre mensual",
        usuario="system",
        datos=datos
    )

    return datos


def cierre_trimestral(db: Session, year: int, quarter: int):
    meses = {
        1: (1, 3),
        2: (4, 6),
        3: (7, 9),
        4: (10, 12)
    }

    inicio, fin = meses[quarter]

    fecha_inicio = datetime(year, inicio, 1)
    fecha_fin = datetime(year, fin, 31)

    movimientos = db.query(MovimientoCaja).filter(
        MovimientoCaja.fecha_venta >= fecha_inicio,
        MovimientoCaja.fecha_venta <= fecha_fin
    ).all()

    base = sum(m.subtotal or 0 for m in movimientos)
    iva = sum(m.iva_cuota or 0 for m in movimientos)
    total = sum(m.total_linea or 0 for m in movimientos)

    datos = {
        "year": year,
        "quarter": quarter,
        "base": base,
        "iva": iva,
        "total": total,
        "movimientos": len(movimientos)
    }

    # Log interno del cálculo
    registrar_log(
        db,
        tipo="CIERRE FISCAL",
        accion="calculo cierre trimestral",
        usuario="system",
        datos=datos
    )

    return datos
