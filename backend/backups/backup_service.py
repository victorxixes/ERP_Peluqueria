import os
import shutil
from datetime import datetime
from sqlalchemy.orm import Session
from services.logs_service import registrar_log

BACKUP_DIR = "backups"
DB_PATH = "database.db"  # ajusta si tu BD tiene otro nombre


def crear_backup_zip(db: Session):
    # Crear carpeta si no existe
    os.makedirs(BACKUP_DIR, exist_ok=True)

    fecha = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    zip_path = os.path.join(BACKUP_DIR, f"backup_{fecha}.zip")

    # Carpetas y archivos a incluir
    elementos = [
        DB_PATH,
        "informes",
        "logs",
        "cierres",
        "uploads"
    ]

    with shutil.make_archive(zip_path.replace(".zip", ""), 'zip', root_dir="."):
        pass

    registrar_log(
        db,
        tipo="BACKUP",
        accion="backup manual generado",
        usuario="system",
        datos={"archivo": zip_path}
    )

    return zip_path
