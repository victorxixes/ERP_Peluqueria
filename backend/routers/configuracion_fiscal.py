from fastapi import APIRouter, Depends

from core.auth_dep import get_current_user
from models.usuario import Usuario

from services.configuracion_fiscal_service import (
    obtener_configuracion_fiscal,
    actualizar_configuracion_fiscal,
)

router = APIRouter(prefix="/configuracion-fiscal", tags=["Configuración fiscal"])

@router.get("/")
def get_configuracion(
    user: Usuario = Depends(get_current_user)
):
    return obtener_configuracion_fiscal()

@router.put("/")
def put_configuracion(
    data: dict,
    user: Usuario = Depends(get_current_user)
):
    return actualizar_configuracion_fiscal(data)
