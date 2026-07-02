@echo off
echo ============================================
echo   Arrancando FASTAPI (ERP K-Tomas)
echo ============================================

REM --- Ir a la carpeta del proyecto ---
cd /d %~dp0

REM --- Activar entorno virtual (si existe) ---
if exist venv\Scripts\activate (
    echo Activando entorno virtual...
    call venv\Scripts\activate
) else (
    echo No se encontró entorno virtual. Arrancando sin venv...
)

REM --- Arrancar FastAPI ---
echo Iniciando servidor Uvicorn...
uvicorn main:app --reload --host 127.0.0.1 --port 8000

pause
