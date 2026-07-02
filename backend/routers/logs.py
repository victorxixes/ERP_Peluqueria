from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.auth_dep import get_current_user
from models.usuario import Usuario
from models.log import Log
from db import get_db

router = APIRouter(prefix="/logs", tags=["Logs"])


@router.get("/")
def get_logs(
    user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Listar los últimos 200 logs ordenados por fecha descendente
    return (
        db.query(Log)
        .order_by(Log.fecha.desc())
        .limit(200)
        .all()
    )
