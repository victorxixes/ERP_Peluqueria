from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from models.producto import Producto
from db import get_db

from services.productos_service import (
    listar_productos,
    obtener_producto,
    crear_producto,
    actualizar_producto,
    borrar_producto,
)

router = APIRouter(prefix="/productos", tags=["Productos"])

# GET optimizado con paginación, filtros y ordenación
@router.get("/")
def get_productos(
    skip: int = 0,
    limit: int = 50,
    categoria: str | None = None,
    proveedor_id: int | None = None,
    nombre: str | None = None,
    db: Session = Depends(get_db)
):
    return listar_productos(
        db=db,
        skip=skip,
        limit=limit,
        categoria=categoria,
        proveedor_id=proveedor_id,
        nombre=nombre
    )

@router.get("/{producto_id}")
def get_producto(
    producto_id: int,
    db: Session = Depends(get_db)
):
    producto = obtener_producto(db, producto_id)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto

@router.post("/")
def post_producto(
    data: dict,
    db: Session = Depends(get_db)
):
    return crear_producto(db, data)

@router.put("/{producto_id}")
def put_producto(
    producto_id: int,
    data: dict,
    db: Session = Depends(get_db)
):
    producto = actualizar_producto(db, producto_id, data)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto

@router.delete("/{producto_id}")
def delete_producto(
    producto_id: int,
    db: Session = Depends(get_db)
):
    ok = borrar_producto(db, producto_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return {"ok": True}
