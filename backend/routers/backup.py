from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from core.auth_dep import require_admin
from db import get_db
from services.backup_service import crear_backup_zip, listar_backups, restaurar_backup

router = APIRouter(prefix="/backup", tags=["Backup"])


@router.get("/list")
def listar(user=Depends(require_admin)):
    return listar_backups()


@router.post("/run")
def generar_backup(db: Session = Depends(get_db), user=Depends(require_admin)):
    zip_path = crear_backup_zip(db)
    return FileResponse(zip_path, filename=zip_path.split("/")[-1])


@router.get("/download/{filename}")
def descargar_backup(filename: str, user=Depends(require_admin)):
    ruta = f"backups/{filename}"
    return FileResponse(ruta, filename=filename)


@router.post("/restore/{filename}")
def restaurar(filename: str, db: Session = Depends(get_db), user=Depends(require_admin)):
    return restaurar_backup(db, filename)
