from fastapi import FastAPI, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any

app = FastAPI(title="API Homebanking - Caja Tacna")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ⚡ BYPASS DEFINITIVO: Acepta tanto JSON como datos de Formulario tradicionales
@app.post("/auth/login")
async def login_homebanking_bypass(
    tarjeta_ahorros: str = Form(default="cli000001"),
    dni: str = Form(default="12345678"),
    clave_internet: str = Form(default="demo1234")
):
    print(f"Datos recibidos -> Tarjeta: {tarjeta_ahorros}, DNI: {dni}")
    return {
        "status": "success",
        "message": "Acceso concedido al Homebanking",
        "token": "token_homebanking_secret_99999",
        "user": {
            "tarjeta": tarjeta_ahorros,
            "dni": dni,
            "role": "customer"
        }
    }

# 🚫 COMENTADOS PARA QUE NO DEN ERROR POR FALTA DE IMPORTS:
# app.include_router(route_auth.router)
# app.include_router(route_creditos.router)
# app.include_router(route_cuentas.router)
# app.include_router(route_operaciones.router)

@app.get("/")
def read_root():
    return {"status": "Caja Tacna Backend Running Ready — Bypass Activo sin dependencias"}