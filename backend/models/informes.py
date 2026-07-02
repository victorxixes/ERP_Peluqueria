from sqlalchemy import Column, Integer, String, JSON
from db import Base

class Informe(Base):
    __tablename__ = "informes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    fecha = Column(String)
    contenido = Column(JSON)
