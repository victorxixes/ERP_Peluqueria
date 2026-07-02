from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError

from core.security import decode_token
from db import get_db
from models.usuario import Usuario


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


# ---------------------------------------------------------
# OBTENER USUARIO ACTUAL DESDE TOKEN
# ---------------------------------------------------------

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> Usuario:
    try:
        payload = decode_token(token)
        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(status_code=401, detail="Token inválido")

        user = db.get(Usuario, int(user_id))
        if not user:
            raise HTTPException(status_code=401, detail="Usuario no encontrado")

        if not user.activo:
            raise HTTPException(status_code=403, detail="Usuario desactivado")

        return user

    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")


# ---------------------------------------------------------
# REQUERIR ADMIN O GESTOR
# ---------------------------------------------------------

def require_admin(user: Usuario = Depends(get_current_user)):
    if user.rol not in ["admin", "gestor"]:
        raise HTTPException(status_code=403, detail="Acceso denegado")
    return user
