from db import SessionLocal
from models.usuario import Usuario
from core.password import hash_password

def crear_admin():
    db = SessionLocal()

    # Si ya existe un admin, no lo crea
    existe = db.query(Usuario).filter(Usuario.email == "admin@erp.com").first()
    if existe:
        print("El admin ya existe")
        return

    admin = Usuario(
        nombre="Administrador",
        email="admin@erp.com",
        rol="admin",
        password_hash=hash_password("admin123")  # contraseña inicial
    )

    db.add(admin)
    db.commit()
    db.refresh(admin)

    print("Admin creado:", admin.email)

if __name__ == "__main__":
    crear_admin()
