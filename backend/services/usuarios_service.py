from sqlalchemy.orm import Session
from models.usuario import Usuario
from services.logs_service import registrar_log

registrar_log(db, usuario="admin", accion="Crear ingreso", detalle=f"ID: {ingreso.id}")


def crear_usuario(db: Session, data: dict):
    usuario = Usuario(**data)
    db.add(usuario)
    db.commit()
    db.refresh(usuario)
    return usuario

def listar_usuarios(db: Session):
    return db.query(Usuario).all()

def obtener_usuario(db: Session, usuario_id: int):
    return db.query(Usuario).filter(Usuario.id == usuario_id).first()

def actualizar_usuario(db: Session, usuario_id: int, data: dict):
    usuario = obtener_usuario(db, usuario_id)
    if not usuario:
        return None

    for key, value in data.items():
        setattr(usuario, key, value)

    db.commit()
    db.refresh(usuario)
    return usuario

def eliminar_usuario(db: Session, usuario_id: int):
    usuario = obtener_usuario(db, usuario_id)
    if not usuario:
        return None

    db.delete(usuario)
    db.commit()
    return True
