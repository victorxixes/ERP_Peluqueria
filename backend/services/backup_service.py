import os
import shutil
from datetime import datetime
from sqlalchemy.orm import Session
from services.logs_service import registrar_log

BACKUP_DIR = "backups"
DB_PATH = "database.db"  # Ajusta si tu BD tiene otro nombre


def crear_backup_zip(db: Session):
    os.makedirs(BACKUP_DIR, exist_ok=True)

    fecha = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    zip_name = f"backup_{fecha}"
    zip_path = os.path.join(BACKUP_DIR, f"{zip_name}.zip")

    # Crear ZIP del proyecto entero
    shutil.make_archive(
        base_name=os.path.join(BACKUP_DIR, zip_name),
        format="zip",
        root_dir="."
    )

    registrar_log(
        db,
        tipo="BACKUP",
        accion="backup manual generado",
        usuario="system",
        datos={"archivo": zip_path}
    )

    return zip_path


def listar_backups():
    os.makedirs(BACKUP_DIR, exist_ok=True)
    archivos = []

    for nombre in os.listdir(BACKUP_DIR):
        if nombre.endswith(".zip"):
            ruta = os.path.join(BACKUP_DIR, nombre)
            tamano_mb = round(os.path.getsize(ruta) / (1024 * 1024), 2)

            archivos.append({
                "nombre": nombre,
                "tamano": tamano_mb,
                "fecha": nombre.replace("backup_", "").replace(".zip", "")
            })

    return archivos


def restaurar_backup(db: Session, filename: str):
    ruta_zip = os.path.join(BACKUP_DIR, filename)

    if not os.path.exists(ruta_zip):
        raise FileNotFoundError("Backup no encontrado")

    # Restaurar el ZIP completo sobre el ERP
    shutil.unpack_archive(ruta_zip, ".", "zip")

    registrar_log(
        db,
        tipo="BACKUP",
        accion="backup restaurado",
        usuario="system",
        datos={"archivo": ruta_zip}
    )

    return {"mensaje": "Backup restaurado correctamente"}
