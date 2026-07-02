from fastapi import FastAPI
from db import Base, engine
# IMPORTA TODOS LOS MODELOS ANTES DE CREAR TABLAS
from models.usuario import Usuario
from models.proveedor import Proveedor
from models.producto import Producto
from models.historico import Historico
from models.gasto import Gasto
from models.activo import Activo

# Crear tablas (solo temporal)
Base.metadata.create_all(bind=engine)

# Routers que SÍ funcionan
from routers.importar_caja import router as importar_caja_router
from routers.catalogo import router as catalogo_router
from routers.irpf import router as irpf_router
from routers.dashboard import router as dashboard_router
from routers.logs import router as logs_router
from routers.historico import router as historico_router
from routers.configuracion_fiscal import router as configuracion_fiscal_router
from routers.validacion_excel import router as validacion_excel_router
from routers.backup import router as backup_router
from routers.ia_fiscal import router as ia_fiscal_router
from routers.modelo_390 import router as modelo_390_router
from routers.informes import router as informes_router
from routers.backup import router as backup_router

app = FastAPI()

# Activamos SOLO los routers que funcionan
app.include_router(importar_caja_router)
app.include_router(catalogo_router)
app.include_router(irpf_router)
app.include_router(dashboard_router)
app.include_router(logs_router)
app.include_router(historico_router)
app.include_router(configuracion_fiscal_router)
app.include_router(validacion_excel_router)
app.include_router(backup_router)
app.include_router(ia_fiscal_router)
app.include_router(modelo_390_router)
app.include_router(informes_router)
app.include_router(backup_router)

# Routers desactivados temporalmente (tienen errores internos)
# app.include_router(iva.router)
# app.include_router(proveedores.router)
# app.include_router(usuarios.router)
# app.include_router(servicios.router)
# app.include_router(productos.router)
# app.include_router(gastos.router)
# app.include_router(ingresos.router)
# app.include_router(nominas.router)
# app.include_router(informes.router)
# app.include_router(activos.router)
# app.include_router(auth.router)
