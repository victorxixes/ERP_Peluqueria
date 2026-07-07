from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

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
    db: Session = Depends(get_db)
):
    return listar_nominas(db)

@router.post("/")
def post_nomina(
    data: dict,
    db: Session = Depends(get_db)
):
    return crear_nomina(db, data)

@router.get("/{nomina_id}")
def get_nomina(
    nomina_id: int,
    db: Session = Depends(get_db)
):
    return obtener_nomina(db, nomina_id)

@router.put("/{nomina_id}")
def put_nomina(
    nomina_id: int,
    data: dict,
    db: Session = Depends(get_db)
):
    return actualizar_nomina(db, nomina_id, data)

@router.delete("/{nomina_id}")
def delete_nomina(
    nomina_id: int,
    db: Session = Depends(get_db)
):
    return eliminar_nomina(db, nomina_id)
