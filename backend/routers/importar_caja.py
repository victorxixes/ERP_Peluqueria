from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from db import get_db
from services.importar_caja_service import importar_caja_excel

router = APIRouter(prefix="/importar_caja", tags=["Importar Caja"])

@router.post("/")
def importar_caja(
    caja_excel: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Importa el Excel detallado del programa de peluquería
    y guarda los tickets + movimientos en la base de datos.
    """
    resultado = importar_caja_excel(caja_excel, db)
    return resultado
