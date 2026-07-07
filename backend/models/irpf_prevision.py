from sqlalchemy import Column, Integer, Float
from db import Base

class IRPFPrevision(Base):
    __tablename__ = "irpf_prevision"

    id = Column(Integer, primary_key=True)

    año = Column(Integer, nullable=False)

    ingresos_totales = Column(Float, nullable=False)
    gastos_totales = Column(Float, nullable=False)
    nominas_totales = Column(Float, nullable=False)
    amortizaciones_totales = Column(Float, nullable=False)

    beneficio_neto = Column(Float, nullable=False)
    irpf_estimado = Column(Float, nullable=False)
