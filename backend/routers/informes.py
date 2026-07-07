from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from db import get_db

from services.informes_service import (
    informe_ventas,
    generar_informe_cierre_mensual,
    generar_informe_cierre_trimestral,
    generar_informe_cierre_anual,
    generar_informe_modelo_390,
    generar_informe_prevision_iva
)

from services.logs_service import registrar_log
from utils.excel import exportar_excel


router = APIRouter(prefix="/informes", tags=["Informes"])


# ---------------------------------------------------------
# INFORME DE VENTAS
# ---------------------------------------------------------

@router.get("/ventas")
def ventas(desde: str, hasta: str, db: Session = Depends(get_db)):
    datos = informe_ventas(
        db,
        datetime.fromisoformat(desde),
        datetime.fromisoformat(hasta)
    )

    registrar_log(
        db,
        tipo="INFORME",
        accion="informe ventas",
        usuario="sistema",
        datos={"desde": desde, "hasta": hasta, "movimientos": len(datos)}
    )

    return datos


@router.get("/ventas/excel")
def ventas_excel(desde: str, hasta: str, db: Session = Depends(get_db)):
    datos = informe_ventas(
        db,
        datetime.fromisoformat(desde),
        datetime.fromisoformat(hasta)
    )

    registrar_log(
        db,
        tipo="INFORME",
        accion="descargar informe ventas excel",
        usuario="sistema",
        datos={"desde": desde, "hasta": hasta, "movimientos": len(datos)}
    )

    return exportar_excel(datos, "informe_ventas")


# ---------------------------------------------------------
# CIERRE FISCAL — GENERACIÓN DE INFORMES
# ---------------------------------------------------------

@router.post("/generar-cierre-mensual")
def generar_cierre_mensual(payload: dict, db: Session = Depends(get_db)):
    year = payload["year"]
    month = payload["month"]

    registrar_log(
        db,
        tipo="CIERRE FISCAL",
        accion="generar cierre mensual",
        usuario="sistema",
        datos={"year": year, "month": month}
    )

    return generar_informe_cierre_mensual(db, year, month)


@router.post("/generar-cierre-trimestral")
def generar_cierre_trimestral(payload: dict, db: Session = Depends(get_db)):
    year = payload["year"]
    quarter = payload["quarter"]

    registrar_log(
        db,
        tipo="CIERRE FISCAL",
        accion="generar cierre trimestral",
        usuario="sistema",
        datos={"year": year, "quarter": quarter}
    )

    return generar_informe_cierre_trimestral(db, year, quarter)


@router.post("/generar-cierre-anual")
def generar_cierre_anual(payload: dict, db: Session = Depends(get_db)):
    year = payload["year"]

    registrar_log(
        db,
        tipo="CIERRE FISCAL",
        accion="generar cierre anual",
        usuario="sistema",
        datos={"year": year}
    )

    return generar_informe_cierre_anual(db, year)


@router.post("/generar-modelo-390")
def generar_modelo_390(payload: dict, db: Session = Depends(get_db)):
    year = payload["year"]

    registrar_log(
        db,
        tipo="MODELO 390",
        accion="generar modelo 390",
        usuario="sistema",
        datos={"year": year}
    )

    return generar_informe_modelo_390(db, year)


@router.post("/generar-prevision-iva")
def generar_prevision_iva(payload: dict, db: Session = Depends(get_db)):
    year = payload["year"]
    month = payload["month"]

    registrar_log(
        db,
        tipo="IVA",
        accion="generar previsión IVA",
        usuario="sistema",
        datos={"year": year, "month": month}
    )

    return generar_informe_prevision_iva(db, year, month)
