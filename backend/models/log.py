from sqlalchemy import Column, Integer, String, DateTime, JSON
from datetime import datetime
from db import Base

class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String, index=True)
    accion = Column(String)
    usuario = Column(String)
    fecha = Column(DateTime, default=datetime.utcnow)
    datos = Column(JSON)


