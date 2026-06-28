"""Router de autenticación."""
from fastapi import APIRouter, Depends
from sqlalchemy.engine import Connection

from app.controllers import ctrl_auth
from app.core.cfg_database import get_db
from app.schemas.sch_auth import LoginRequest, LoginResponse

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=LoginResponse)
def login(body: LoginRequest, conn: Connection = Depends(get_db)):
    # 🌟 CAMBIO: Le pasamos el objeto 'body' completo para que el controlador tenga el username, password Y dni
    return ctrl_auth.login(conn, body)