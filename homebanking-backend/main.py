from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import route_auth, route_creditos, route_cuentas, route_operaciones

app = FastAPI(
    title="API Homebanking - Caja Tacna",
    description="Core backend con controles de ciberseguridad perimetral.",
    version="1.0.0"
)

# 🛡️ MITIGACIÓN CONFIGURACIÓN INSEGURA: Liberar política CORS para entorno local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Abre la comunicación directo con http://localhost:5175
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusión de tus rutas nativas
app.include_router(route_auth.router)
app.include_router(route_creditos.router)
app.include_router(route_cuentas.router)
app.include_router(route_operaciones.router)

@app.get("/")
def read_root():
    return {"status": "Caja Tacna Backend Running Ready"}