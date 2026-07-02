import os
from datetime import datetime, timedelta
from uuid import uuid4
from jose import jwt, JWTError

SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise Exception("SECRET_KEY no configurada")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    now = datetime.utcnow()
    expire = now + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))

    to_encode = data.copy()
    to_encode.update({
        "exp": expire,
        "iat": now,
        "nbf": now,
        "type": "access",
        "iss": "erp-fiscal",
        "aud": "erp-fiscal-frontend",
        "jti": uuid4().hex
    })

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def create_refresh_token(data: dict):
    now = datetime.utcnow()
    expire = now + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)

    to_encode = data.copy()
    to_encode.update({
        "exp": expire,
        "iat": now,
        "nbf": now,
        "type": "refresh",
        "iss": "erp-fiscal",
        "aud": "erp-fiscal-frontend",
        "jti": uuid4().hex
    })

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str, expected_type: str = "access"):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

    if payload.get("type") != expected_type:
        raise JWTError("Tipo de token inválido")

    return payload
