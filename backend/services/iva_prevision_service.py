from sqlalchemy.orm import Session
from models.historico import MovimientoCaja
from datetime import datetime, timedelta


def prevision_iva(db: Session):
    """
    Calcula previsión de IVA del trimestre actual.
    """
    hoy = datetime.now()
    trimestre_inicio = datetime(hoy.year, ((hoy.month - 1) // 3) * 3 + 1, 1)

    movimientos = db.query(MovimientoCaja).filter(
        MovimientoCaja.fecha_venta >= trimestre_inicio,
        MovimientoCaja.fecha_venta <= hoy
    ).all()

    dias_transcurridos = (hoy - trimestre_inicio).days or 1
    dias_totales = 90  # trimestre estándar

    total_iva_actual = sum(m.iva_cuota or 0 for m in movimientos)
    total_base_actual = sum(m.subtotal or 0 for m in movimientos)

    # Proyección lineal
    factor = dias_totales / dias_transcurridos
    prevision_iva = total_iva_actual * factor
    prevision_base = total_base_actual * factor

    return {
        "trimestre_inicio": trimestre_inicio,
        "hoy": hoy,
        "iva_actual": total_iva_actual,
        "base_actual": total_base_actual,
        "prevision_iva": prevision_iva,
        "prevision_base": prevision_base,
        "movimientos": len(movimientos)
    }
