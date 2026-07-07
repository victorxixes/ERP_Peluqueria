from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from models.log import Log
from db import get_db

router = APIRouter(prefix="/logs", tags=["Logs"])


@router.get("/")
def get_logs(
    db: Session = Depends(get_db)
):
    # Listar los últimos 200 logs ordenados por fecha descendente
    return (
        db.query(Log)
        .order_by(Log.fecha.desc())
        .limit(200)
        .all()
    )
