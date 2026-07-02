import pandas as pd
from io import BytesIO
from typing import List

CAMPOS_INGRESOS = ["fecha", "cliente", "concepto", "base_imponible", "iva", "total"]
CAMPOS_GASTOS = ["fecha", "proveedor", "concepto", "base_imponible", "iva", "total"]

def _leer_excel(file_bytes: bytes):
    return pd.read_excel(BytesIO(file_bytes))

def _validar_campos(df: pd.DataFrame, campos: List[str]):
    errores = []
    for c in campos:
        if c not in df.columns:
            errores.append(f"Falta columna obligatoria: {c}")
    return errores

def validar_ingresos_excel(file_bytes: bytes):
    df = _leer_excel(file_bytes)
    errores = _validar_campos(df, CAMPOS_INGRESOS)

    duplicados = df.duplicated(subset=["fecha", "cliente", "total"])
    if duplicados.any():
        errores.append(f"Ingresos duplicados: {duplicados.sum()} filas")

    negativos = df[df["total"] < 0]
    if not negativos.empty:
        errores.append(f"Ingresos con total negativo: {len(negativos)} filas")

    return {
        "filas": len(df),
        "errores": errores,
    }

def validar_gastos_excel(file_bytes: bytes):
    df = _leer_excel(file_bytes)
    errores = _validar_campos(df, CAMPOS_GASTOS)

    duplicados = df.duplicated(subset=["fecha", "proveedor", "total"])
    if duplicados.any():
        errores.append(f"Gastos duplicados: {duplicados.sum()} filas")

    negativos = df[df["total"] < 0]
    if not negativos.empty:
        errores.append(f"Gastos con total negativo: {len(negativos)} filas")

    return {
        "filas": len(df),
        "errores": errores,
    }
