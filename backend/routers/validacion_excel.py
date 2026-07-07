from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from db import get_db
from services.validacion_excel_service import (
    validar_ingresos_excel,
    validar_gastos_excel
)

router = APIRouter(prefix="/validacion-excel", tags=["Validación Excel"])

@router.post("/ingresos")
async def validar_ingresos(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    contenido = await file.read()
    return validar_ingresos_excel(contenido)

@router.post("/gastos")
async def validar_gastos(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    contenido = await file.read()
    return validar_gastos_excel(contenido)
