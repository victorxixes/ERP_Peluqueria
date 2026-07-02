from sqlalchemy.orm import Session
from models.ingreso import Ingreso
from models.gasto import Gasto
from models.activo import Activo
from models.nomina import Nomina
from models.irpf_prevision import IRPFPrevision
from datetime import datetime

def calcular_irpf_anual(db: Session, year: int):
    ingresos = db.query(Ingreso).filter(Ingreso.fecha.between(f"{year}-01-01", f"{year}-12-31")).all()
    gastos = db.query(Gasto).filter(Gasto.fecha.between(f"{year}-01-01", f"{year}-12-31")).all()
    nominas = db.query(Nomina).filter(Nomina.fecha.between(f"{year}-01-01", f"{year}-12-31")).all()
    activos = db.query(Activo).all()

    ingresos_totales = sum(i.total for i in ingresos)
    gastos_totales = sum(g.total for g in gastos)
    nominas_totales = sum(n.salario_neto for n in nominas)
    amortizaciones_totales = sum(a.amortizacion_anual for a in activos)

    beneficio_neto = ingresos_totales - gastos_totales - nominas_totales - amortizaciones_totales

    # Tramos IRPF oficiales simplificados
    if beneficio_neto < 12450:
        irpf_estimado = beneficio_neto * 0.19
    elif beneficio_neto < 20200:
        irpf_estimado = beneficio_neto * 0.24
    elif beneficio_neto < 35200:
        irpf_estimado = beneficio_neto * 0.30
    elif beneficio_neto < 60000:
        irpf_estimado = beneficio_neto * 0.37
    else:
        irpf_estimado = beneficio_neto * 0.45

    prevision = IRPFPrevision(
        año=year,
        ingresos_totales=ingresos_totales,
        gastos_totales=gastos_totales,
        amortizaciones=amortizaciones_totales,
        beneficio_neto=beneficio_neto,
        irpf_estimado=irpf_estimado
    )

    db.add(prevision)
    db.commit()
    db.refresh(prevision)

    return {
        "year": year,
        "ingresos_totales": ingresos_totales,
        "gastos_totales": gastos_totales,
        "nominas_totales": nominas_totales,
        "amortizaciones_totales": amortizaciones_totales,
        "beneficio_neto": beneficio_neto,
        "irpf_estimado": irpf_estimado,
        "prevision_id": prevision.id
    }
