from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.auth_dep import get_current_user
from models.usuario import Usuario
from db import get_db

from services.nominas_service import (
    crear_nomina,
    listar_nominas,
    obtener_nomina,
    actualizar_nomina,
    eliminar_nomina,
)

router = APIRouter(prefix="/nominas", tags=["Nóminas"])

@router.get("/")
def get_nominas(
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return listar_nominas(db)

@router.post("/")
def post_nomina(
    data: dict,
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return crear_nomina(db, data)

@router.get("/{nomina_id}")
def get_nomina(
    nomina_id: int,
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return obtener_nomina(db, nomina_id)

@router.put("/{nomina_id}")
def put_nomina(
    nomina_id: int,
    data: dict,
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return actualizar_nomina(db, nomina_id, data)

@router.delete("/{nomina_id}")
def delete_nomina(
    nomina_id: int,
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return eliminar_nomina(db, nomina_id)
