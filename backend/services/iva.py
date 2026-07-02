from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db
from services.iva_resumen_service import calcular_iva_periodo
from datetime import datetime

router = APIRouter(prefix="/iva", tags=["IVA"])

@router.get("/resumen")
def iva_resumen(desde: str, hasta: str, db: Session = Depends(get_db)):
    fecha_inicio = datetime.fromisoformat(desde)
    fecha_fin = datetime.fromisoformat(hasta)
    return calcular_iva_periodo(db, fecha_inicio, fecha_fin)
