from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from models.servicio import Servicio
from db import get_db

from services.servicios_service import (
    listar_servicios,
    obtener_servicio,
    crear_servicio,
    actualizar_servicio,
    borrar_servicio,
)

router = APIRouter(prefix="/servicios", tags=["Servicios"])

# GET optimizado con paginación, filtros y ordenación
@router.get("/")
def get_servicios(
    skip: int = 0,
    limit: int = 50,
    categoria: str | None = None,
    activo: bool | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(Servicio)

    if categoria:
        query = query.filter(Servicio.categoria == categoria)

    if activo is not None:
        query = query.filter(Servicio.activo == activo)

    return (
        query.order_by(Servicio.nombre.asc())
        .offset(skip)
        .limit(limit)
        .all()
    )

@router.get("/{servicio_id}")
def get_servicio(
    servicio_id: int,
    db: Session = Depends(get_db)
):
    servicio = obtener_servicio(db, servicio_id)
    if not servicio:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    return servicio

@router.post("/")
def post_servicio(
    data: dict,
    db: Session = Depends(get_db)
):
    return crear_servicio(db, data)

@router.put("/{servicio_id}")
def put_servicio(
    servicio_id: int,
    data: dict,
    db: Session = Depends(get_db)
):
    servicio = actualizar_servicio(db, servicio_id, data)
    if not servicio:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    return servicio

@router.delete("/{servicio_id}")
def delete_servicio(
    servicio_id: int,
    db: Session = Depends(get_db)
):
    ok = borrar_servicio(db, servicio_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    return {"ok": True}
