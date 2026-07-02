from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from datetime import timedelta

from core.security import create_access_token, create_refresh_token, decode_token
from core.password import verify_password
from schemas.auth import LoginRequest, TokenResponse, RefreshRequest
from db import get_db
from models.usuario import Usuario

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.email == data.email).first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    if not user.activo:
        raise HTTPException(status_code=403, detail="Usuario desactivado")

    payload = {"sub": str(user.id), "email": user.email, "rol": user.rol}

    access = create_access_token(payload)
    refresh = create_refresh_token(payload)

    return TokenResponse(access_token=access, refresh_token=refresh)

@router.post("/refresh", response_model=TokenResponse)
def refresh(data: RefreshRequest, db: Session = Depends(get_db)):
    try:
        decoded = decode_token(data.refresh_token, expected_type="refresh")

        user = db.get(Usuario, int(decoded["sub"]))
        if not user or not user.activo:
            raise HTTPException(status_code=403, detail="Usuario desactivado")

        payload = {"sub": decoded["sub"], "email": decoded["email"], "rol": decoded["rol"]}

        access = create_access_token(payload)
        refresh = create_refresh_token(payload)

        return TokenResponse(access_token=access, refresh_token=refresh)

    except Exception:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
