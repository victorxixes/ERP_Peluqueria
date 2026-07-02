from sqlalchemy import Column, Integer, Float, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from db import Base

class Nomina(Base):
    __tablename__ = "nominas"

    id = Column(Integer, primary_key=True)
    empleado = Column(String(255), nullable=False)
    fecha = Column(Date, nullable=False)
    salario_bruto = Column(Float, nullable=False)
    irpf = Column(Float, nullable=False)
    seguridad_social = Column(Float, nullable=False)
    salario_neto = Column(Float, nullable=False)
    proveedor_id = Column(Integer, ForeignKey("proveedores.id"), nullable=True)  # gestoría laboral

    proveedor = relationship("Proveedor")
