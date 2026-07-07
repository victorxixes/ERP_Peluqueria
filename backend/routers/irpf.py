from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db import get_db
from services.irpf_service import calcular_irpf_anual

router = APIRouter(prefix="/irpf", tags=["IRPF"])

@router.get("/anual")
def irpf_anual(year: int, db: Session = Depends(get_db)):
    try:
        return calcular_irpf_anual(db, year)
    except Exception as e:
        print("ERROR IRPF:", e)
        raise e

