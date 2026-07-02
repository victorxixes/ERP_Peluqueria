from sqlalchemy import Column, Integer, String, Boolean
from db import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True)
    password_hash = Column(String, nullable=False)
    nombre = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    rol = Column(String(50), nullable=False)  # admin, gestor, empleado
    activo = Column(Boolean, default=True)
