from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from db import Base

class Proveedor(Base):
    __tablename__ = "proveedores"

    id = Column(Integer, primary_key=True, index=True)

    nombre = Column(String(255), nullable=False, index=True)
    telefono = Column(String(50), nullable=True)
    email = Column(String(255), nullable=True, index=True)
    direccion = Column(String(255), nullable=True)
    categoria = Column(String(100), nullable=True, index=True)

    activo = Column(Boolean, default=True)

    # Relaciones inversas
    productos = relationship("Producto", back_populates="proveedor")
    gastos = relationship("Gasto", back_populates="proveedor")
    activos = relationship("Activo", back_populates="proveedor")
