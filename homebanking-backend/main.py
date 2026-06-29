from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import route_auth, route_creditos, route_cuentas, route_operaciones

app = FastAPI(
    title="API Homebanking - Caja Tacna",
    description="Core backend con controles de ciberseguridad perimetral.",
    version="1.0.0"
)

# 🛡️ MITIGACIÓN CONFIGURACIÓN INSEGURA: URLs permitidas para producción y entorno local
# Modifica la lista agregando la nueva URL que sale en tu captura:
origins = [
    "https://caja-tacna-bmpl-elm3tc9c5-daaam.vercel.app",  # URL anterior
    "https://caja-tacna-bmpl-9xtkjhz40-daaam.vercel.app",  # <-- AGREGA ESTA (La de tu captura actual)
    "http://localhost:5173",
    "http://localhost:5175",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # <-- Usamos la lista de servidores autorizados
    allow_credentials=True,      # <-- Ahora sí funcionará con seguridad
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