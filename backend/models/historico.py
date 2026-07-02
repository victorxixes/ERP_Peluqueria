# ---------------------------------------------------------
# MODELO HISTÓRICO FISCAL (YA EXISTENTE)
# ---------------------------------------------------------

from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from db import Base


class Historico(Base):
    __tablename__ = "historico"

    id = Column(Integer, primary_key=True, index=True)

    fecha = Column(Date, nullable=False, index=True)
    tipo = Column(String(50), nullable=False, index=True)
    descripcion = Column(String(255), nullable=True)
    importe = Column(Float, nullable=False)
    iva = Column(Float, nullable=True)
    origen_id = Column(Integer, nullable=True, index=True)

    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=True, index=True)
    usuario = relationship("Usuario", lazy="joined")

    proveedor_id = Column(Integer, ForeignKey("proveedores.id"), nullable=True, index=True)
    proveedor = relationship("Proveedor", lazy="joined")

    modulo = Column(String(50), nullable=True, index=True)


# ---------------------------------------------------------
# MODELOS NUEVOS: TICKETS Y MOVIMIENTOS DE PELUQUERÍA
# ---------------------------------------------------------

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    ticket_codigo = Column(String, unique=True, index=True)
    fecha_venta = Column(DateTime, index=True)
    cliente = Column(String, index=True)
    empleado = Column(String, index=True)
    total_base = Column(Float)
    total_iva = Column(Float)
    total_ticket = Column(Float)
    forma_pago = Column(String)

    movimientos = relationship("MovimientoCaja", back_populates="ticket")


class MovimientoCaja(Base):
    __tablename__ = "movimientos_caja"

    id = Column(Integer, primary_key=True, index=True)
    ticket_id = Column(Integer, ForeignKey("tickets.id"), index=True)

    fecha_venta = Column(DateTime, index=True)
    cliente = Column(String, index=True)
    empleado = Column(String, index=True)

    concepto = Column(String, index=True)
    categoria = Column(String, index=True)

    cantidad = Column(Float)
    subtotal = Column(Float)
    iva_porcentaje = Column(String)
    iva_cuota = Column(Float)
    descuento = Column(Float)
    total_linea = Column(Float)

    ticket = relationship("Ticket", back_populates="movimientos")
