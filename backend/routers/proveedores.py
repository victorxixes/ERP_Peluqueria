from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from models.proveedor import Proveedor
from db import get_db

from services.proveedores_service import (
    crear_proveedor,
    listar_proveedores,
    obtener_proveedor,
    actualizar_proveedor,
    eliminar_proveedor,
)

router = APIRouter(prefix="/proveedores", tags=["Proveedores"])

# GET optimizado con paginación, filtros y ordenación
@router.get("/")
def get_proveedores(
    skip: int = 0,
    limit: int = 50,
    categoria: str | None = None,
    nombre: str | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(Proveedor)

    if categoria:
        query = query.filter(Proveedor.categoria == categoria)

    if nombre:
        query = query.filter(Proveedor.nombre.ilike(f"%{nombre}%"))

    return (
        query.order_by(Proveedor.nombre.asc())
        .offset(skip)
        .limit(limit)
        .all()
    )

@router.post("/")
def post_proveedor(
    data: dict,
    db: Session = Depends(get_db)
):
    return crear_proveedor(db, data)

@router.get("/{proveedor_id}")
def get_proveedor(
    proveedor_id: int,
    db: Session = Depends(get_db)
):
    return obtener_proveedor(db, proveedor_id)

@router.put("/{proveedor_id}")
def put_proveedor(
    proveedor_id: int,
    data: dict,
    db: Session = Depends(get_db)
):
    return actualizar_proveedor(db, proveedor_id, data)

@router.delete("/{proveedor_id}")
def delete_proveedor(
    proveedor_id: int,
    db: Session = Depends(get_db)
):
    return eliminar_proveedor(db, proveedor_id)
