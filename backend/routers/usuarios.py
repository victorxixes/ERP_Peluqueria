from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.auth_dep import get_current_user
from models.usuario import Usuario
from db import get_db

from services.usuarios_service import (
    crear_usuario,
    listar_usuarios,
    obtener_usuario,
    actualizar_usuario,
    eliminar_usuario,
)

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

@router.get("/")
def get_usuarios(
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return listar_usuarios(db)

@router.post("/")
def post_usuario(
    data: dict,
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return crear_usuario(db, data)

@router.get("/{usuario_id}")
def get_usuario(
    usuario_id: int,
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return obtener_usuario(db, usuario_id)

@router.put("/{usuario_id}")
def put_usuario(
    usuario_id: int,
    data: dict,
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return actualizar_usuario(db, usuario_id, data)

@router.delete("/{usuario_id}")
def delete_usuario(
    usuario_id: int,
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return eliminar_usuario(db, usuario_id)
