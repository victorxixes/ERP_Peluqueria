from sqlalchemy import Column, Integer, String, Float, Boolean
from db import Base

class Servicio(Base):
    __tablename__ = "servicios"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    categoria = Column(String, nullable=True)
    precio = Column(Float, nullable=False)
    iva = Column(Float, nullable=False, default=21.0)
    activo = Column(Boolean, default=True)
