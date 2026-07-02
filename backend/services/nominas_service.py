from sqlalchemy.orm import Session
from models.nomina import Nomina
from datetime import datetime
from services.logs_service import registrar_log

def crear_nomina(db: Session, data: dict):
    bruto = data["salario_bruto"]
    irpf = data.get("irpf", round(bruto * 0.15, 2))
    ss = data.get("seguridad_social", round(bruto * 0.065, 2))
    neto = bruto - irpf - ss

    nomina = Nomina(
        empleado=data["empleado"],
        fecha=datetime.strptime(data["fecha"], "%Y-%m-%d"),
        salario_bruto=bruto,
        irpf=irpf,
        seguridad_social=ss,
        salario_neto=neto,
        proveedor_id=data.get("proveedor_id")
    )

    db.add(nomina)
    db.commit()
    db.refresh(nomina)

    registrar_log(
        db,
        usuario="admin",
        accion="Crear nómina",
        detalle=f"ID: {nomina.id} | Empleado: {nomina.empleado} | Neto: {nomina.salario_neto}"
    )

    return nomina

def listar_nominas(db: Session):
    return db.query(Nomina).all()

def obtener_nomina(db: Session, nomina_id: int):
    return db.query(Nomina).filter(Nomina.id == nomina_id).first()

def actualizar_nomina(db: Session, nomina_id: int, data: dict):
    nomina = obtener_nomina(db, nomina_id)
    if not nomina:
        return None

    for key, value in data.items():
        if key == "fecha":
            value = datetime.strptime(value, "%Y-%m-%d")
        setattr(nomina, key, value)

    # Recalcular neto si cambian bruto, IRPF o SS
    bruto = nomina.salario_bruto
    irpf = nomina.irpf
    ss = nomina.seguridad_social
    nomina.salario_neto = bruto - irpf - ss

    db.commit()
    db.refresh(nomina)

    registrar_log(
        db,
        usuario="admin",
        accion="Actualizar nómina",
        detalle=f"ID: {nomina.id}"
    )

    return nomina

def eliminar_nomina(db: Session, nomina_id: int):
    nomina = obtener_nomina(db, nomina_id)
    if not nomina:
        return None

    db.delete(nomina)
    db.commit()

    registrar_log(
        db,
        usuario="admin",
        accion="Eliminar nómina",
        detalle=f"ID: {nomina_id}"
    )

    return True
