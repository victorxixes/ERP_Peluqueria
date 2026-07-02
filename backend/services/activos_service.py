from sqlalchemy.orm import Session
from models.activo import Activo
from datetime import datetime
from services.logs_service import registrar_log

def crear_activo(db: Session, data: dict):
    valor = data["valor_compra"]
    vida = data["vida_util"]
    amortizacion = round(valor / vida, 2)

    activo = Activo(
        nombre=data["nombre"],
        fecha_compra=datetime.strptime(data["fecha_compra"], "%Y-%m-%d"),
        proveedor_id=data.get("proveedor_id"),
        categoria=data["categoria"],
        valor_compra=valor,
        vida_util=vida,
        amortizacion_anual=amortizacion,
        descripcion=data.get("descripcion", "")
    )

    db.add(activo)
    db.commit()
    db.refresh(activo)

    registrar_log(
        db,
        usuario="admin",
        accion="Crear activo",
        detalle=f"ID: {activo.id} | Categoria: {activo.categoria} | Amortización anual: {activo.amortizacion_anual}"
    )

    return activo

def listar_activos(db: Session):
    return db.query(Activo).all()

def obtener_activo(db: Session, activo_id: int):
    return db.query(Activo).filter(Activo.id == activo_id).first()

def actualizar_activo(db: Session, activo_id: int, data: dict):
    activo = obtener_activo(db, activo_id)
    if not activo:
        return None

    for key, value in data.items():
        if key == "fecha_compra":
            value = datetime.strptime(value, "%Y-%m-%d")
        setattr(activo, key, value)

    # Recalcular amortización si cambian valor o vida útil
    if "valor_compra" in data or "vida_util" in data:
        activo.amortizacion_anual = round(activo.valor_compra / activo.vida_util, 2)

    db.commit()
    db.refresh(activo)

    registrar_log(
        db,
        usuario="admin",
        accion="Actualizar activo",
        detalle=f"ID: {activo.id}"
    )

    return activo

def eliminar_activo(db: Session, activo_id: int):
    activo = obtener_activo(db, activo_id)
    if not activo:
        return None

    db.delete(activo)
    db.commit()

    registrar_log(
        db,
        usuario="admin",
        accion="Eliminar activo",
        detalle=f"ID: {activo_id}"
    )

    return True
