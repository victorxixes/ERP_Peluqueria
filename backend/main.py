from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import Base, engine

# ============================
# IMPORTA TODOS LOS MODELOS REALES
# ============================
from models.usuario import Usuario
from models.proveedor import Proveedor
from models.producto import Producto
from models.historico import Historico
from models.gasto import Gasto
from models.activo import Activo
from models.ingreso import Ingreso
from models.log import Log
from models.nomina import Nomina
from models.irpf_prevision import IRPFPrevision
from models.iva_resumen import IVAResumen
from models.servicio import Servicio
from models.informes import Informe

# Crear tablas
Base.metadata.create_all(bind=engine)

# ============================
# IMPORTA TODOS LOS ROUTERS
# ============================

# Routers principales
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
from routers.prevision_iva import router as prevision_iva_router
from routers.cierre_fiscal import router as cierre_fiscal_router

# Routers adicionales (CORREGIDOS)
from routers.iva import router as iva_router
from routers.proveedores import router as proveedores_router
from routers.usuarios import router as usuarios_router
from routers.servicios import router as servicios_router
from routers.productos import router as productos_router
from routers.gastos import router as gastos_router
from routers.ingresos import router as ingresos_router
from routers.nominas import router as nominas_router
from routers.activos import router as activos_router
from routers.auth import router as auth_router

# ============================
# APP
# ============================

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://erp-peluqueria-1.onrender.com",
         "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================
# MONTAR ROUTERS
# ============================

app.include_router(importar_caja_router)
app.include_router(catalogo_router)
app.include_router(irpf_router)
app.include_router(iva_router)  # ✔ CORREGIDO
app.include_router(dashboard_router)
app.include_router(logs_router)
app.include_router(historico_router)
app.include_router(configuracion_fiscal_router)
app.include_router(validacion_excel_router)
app.include_router(backup_router)
app.include_router(ia_fiscal_router)
app.include_router(modelo_390_router)
app.include_router(informes_router)
app.include_router(prevision_iva_router)
app.include_router(cierre_fiscal_router)

app.include_router(proveedores_router)
app.include_router(usuarios_router)
app.include_router(servicios_router)
app.include_router(productos_router)
app.include_router(gastos_router)
app.include_router(ingresos_router)
app.include_router(nominas_router)
app.include_router(activos_router)
app.include_router(auth_router)
