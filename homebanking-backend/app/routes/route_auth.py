from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.cfg_database import get_db
from app.schemas.sch_auth import TokenOut
from app.services.auth import login as auth_login  # Asegúrate de apuntar a tu auth.py
from pydantic import BaseModel

# 1. Definimos localmente el esquema exacto que manda el Core-Frontend para no fallar
class CoreLoginSchema(BaseModel):
    numerodni: str
    password: str

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login", response_model=TokenOut)
def login(data: CoreLoginSchema, db: Session = Depends(get_db)):
    # 2. Extraemos los datos del JSON plano y se los pasamos a tu función de base de datos
    result = auth_login(db, numerodni=data.numerodni, password=data.password)
    
    if not result:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
        
    return result
