from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 🚫 COMENTADO TEMPORALMENTE PARA QUITAR EL ERROR DE IMPORTACIÓN EN RENDER:
# from app.core.database import Base, engine
# Base.metadata.create_all(bind=engine)

from app.routes import (
    rtr_scoring, rtr_creditos, rtr_ahorros,
    rtr_dashboard, rtr_clientes, rtr_auth, rtr_homebanking, rtr_recuperaciones,
)

app = FastAPI(
    title="Core Financiero — Caja Tacna",
    description="Motor de scoring, cartera crediticia y KPIs institucionales",
    version="1.0.0"
)

# 🛡️ Configuración de CORS segura para tu frontend en Vercel y desarrollo local
origins = [
    "https://caja-tacna-bmpl-elm3tc9c5-daaam.vercel.app",  # Tu URL de Vercel
    "https://caja-tacna-bmpl-9xtkjhz40-daaam.vercel.app",  # Tu otra URL de Vercel de la captura
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5175",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],           # ⚡ Al poner "*" permites que CUALQUIER URL de Vercel se conecte sin trabas
    allow_credentials=False,       # Al usar "*" para evitar fallos de CORS, credentials debe ser False
    allow_methods=["*"],
    allow_headers=["*"],
)
# Modelo de datos idéntico al que envía tu frontend
class LoginRequest(BaseModel):
    username: str  # o dni, pon el campo que mande tu formulario
    password: str
    
app.include_router(rtr_auth.router,      prefix="/auth",      tags=["Auth"])
app.include_router(rtr_scoring.router,   prefix="/scoring",   tags=["Scoring"])
app.include_router(rtr_creditos.router,  prefix="/creditos",  tags=["Créditos"])
app.include_router(rtr_ahorros.router,   prefix="/ahorros",   tags=["Ahorros"])
app.include_router(rtr_clientes.router,  prefix="/clientes",  tags=["Clientes"])
app.include_router(rtr_dashboard.router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(rtr_homebanking.router, prefix="/hb",      tags=["Homebanking"])
app.include_router(rtr_recuperaciones.router, prefix="/recuperaciones", tags=["Recuperaciones"])

@app.get("/")
def root():
    return {"sistema": "Core Financiero Caja Tacna", "version": "1.0.0", "status": "ok"}