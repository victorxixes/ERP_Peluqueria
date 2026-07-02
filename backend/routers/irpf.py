from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.auth_dep import get_current_user
from models.usuario import Usuario
from db import get_db

from services.irpf_service import calcular_irpf_anual

router = APIRouter(prefix="/irpf", tags=["IRPF"])

@router.get("/anual")
def irpf_anual(
    year: int,
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return calcular_irpf_anual(db, year)
