import pandas as pd
from sqlalchemy.orm import Session
import json
import os

SERVICIOS_PATH = "data/catalogo_servicios.xlsx"
PRODUCTOS_PATH = "data/catalogo_productos.xlsx"
APRENDIZAJE_PATH = "data/aprendizaje.json"


def cargar_catalogo(path: str) -> set:
    df = pd.read_excel(path)
    return set(df.iloc[:, 0].astype(str).str.strip().tolist())


def guardar_catalogo(path: str, items: list):
    df = pd.DataFrame(items, columns=["nombre"])
    df.to_excel(path, index=False)


def cargar_aprendizaje() -> dict:
    if not os.path.exists(APRENDIZAJE_PATH):
        return {}
    with open(APRENDIZAJE_PATH, "r") as f:
        return json.load(f)


def guardar_aprendizaje(data: dict):
    with open(APRENDIZAJE_PATH, "w") as f:
        json.dump(data, f, indent=4)


def clasificar_items(db: Session, clasificaciones: dict):
    """
    clasificaciones = {
        "MELU Spray 500ML": "producto",
        "COLOR XPRESS": "servicio"
    }
    """

    servicios = cargar_catalogo(SERVICIOS_PATH)
    productos = cargar_catalogo(PRODUCTOS_PATH)
    aprendizaje = cargar_aprendizaje()

    nuevos_servicios = []
    nuevos_productos = []

    for item, tipo in clasificaciones.items():
        item = item.strip()

        # Guardar en aprendizaje automático
        aprendizaje[item] = tipo

        # Añadir al catálogo correspondiente
        if tipo == "servicio":
            if item not in servicios:
                servicios.add(item)
                nuevos_servicios.append(item)

        elif tipo == "producto":
            if item not in productos:
                productos.add(item)
                nuevos_productos.append(item)

    # Guardar catálogos actualizados
    guardar_catalogo(SERVICIOS_PATH, list(servicios))
    guardar_catalogo(PRODUCTOS_PATH, list(productos))

    # Guardar aprendizaje automático
    guardar_aprendizaje(aprendizaje)

    return {
        "status": "OK",
        "mensaje": "Aprendizaje completado",
        "nuevos_servicios": nuevos_servicios,
        "nuevos_productos": nuevos_productos,
        "total_aprendidos": len(clasificaciones)
    }


def clasificar_automaticamente(item: str) -> str | None:
    """
    Devuelve 'servicio', 'producto' o None si no se puede clasificar.
    """
    aprendizaje = cargar_aprendizaje()
    item = item.strip()

    # Coincidencia exacta
    if item in aprendizaje:
        return aprendizaje[item]

    # Coincidencia por patrones
    lower = item.lower()

    patrones_servicio = ["corte", "peinado", "mechas", "color", "tratamiento"]
    patrones_producto = ["ml", "shampoo", "conditioner", "mask", "spray", "oil"]

    if any(p in lower for p in patrones_servicio):
        return "servicio"

    if any(p in lower for p in patrones_producto):
        return "producto"

    return None
