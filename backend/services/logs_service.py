from sqlalchemy.orm import Session
from datetime import datetime
from models.log import Log


def registrar_log(db: Session, tipo: str, accion: str, usuario: str, datos: dict):
    """
    Registra un log de auditoría fiscal en la base de datos.

    Parámetros:
        tipo: categoría del log ("IVA", "CIERRE FISCAL", "INFORME", "ERROR", etc.)
        accion: descripción de la acción realizada
        usuario: email o id del usuario que ejecuta la acción
        datos: información adicional relevante (payload, parámetros, resultado, etc.)
    """

    log = Log(
        tipo=tipo,
        accion=accion,
        usuario=usuario,
        fecha=datetime.utcnow(),
        datos=datos or {}
    )

    db.add(log)
    db.commit()
    db.refresh(log)

    return log
