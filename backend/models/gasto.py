from sqlalchemy import Column, Integer, Float, String, Date, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from db import Base
from datetime import datetime

class Gasto(Base):
    __tablename__ = "gastos"

    id = Column(Integer, primary_key=True, index=True)

    fecha = Column(Date, nullable=False, index=True)
    categoria = Column(String(100), nullable=False, index=True)
    descripcion = Column(String(255), nullable=True)

    base_imponible = Column(Float, nullable=False)
    iva = Column(Float, nullable=False)
    total = Column(Float, nullable=False)

    proveedor_id = Column(Integer, ForeignKey("proveedores.id"), nullable=True, index=True)
    proveedor = relationship("Proveedor", back_populates="gastos")

    activo = Column(Boolean, default=True)

    creado_en = Column(DateTime, default=datetime.utcnow)
    actualizado_en = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
