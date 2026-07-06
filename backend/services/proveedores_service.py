from sqlalchemy.orm import Session
from models.proveedor import Proveedor
from services.logs_service import registrar_log


def crear_proveedor(db: Session, data: dict):
    proveedor = Proveedor(**data)
    db.add(proveedor)
    db.commit()
    db.refresh(proveedor)
    return proveedor

def listar_proveedores(db: Session):
    return db.query(Proveedor).all()

def obtener_proveedor(db: Session, proveedor_id: int):
    return db.query(Proveedor).filter(Proveedor.id == proveedor_id).first()

def actualizar_proveedor(db: Session, proveedor_id: int, data: dict):
    proveedor = obtener_proveedor(db, proveedor_id)
    if not proveedor:
        return None

    for key, value in data.items():
        setattr(proveedor, key, value)

    db.commit()
    db.refresh(proveedor)
    return proveedor

def eliminar_proveedor(db: Session, proveedor_id: int):
    proveedor = obtener_proveedor(db, proveedor_id)
    if not proveedor:
        return None

    db.delete(proveedor)
    db.commit()
    return True
