from sqlalchemy import Column, Integer, Float, String
from db import Base

class IVAResumen(Base):
    __tablename__ = "iva_resumen"

    id = Column(Integer, primary_key=True, index=True)

    año = Column(Integer, nullable=False, index=True)
    trimestre = Column(Integer, nullable=False, index=True)

    # Totales del trimestre
    base_imponible_total = Column(Float, nullable=False)
    iva_repercutido_total = Column(Float, nullable=False)
    iva_soportado_total = Column(Float, nullable=False)

    # Información adicional para informes y modelo 390
    detalle = Column(String(255), nullable=True)
