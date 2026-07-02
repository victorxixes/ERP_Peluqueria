from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db
from services.aprendizaje_items_service import clasificar_items, cargar_aprendizaje

router = APIRouter(prefix="/catalogo", tags=["Catálogo"])

@router.get("/desconocidos")
def obtener_desconocidos():
    # Esto lo rellena el importador
    try:
        with open("data/desconocidos.json", "r") as f:
            return {"items": json.load(f)}
    except:
        return {"items": []}


@router.post("/clasificar")
def clasificar(clasificaciones: dict, db: Session = Depends(get_db)):
    resultado = clasificar_items(db, clasificaciones)
    return resultado


@router.get("/aprendizaje")
def obtener_aprendizaje():
    return cargar_aprendizaje()
