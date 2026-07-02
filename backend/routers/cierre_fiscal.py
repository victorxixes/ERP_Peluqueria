from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.auth_dep import require_admin
from db import get_db
from services.cierre_fiscal_service import cierre_mensual, cierre_trimestral

router = APIRouter(prefix="/cierre-fiscal", tags=["Cierre Fiscal"])

@router.get("/mensual/{year}/{month}")
def get_cierre_mensual(year: int, month: int, db: Session = Depends(get_db), user = Depends(require_admin)):
    return cierre_mensual(db, year, month)

@router.get("/trimestral/{year}/{quarter}")
def get_cierre_trimestral(year: int, quarter: int, db: Session = Depends(get_db), user = Depends(require_admin)):
    return cierre_trimestral(db, year, quarter)
