from sqlalchemy.orm import Session
from models.historico import MovimientoCaja, Ticket
from datetime import datetime
from utils.notificaciones import generar_alertas


def resumen_dashboard(db: Session):
    hoy = datetime.now()
    mes_inicio = datetime(hoy.year, hoy.month, 1)

    # Movimientos del mes
    movimientos_mes = db.query(MovimientoCaja).filter(
        MovimientoCaja.fecha_venta >= mes_inicio,
        MovimientoCaja.fecha_venta <= hoy
    ).all()

    total_mes = sum(m.total_linea or 0 for m in movimientos_mes)
    iva_mes = sum(m.iva_cuota or 0 for m in movimientos_mes)
    base_mes = sum(m.subtotal or 0 for m in movimientos_mes)

    # Top servicios
    top_servicios = {}
    for m in movimientos_mes:
        if m.concepto not in top_servicios:
            top_servicios[m.concepto] = 0
        top_servicios[m.concepto] += m.total_linea or 0

    top_servicios = sorted(top_servicios.items(), key=lambda x: x[1], reverse=True)[:5]

    # Top empleados
    top_empleados = {}
    for m in movimientos_mes:
        if m.empleado not in top_empleados:
            top_empleados[m.empleado] = 0
        top_empleados[m.empleado] += m.total_linea or 0

    top_empleados = sorted(top_empleados.items(), key=lambda x: x[1], reverse=True)[:5]

    # Alertas fiscales
    alertas = generar_alertas(db)

    # 🔥 RETURN DENTRO DE LA FUNCIÓN (CORRECTO)
    return {
        "total_mes": total_mes,
        "iva_mes": iva_mes,
        "base_mes": base_mes,
        "top_servicios": top_servicios,
        "top_empleados": top_empleados,
        "movimientos_mes": len(movimientos_mes),
        "alertas": alertas
    }
