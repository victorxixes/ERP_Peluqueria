from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db import get_db
from services.configuracion_fiscal_service import (
    obtener_configuracion_fiscal,
    actualizar_configuracion_fiscal,
)

router = APIRouter(prefix="/config/fiscal", tags=["Configuración fiscal"])

@router.get("/")
def get_configuracion():
    return obtener_configuracion_fiscal()

@router.put("/")
def put_configuracion(data: dict):
    return actualizar_configuracion_fiscal(data)
