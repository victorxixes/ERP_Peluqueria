from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from models.gasto import Gasto
from db import get_db

from services.gastos_service import (
    crear_gasto,
    listar_gastos,
    obtener_gasto,
    actualizar_gasto,
    eliminar_gasto,
)

router = APIRouter(prefix="/gastos", tags=["Gastos"])

# GET optimizado con paginación, filtros y ordenación
@router.get("/")
def get_gastos(
    skip: int = 0,
    limit: int = 50,
    categoria: str | None = None,
    proveedor_id: int | None = None,
    desde: str | None = None,
    hasta: str | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(Gasto)

    if categoria:
        query = query.filter(Gasto.categoria == categoria)

    if proveedor_id:
        query = query.filter(Gasto.proveedor_id == proveedor_id)

    if desde and hasta:
        query = query.filter(Gasto.fecha.between(desde, hasta))

    return (
        query.order_by(Gasto.fecha.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

@router.post("/")
def post_gasto(
    data: dict,
    db: Session = Depends(get_db)
):
    return crear_gasto(db, data)

@router.get("/{gasto_id}")
def get_gasto(
    gasto_id: int,
    db: Session = Depends(get_db)
):
    return obtener_gasto(db, gasto_id)

@router.put("/{gasto_id}")
def put_gasto(
    gasto_id: int,
    data: dict,
    db: Session = Depends(get_db)
):
    return actualizar_gasto(db, gasto_id, data)

@router.delete("/{gasto_id}")
def delete_gasto(
    gasto_id: int,
    db: Session = Depends(get_db)
):
    return eliminar_gasto(db, gasto_id)
