from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db
from services.ia_fiscal_service import ia_fiscal

router = APIRouter(prefix="/ia/fiscal", tags=["IA Fiscal"])

@router.get("/")
def ia(db: Session = Depends(get_db)):
    return ia_fiscal(db)
