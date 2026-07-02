from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from db import Base
from datetime import datetime

class Producto(Base):
    __tablename__ = "productos"

    id = Column(Integer, primary_key=True, index=True)

    # Datos principales
    nombre = Column(String, nullable=False, index=True)
    categoria = Column(String, index=True)
    codigo = Column(String, unique=True, index=True)

    # Precios
    precio = Column(Float, default=0)
    iva = Column(Float, default=21)

    # Stock
    stock = Column(Integer, default=0)

    # Proveedor
    proveedor_id = Column(Integer, ForeignKey("proveedores.id"), index=True)
    proveedor = relationship("Proveedor", back_populates="productos")

    # Estado
    activo = Column(Boolean, default=True)

    # Descripción
    descripcion = Column(String, default="")

    # Fechas
    creado_en = Column(DateTime, default=datetime.utcnow)
    actualizado_en = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

