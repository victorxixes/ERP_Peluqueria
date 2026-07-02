from sqlalchemy import Column, Integer, Float, String, Date, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from db import Base
from datetime import datetime

class Activo(Base):
    __tablename__ = "activos"

    id = Column(Integer, primary_key=True, index=True)

    nombre = Column(String(255), nullable=False, index=True)
    categoria = Column(String(100), nullable=False, index=True)

    fecha_compra = Column(Date, nullable=False, index=True)
    valor_compra = Column(Float, nullable=False)
    valor_residual = Column(Float, default=0)  # opcional pero profesional

    vida_util = Column(Integer, nullable=False)
    amortizacion_anual = Column(Float, nullable=False)

    descripcion = Column(String(255), nullable=True)

    proveedor_id = Column(Integer, ForeignKey("proveedores.id"), nullable=True, index=True)
    proveedor = relationship("Proveedor", back_populates="activos")

    activo = Column(Boolean, default=True)

    creado_en = Column(DateTime, default=datetime.utcnow)
    actualizado_en = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
