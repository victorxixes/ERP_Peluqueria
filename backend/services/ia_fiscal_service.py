from sqlalchemy.orm import Session
from models.historico import MovimientoCaja
from datetime import datetime


def ia_fiscal(db: Session):
    hoy = datetime.now()
    mes_inicio = datetime(hoy.year, hoy.month, 1)

    movimientos = db.query(MovimientoCaja).filter(
        MovimientoCaja.fecha_venta >= mes_inicio,
        MovimientoCaja.fecha_venta <= hoy
    ).all()

    total_mes = sum(m.total_linea or 0 for m in movimientos)
    iva_mes = sum(m.iva_cuota or 0 for m in movimientos)
    base_mes = sum(m.subtotal or 0 for m in movimientos)

    # IA simple basada en reglas
    recomendaciones = []

    if total_mes < 3000:
        recomendaciones.append("La facturación del mes es baja. Considera promociones o campañas de fidelización.")

    if iva_mes > 1200:
        recomendaciones.append("El IVA del mes es elevado. Revisa gastos deducibles para compensar.")

    servicios = {}
    for m in movimientos:
        if m.concepto not in servicios:
            servicios[m.concepto] = 0
        servicios[m.concepto] += m.total_linea or 0

    top_servicio = max(servicios.items(), key=lambda x: x[1])[0] if servicios else None

    if top_servicio:
        recomendaciones.append(f"El servicio más vendido es '{top_servicio}'. Considera potenciarlo en redes.")

    return {
        "total_mes": total_mes,
        "iva_mes": iva_mes,
        "base_mes": base_mes,
        "recomendaciones": recomendaciones,
        "servicios": servicios
    }
