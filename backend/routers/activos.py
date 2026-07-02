from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.auth_dep import get_current_user
from models.usuario import Usuario
from models.activo import Activo
from db import get_db

from services.activos_service import (
    crear_activo,
    listar_activos,
    obtener_activo,
    actualizar_activo,
    eliminar_activo,
)

router = APIRouter(prefix="/activos", tags=["Activos"])

# GET optimizado con paginación, filtros y ordenación
@router.get("/")
def get_activos(
    skip: int = 0,
    limit: int = 50,
    categoria: str | None = None,
    proveedor_id: int | None = None,
    desde: str | None = None,
    hasta: str | None = None,
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return listar_activos(
        db=db,
        skip=skip,
        limit=limit,
        categoria=categoria,
        proveedor_id=proveedor_id,
        desde=desde,
        hasta=hasta
    )

@router.post("/")
def post_activo(
    data: dict,
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return crear_activo(db, data)

@router.get("/{activo_id}")
def get_activo(
    activo_id: int,
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return obtener_activo(db, activo_id)

@router.put("/{activo_id}")
def put_activo(
    activo_id: int,
    data: dict,
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return actualizar_activo(db, activo_id, data)

@router.delete("/{activo_id}")
def delete_activo(
    activo_id: int,
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return eliminar_activo(db, activo_id)
