from fastapi import APIRouter, UploadFile, File, Depends

from core.auth_dep import get_current_user
from models.usuario import Usuario

from services.validacion_excel_service import (
    validar_ingresos_excel,
    validar_gastos_excel
)

router = APIRouter(prefix="/validacion-excel", tags=["Validación Excel"])

@router.post("/ingresos")
async def validar_ingresos(
    file: UploadFile = File(...),
    user: Usuario = Depends(get_current_user)
):
    contenido = await file.read()
    return validar_ingresos_excel(contenido)

@router.post("/gastos")
async def validar_gastos(
    file: UploadFile = File(...),
    user: Usuario = Depends(get_current_user)
):
    contenido = await file.read()
    return validar_gastos_excel(contenido)
