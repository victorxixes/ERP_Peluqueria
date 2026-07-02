from sqlalchemy import Column, Integer, Float
from db import Base

class IRPFPrevision(Base):
    __tablename__ = "irpf_prevision"

    id = Column(Integer, primary_key=True)
    año = Column(Integer, nullable=False)

    ingresos_brutos = Column(Float, nullable=False)
    gastos_deducibles = Column(Float, nullable=False)
    base_irpf = Column(Float, nullable=False)
    irpf_estimado = Column(Float, nullable=False)
