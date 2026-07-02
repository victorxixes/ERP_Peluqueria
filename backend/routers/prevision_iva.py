from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db
from services.iva_prevision_service import prevision_iva

router = APIRouter(prefix="/iva", tags=["IVA"])

@router.get("/prevision")
def iva_prevision(db: Session = Depends(get_db)):
    return prevision_iva(db)
