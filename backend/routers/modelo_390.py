from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db
from services.modelo_390_service import modelo_390

router = APIRouter(prefix="/modelo-390", tags=["Modelo 390"])

@router.get("/")
def modelo_390_endpoint(year: int, db: Session = Depends(get_db)):
    return modelo_390(db, year)
