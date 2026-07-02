from sqlalchemy.orm import Session
from models.servicio import Servicio

def listar_servicios(db: Session):
    return db.query(Servicio).filter(Servicio.activo == True).all()

def obtener_servicio(db: Session, servicio_id: int):
    return db.query(Servicio).filter(Servicio.id == servicio_id).first()

def crear_servicio(db: Session, data: dict):
    servicio = Servicio(
        nombre=data.get("nombre"),
        categoria=data.get("categoria"),
        precio=data.get("precio"),
        iva=data.get("iva", 21.0),
        activo=True
    )
    db.add(servicio)
    db.commit()
    db.refresh(servicio)
    return servicio

def actualizar_servicio(db: Session, servicio_id: int, data: dict):
    servicio = obtener_servicio(db, servicio_id)
    if not servicio:
        return None

    servicio.nombre = data.get("nombre", servicio.nombre)
    servicio.categoria = data.get("categoria", servicio.categoria)
    servicio.precio = data.get("precio", servicio.precio)
    servicio.iva = data.get("iva", servicio.iva)
    servicio.activo = data.get("activo", servicio.activo)

    db.commit()
    db.refresh(servicio)
    return servicio

def borrar_servicio(db: Session, servicio_id: int):
    servicio = obtener_servicio(db, servicio_id)
    if not servicio:
        return False

    servicio.activo = False
    db.commit()
    return True
