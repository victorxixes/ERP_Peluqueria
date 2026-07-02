from sqlalchemy.orm import Session
from models.ingreso import Ingreso
from datetime import datetime
from services.logs_service import registrar_log

def crear_ingreso(db: Session, data: dict):
    base = data["base_imponible"]
    iva = data.get("iva", round(base * 0.21, 2))
    total = base + iva

    ingreso = Ingreso(
        fecha=datetime.strptime(data["fecha"], "%Y-%m-%d"),
        origen=data["origen"],
        categoria=data["categoria"],  # servicios / productos / otros
        descripcion=data.get("descripcion", ""),
        base_imponible=base,
        iva=iva,
        total=total,
        medio_pago=data.get("medio_pago", ""),
    )

    db.add(ingreso)
    db.commit()
    db.refresh(ingreso)

    # Log correcto
    registrar_log(
        db,
        usuario="admin",
        accion="Crear ingreso",
        detalle=f"ID: {ingreso.id} | Categoria: {ingreso.categoria} | Total: {ingreso.total}"
    )

    return ingreso

def listar_ingresos(db: Session):
    return db.query(Ingreso).all()

def obtener_ingreso(db: Session, ingreso_id: int):
    return db.query(Ingreso).filter(Ingreso.id == ingreso_id).first()

def actualizar_ingreso(db: Session, ingreso_id: int, data: dict):
    ingreso = obtener_ingreso(db, ingreso_id)
    if not ingreso:
        return None

    for key, value in data.items():
        if key == "fecha":
            value = datetime.strptime(value, "%Y-%m-%d")
        setattr(ingreso, key, value)

    db.commit()
    db.refresh(ingreso)

    registrar_log(
        db,
        usuario="admin",
        accion="Actualizar ingreso",
        detalle=f"ID: {ingreso.id}"
    )

    return ingreso

def eliminar_ingreso(db: Session, ingreso_id: int):
    ingreso = obtener_ingreso(db, ingreso_id)
    if not ingreso:
        return None

    db.delete(ingreso)
    db.commit()

    registrar_log(
        db,
        usuario="admin",
        accion="Eliminar ingreso",
        detalle=f"ID: {ingreso_id}"
    )

    return True
