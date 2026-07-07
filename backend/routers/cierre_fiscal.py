from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db
from services.cierre_fiscal_service import cierre_mensual, cierre_trimestral

router = APIRouter(prefix="/cierre-fiscal", tags=["Cierre Fiscal"])

@router.get("/mensual/{year}/{month}")
def get_cierre_mensual(year: int, month: int, db: Session = Depends(get_db)):
    return cierre_mensual(db, year, month)

@router.get("/trimestral/{year}/{quarter}")
def get_cierre_trimestral(year: int, quarter: int, db: Session = Depends(get_db)):
    return cierre_trimestral(db, year, quarter)
