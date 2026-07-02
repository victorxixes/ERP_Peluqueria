from sqlalchemy.orm import Session, joinedload
from models.gasto import Gasto
from datetime import datetime
from services.logs_service import registrar_log

# ---------------------------------------------------------
# CREAR GASTO
# ---------------------------------------------------------
def crear_gasto(db: Session, data: dict):
    base = data["base_imponible"]
    iva = data.get("iva", round(base * 0.21, 2))
    total = base + iva

    gasto = Gasto(
        fecha=datetime.strptime(data["fecha"], "%Y-%m-%d"),
        proveedor_id=data.get("proveedor_id"),
        categoria=data["categoria"],
        descripcion=data.get("descripcion", ""),
        base_imponible=base,
        iva=iva,
        total=total,
    )

    db.add(gasto)
    db.commit()
    db.refresh(gasto)

    registrar_log(
        db,
        usuario="admin",
        accion="Crear gasto",
        detalle=f"ID: {gasto.id} | Categoria: {gasto.categoria} | Total: {gasto.total}"
    )

    return gasto


# ---------------------------------------------------------
# LISTAR GASTOS (optimizado)
# ---------------------------------------------------------
def listar_gastos(
    db: Session,
    skip: int = 0,
    limit: int = 50,
    categoria: str | None = None,
    proveedor_id: int | None = None,
    desde: str | None = None,
    hasta: str | None = None
):
    query = db.query(Gasto).options(
        joinedload(Gasto.proveedor)
    )

    if categoria:
        query = query.filter(Gasto.categoria == categoria)

    if proveedor_id:
        query = query.filter(Gasto.proveedor_id == proveedor_id)

    if desde and hasta:
        query = query.filter(Gasto.fecha.between(desde, hasta))

    return (
        query.order_by(Gasto.fecha.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


# ---------------------------------------------------------
# OBTENER GASTO POR ID
# ---------------------------------------------------------
def obtener_gasto(db: Session, gasto_id: int):
    return db.query(Gasto).options(
        joinedload(Gasto.proveedor)
    ).filter(Gasto.id == gasto_id).first()


# ---------------------------------------------------------
# ACTUALIZAR GASTO
# ---------------------------------------------------------
def actualizar_gasto(db: Session, gasto_id: int, data: dict):
    gasto = obtener_gasto(db, gasto_id)
    if not gasto:
        return None

    for key, value in data.items():
        if key == "fecha":
            value = datetime.strptime(value, "%Y-%m-%d")
        setattr(gasto, key, value)

    db.commit()
    db.refresh(gasto)

    registrar_log(
        db,
        usuario="admin",
        accion="Actualizar gasto",
        detalle=f"ID: {gasto.id}"
    )

    return gasto


# ---------------------------------------------------------
# ELIMINAR GASTO
# ---------------------------------------------------------
def eliminar_gasto(db: Session, gasto_id: int):
    gasto = obtener_gasto(db, gasto_id)
    if not gasto:
        return None

    db.delete(gasto)
    db.commit()

    registrar_log(
        db,
        usuario="admin",
        accion="Eliminar gasto",
        detalle=f"ID: {gasto_id}"
    )

    return True
