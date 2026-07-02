from sqlalchemy.orm import Session, joinedload
from models.producto import Producto
from datetime import datetime

# ---------------------------------------------------------
# LISTAR PRODUCTOS (optimizado)
# ---------------------------------------------------------
def listar_productos(
    db: Session,
    skip: int = 0,
    limit: int = 50,
    categoria: str | None = None,
    proveedor_id: int | None = None,
    nombre: str | None = None
):
    query = db.query(Producto).options(
        joinedload(Producto.proveedor),
        joinedload(Producto.variantes)
    )

    if categoria:
        query = query.filter(Producto.categoria == categoria)

    if proveedor_id:
        query = query.filter(Producto.proveedor_id == proveedor_id)

    if nombre:
        query = query.filter(Producto.nombre.ilike(f"%{nombre}%"))

    return (
        query.order_by(Producto.nombre.asc())
        .offset(skip)
        .limit(limit)
        .all()
    )


# ---------------------------------------------------------
# OBTENER PRODUCTO POR ID
# ---------------------------------------------------------
def obtener_producto(db: Session, producto_id: int):
    return db.query(Producto).options(
        joinedload(Producto.proveedor),
        joinedload(Producto.variantes)
    ).filter(Producto.id == producto_id).first()


# ---------------------------------------------------------
# CREAR PRODUCTO
# ---------------------------------------------------------
def crear_producto(db: Session, data: dict):
    producto = Producto(
        nombre=data["nombre"],
        categoria=data.get("categoria"),
        codigo=data.get("codigo"),
        precio=data.get("precio", 0),
        iva=data.get("iva"),
        proveedor_id=data.get("proveedor_id"),
        stock=data.get("stock", 0),
        descripcion=data.get("descripcion", ""),
        activo=data.get("activo", True),
        creado_en=datetime.utcnow()
    )

    db.add(producto)
    db.commit()
    db.refresh(producto)
    return producto


# ---------------------------------------------------------
# ACTUALIZAR PRODUCTO
# ---------------------------------------------------------
def actualizar_producto(db: Session, producto_id: int, data: dict):
    producto = obtener_producto(db, producto_id)
    if not producto:
        return None

    for campo, valor in data.items():
        setattr(producto, campo, valor)

    db.commit()
    db.refresh(producto)
    return producto


# ---------------------------------------------------------
# BORRAR PRODUCTO
# ---------------------------------------------------------
def borrar_producto(db: Session, producto_id: int):
    producto = obtener_producto(db, producto_id)
    if not producto:
        return None

    db.delete(producto)
    db.commit()
    return True
