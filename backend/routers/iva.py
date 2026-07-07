from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db import get_db

from services.iva_service import (
    calcular_iva_trimestre,
    calcular_iva_anual,
    calcular_iva_repercutido,
    calcular_iva_soportado,
    prevision_iva,
    ia_fiscal_iva,
    modelo_390
)

router = APIRouter(prefix="/iva", tags=["IVA"])

# ---------------------------------------------------------
# IVA TRIMESTRAL
# ---------------------------------------------------------
@router.get("/trimestre/{year}/{quarter}")
def get_iva_trimestre(
    year: int,
    quarter: int,
    db: Session = Depends(get_db)
):
    if quarter not in [1, 2, 3, 4]:
        raise HTTPException(status_code=400, detail="Trimestre inválido")
    return calcular_iva_trimestre(db, year, quarter)


# ---------------------------------------------------------
# IVA ANUAL
# ---------------------------------------------------------
@router.get("/anual/{year}")
def get_iva_anual(
    year: int,
    db: Session = Depends(get_db)
):
    return calcular_iva_anual(db, year)


# ---------------------------------------------------------
# IVA REPERCUTIDO (ventas)
# ---------------------------------------------------------
@router.get("/repercutido/{year}/{month}")
def get_iva_repercutido(
    year: int,
    month: int,
    db: Session = Depends(get_db)
):
    if month < 1 or month > 12:
        raise HTTPException(status_code=400, detail="Mes inválido")
    return calcular_iva_repercutido(db, year, month)


# ---------------------------------------------------------
# IVA SOPORTADO (gastos)
# ---------------------------------------------------------
@router.get("/soportado/{year}/{month}")
def get_iva_soportado(
    year: int,
    month: int,
    db: Session = Depends(get_db)
):
    if month < 1 or month > 12:
        raise HTTPException(status_code=400, detail="Mes inválido")
    return calcular_iva_soportado(db, year, month)


# ---------------------------------------------------------
# PREVISIÓN IVA
# ---------------------------------------------------------
@router.get("/prevision/{year}/{month}")
def get_prevision_iva(
    year: int,
    month: int,
    db: Session = Depends(get_db)
):
    if month < 1 or month > 12:
        raise HTTPException(status_code=400, detail="Mes inválido")
    return prevision_iva(db, year, month)


# ---------------------------------------------------------
# IA FISCAL (detección de incoherencias)
# ---------------------------------------------------------
@router.get("/ia-fiscal/{year}")
def get_ia_fiscal_iva(
    year: int,
    db: Session = Depends(get_db)
):
    return ia_fiscal_iva(db, year)


# ---------------------------------------------------------
# MODELO 390 (anual)
# ---------------------------------------------------------
@router.get("/390/{year}")
def get_modelo_390(
    year: int,
    db: Session = Depends(get_db)
):
    return modelo_390(db, year)
