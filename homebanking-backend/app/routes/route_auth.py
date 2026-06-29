from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.core.cfg_database import get_db
from app.schemas.sch_auth import TokenOut
from app.controllers.ctrl_auth import login as ctrl_login

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login", response_model=TokenOut)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    class Body:
        def __init__(self, username):
            self.username = username
    body = Body(username=form_data.username)
    conn = db.connection()
    result = ctrl_login(conn, body)
    if not result:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    return result