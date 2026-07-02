from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.auth_dep import get_current_user
from db import get_db
from models.usuario import Usuario
from models.ingreso import Ingreso

from services.ingresos_service import (
    crear_ingreso,
    listar_ingresos,
    obtener_ingreso,
    actualizar_ingreso,
    eliminar_ingreso,
)

router = APIRouter(prefix="/ingresos", tags=["Ingresos"])

# GET optimizado con paginación, filtros y ordenación
@router.get("/")
def get_ingresos(
    skip: int = 0,
    limit: int = 50,
    categoria: str | None = None,
    desde: str | None = None,
    hasta: str | None = None,
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    query = db.query(Ingreso)

    if categoria:
        query = query.filter(Ingreso.categoria == categoria)

    if desde and hasta:
        query = query.filter(Ingreso.fecha.between(desde, hasta))

    return (
        query.order_by(Ingreso.fecha.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

@router.post("/")
def post_ingreso(
    data: dict,
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return crear_ingreso(db, data)

@router.get("/{ingreso_id}")
def get_ingreso(
    ingreso_id: int,
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return obtener_ingreso(db, ingreso_id)

@router.put("/{ingreso_id}")
def put_ingreso(
    ingreso_id: int,
    data: dict,
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return actualizar_ingreso(db, ingreso_id, data)

@router.delete("/{ingreso_id}")
def delete_ingreso(
    ingreso_id: int,
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return eliminar_ingreso(db, ingreso_id)
