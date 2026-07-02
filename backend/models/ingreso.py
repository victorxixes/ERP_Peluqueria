from sqlalchemy import Column, Integer, Float, String, Date
from db import Base

class Ingreso(Base):
    __tablename__ = "ingresos"

    id = Column(Integer, primary_key=True)
    fecha = Column(Date, nullable=False)
    origen = Column(String(100), nullable=False)  # salón, online, otro
    categoria = Column(String(100), nullable=False)  # servicios, productos, otros
    descripcion = Column(String(255), nullable=True)
    base_imponible = Column(Float, nullable=False)
    iva = Column(Float, nullable=False)
    total = Column(Float, nullable=False)
    medio_pago = Column(String(50), nullable=True)  # efectivo, tarjeta, bizum, etc.
