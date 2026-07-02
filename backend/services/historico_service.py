from sqlalchemy.orm import Session
from models.historico import Ticket, MovimientoCaja


def obtener_tickets(db: Session):
    """
    Devuelve todos los tickets ordenados por fecha.
    """
    tickets = db.query(Ticket).order_by(Ticket.fecha_venta.desc()).all()

    resultado = []
    for t in tickets:
        resultado.append({
            "id": t.id,
            "ticket_codigo": t.ticket_codigo,
            "fecha_venta": t.fecha_venta,
            "cliente": t.cliente,
            "empleado": t.empleado,
            "total_base": t.total_base,
            "total_iva": t.total_iva,
            "total_ticket": t.total_ticket,
            "forma_pago": t.forma_pago,
        })

    return resultado


def obtener_movimientos_ticket(ticket_id: int, db: Session):
    """
    Devuelve todos los movimientos de un ticket concreto.
    """
    movimientos = db.query(MovimientoCaja).filter(
        MovimientoCaja.ticket_id == ticket_id
    ).order_by(MovimientoCaja.id.asc()).all()

    resultado = []
    for m in movimientos:
        resultado.append({
            "id": m.id,
            "concepto": m.concepto,
            "categoria": m.categoria,
            "cantidad": m.cantidad,
            "subtotal": m.subtotal,
            "iva_porcentaje": m.iva_porcentaje,
            "iva_cuota": m.iva_cuota,
            "descuento": m.descuento,
            "total_linea": m.total_linea,
            "empleado": m.empleado,
            "fecha_venta": m.fecha_venta,
        })

    return resultado
