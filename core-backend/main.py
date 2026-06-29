from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Core Financiero — Caja Tacna",
    description="Motor de scoring, cartera crediticia y KPIs institucionales",
    version="1.0.0"
)

# 🛡️ CORS configurado al 100% libre para evitar bloqueos con cualquier URL de Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ⚡ LOGIN BYPASS: Intercepta la petición y responde OK al instante sin tocar la base de datos rota
@app.post("/auth/login")
async def login_bypass(payload: dict):
    return {
        "status": "success",
        "message": "Login correcto (Bypass)",
        "token": "token_falso_de_emergencia_12345",
        "user": {
            "name": "Usuario Caja Tacna",
            "role": "admin"
        }
    }

@app.get("/")
def root():
    return {"sistema": "Core Financiero Caja Tacna — Bypass Activo", "version": "1.0.0", "status": "ok"}