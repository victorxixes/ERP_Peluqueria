from sqlalchemy.orm import Session
from datetime import datetime

from models.historico import MovimientoCaja
from services.logs_service import registrar_log


# ---------------------------------------------------------
# IVA TRIMESTRAL
# ---------------------------------------------------------

def calcular_iva_trimestre(db: Session, year: int, quarter: int):

    if year < 2000 or year > datetime.now().year:
        raise ValueError("Año inválido.")

    if quarter not in [1, 2, 3, 4]:
        raise ValueError("Trimestre inválido.")

    meses = {
        1: (1, 3),
        2: (4, 6),
        3: (7, 9),
        4: (10, 12)
    }

    inicio_mes, fin_mes = meses[quarter]

    fecha_inicio = datetime(year, inicio_mes, 1)
    fecha_fin = datetime(year, fin_mes, 31)

    if fecha_inicio > fecha_fin:
        raise ValueError("Rango de fechas inválido.")

    movimientos = db.query(MovimientoCaja).filter(
        MovimientoCaja.fecha_venta >= fecha_inicio,
        MovimientoCaja.fecha_venta <= fecha_fin
    ).all()

    datos = {
        "year": year,
        "quarter": quarter,
        "base": sum(m.subtotal or 0 for m in movimientos),
        "iva": sum(m.iva_cuota or 0 for m in movimientos),
        "total": sum(m.total_linea or 0 for m in movimientos),
        "movimientos": len(movimientos)
    }

    registrar_log(
        db,
        tipo="IVA",
        accion="calculo IVA trimestral",
        usuario="system",
        datos=datos
    )

    return datos


# ---------------------------------------------------------
# IVA ANUAL
# ---------------------------------------------------------

def calcular_iva_anual(db: Session, year: int):

    if year < 2000 or year > datetime.now().year:
        raise ValueError("Año inválido.")

    fecha_inicio = datetime(year, 1, 1)
    fecha_fin = datetime(year, 12, 31)

    movimientos = db.query(MovimientoCaja).filter(
        MovimientoCaja.fecha_venta >= fecha_inicio,
        MovimientoCaja.fecha_venta <= fecha_fin
    ).all()

    datos = {
        "year": year,
        "base": sum(m.subtotal or 0 for m in movimientos),
        "iva": sum(m.iva_cuota or 0 for m in movimientos),
        "total": sum(m.total_linea or 0 for m in movimientos),
        "movimientos": len(movimientos)
    }

    registrar_log(
        db,
        tipo="IVA",
        accion="calculo IVA anual",
        usuario="system",
        datos=datos
    )

    return datos


# ---------------------------------------------------------
# IVA REPERCUTIDO (ventas)
# ---------------------------------------------------------

def calcular_iva_repercutido(db: Session, year: int, month: int):

    if year < 2000 or year > datetime.now().year:
        raise ValueError("Año inválido.")

    if month < 1 or month > 12:
        raise ValueError("Mes inválido.")

    fecha_inicio = datetime(year, month, 1)
    fecha_fin = datetime(year, month, 31)

    movimientos = db.query(MovimientoCaja).filter(
        MovimientoCaja.fecha_venta >= fecha_inicio,
        MovimientoCaja.fecha_venta <= fecha_fin,
        MovimientoCaja.categoria.ilike("%servicio%")
    ).all()

    datos = {
        "year": year,
        "month": month,
        "base": sum(m.subtotal or 0 for m in movimientos),
        "iva": sum(m.iva_cuota or 0 for m in movimientos),
        "total": sum(m.total_linea or 0 for m in movimientos),
        "movimientos": len(movimientos)
    }

    registrar_log(
        db,
        tipo="IVA",
        accion="calculo IVA repercutido",
        usuario="system",
        datos=datos
    )

    return datos


# ---------------------------------------------------------
# IVA SOPORTADO (gastos)
# ---------------------------------------------------------

def calcular_iva_soportado(db: Session, year: int, month: int):

    if year < 2000 or year > datetime.now().year:
        raise ValueError("Año inválido.")

    if month < 1 or month > 12:
        raise ValueError("Mes inválido.")

    fecha_inicio = datetime(year, month, 1)
    fecha_fin = datetime(year, month, 31)

    movimientos = db.query(MovimientoCaja).filter(
        MovimientoCaja.fecha_venta >= fecha_inicio,
        MovimientoCaja.fecha_venta <= fecha_fin,
        MovimientoCaja.categoria.ilike("%producto%")
    ).all()

    datos = {
        "year": year,
        "month": month,
        "base": sum(m.subtotal or 0 for m in movimientos),
        "iva": sum(m.iva_cuota or 0 for m in movimientos),
        "total": sum(m.total_linea or 0 for m in movimientos),
        "movimientos": len(movimientos)
    }

    registrar_log(
        db,
        tipo="IVA",
        accion="calculo IVA soportado",
        usuario="system",
        datos=datos
    )

    return datos


# ---------------------------------------------------------
# PREVISIÓN IVA
# ---------------------------------------------------------

def prevision_iva(db: Session, year: int, month: int):

    if year < 2000 or year > datetime.now().year:
        raise ValueError("Año inválido.")

    if month < 1 or month > 12:
        raise ValueError("Mes inválido.")

    hoy = datetime.now()
    fecha_inicio = datetime(year, month, 1)

    movimientos = db.query(MovimientoCaja).filter(
        MovimientoCaja.fecha_venta >= fecha_inicio,
        MovimientoCaja.fecha_venta <= hoy
    ).all()

    dias_transcurridos = (hoy - fecha_inicio).days or 1
    dias_totales = 30

    iva_actual = sum(m.iva_cuota or 0 for m in movimientos)
    base_actual = sum(m.subtotal or 0 for m in movimientos)

    factor = dias_totales / dias_transcurridos

    datos = {
        "iva_actual": iva_actual,
        "base_actual": base_actual,
        "prevision_iva": iva_actual * factor,
        "prevision_base": base_actual * factor,
        "movimientos": len(movimientos),
        "year": year,
        "month": month
    }

    registrar_log(
        db,
        tipo="IVA",
        accion="calculo previsión IVA",
        usuario="system",
        datos=datos
    )

    return datos


# ---------------------------------------------------------
# IA FISCAL
# ---------------------------------------------------------

def ia_fiscal_iva(db: Session, year: int):

    if year < 2000 or year > datetime.now().year:
        raise ValueError("Año inválido.")

    fecha_inicio = datetime(year, 1, 1)
    fecha_fin = datetime(year, 12, 31)

    movimientos = db.query(MovimientoCaja).filter(
        MovimientoCaja.fecha_venta >= fecha_inicio,
        MovimientoCaja.fecha_venta <= fecha_fin
    ).all()

    total = sum(m.total_linea or 0 for m in movimientos)
    iva = sum(m.iva_cuota or 0 for m in movimientos)

    recomendaciones = []

    if total < 30000:
        recomendaciones.append("Facturación anual baja. Considera revisar precios o campañas.")

    if iva > 6000:
        recomendaciones.append("IVA anual elevado. Revisa gastos deducibles.")

    datos = {
        "year": year,
        "total": total,
        "iva": iva,
        "recomendaciones": recomendaciones
    }

    registrar_log(
        db,
        tipo="IA FISCAL",
        accion="calculo IA fiscal IVA",
        usuario="system",
        datos=datos
    )

    return datos


# ---------------------------------------------------------
# MODELO 390
# ---------------------------------------------------------

def modelo_390(db: Session, year: int):

    if year < 2000 or year > datetime.now().year:
        raise ValueError("Año inválido.")

    fecha_inicio = datetime(year, 1, 1)
    fecha_fin = datetime(year, 12, 31)

    movimientos = db.query(MovimientoCaja).filter(
        MovimientoCaja.fecha_venta >= fecha_inicio,
        MovimientoCaja.fecha_venta <= fecha_fin
    ).all()

    datos = {
        "year": year,
        "base": sum(m.subtotal or 0 for m in movimientos),
        "iva": sum(m.iva_cuota or 0 for m in movimientos),
        "total": sum(m.total_linea or 0 for m in movimientos),
        "movimientos": len(movimientos)
    }

    registrar_log(
        db,
        tipo="MODELO 390",
        accion="calculo modelo 390",
        usuario="system",
        datos=datos
    )

    return datos
