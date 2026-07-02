from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db
from models.ingreso import Ingreso
from models.gasto import Gasto
from models.log import Log
import datetime

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/")
def get_dashboard(db: Session = Depends(get_db)):
    hoy = datetime.date.today()
    inicio_mes = hoy.replace(day=1)

    ingresos_mes = db.query(Ingreso).filter(Ingreso.fecha >= inicio_mes).all()
    gastos_mes = db.query(Gasto).filter(Gasto.fecha >= inicio_mes).all()

    total_ingresos = sum(i.total for i in ingresos_mes)
    total_gastos = sum(g.total for g in gastos_mes)
    beneficio = total_ingresos - total_gastos

    logs_hoy = db.query(Log).filter(
        Log.fecha >= datetime.datetime.now().replace(hour=0, minute=0, second=0)
    ).count()

    return {
        "total_ingresos": total_ingresos,
        "total_gastos": total_gastos,
        "beneficio": beneficio,
        "iva_repercutido": sum(i.iva for i in ingresos_mes),
        "iva_soportado": sum(g.iva for g in gastos_mes),
        "iva_final": sum(i.iva for i in ingresos_mes) - sum(g.iva for g in gastos_mes),
        "logs_hoy": logs_hoy
    }
