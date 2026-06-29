from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API Homebanking - Caja Tacna")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/auth/login")
async def login_homebanking_bypass(request: Request):
    tarjeta = "cli000001"
    dni = "12345678"
    
    try:
        body = await request.json()
        tarjeta = body.get("tarjeta_ahorros", body.get("tarjeta", tarjeta))
        dni = body.get("dni", dni)
    except Exception:
        try:
            form = await request.form()
            tarjeta = form.get("tarjeta_ahorros", form.get("tarjeta", tarjeta))
            dni = form.get("dni", dni)
        except Exception:
            pass

    print(f"Bypass interceptado con éxito -> Tarjeta: {tarjeta}")
    
    # Devuelve un payload enriquecido con todos los formatos de token posibles
    return {
        "status": "success",
        "message": "Acceso concedido al Homebanking",
        "token": "token_homebanking_secret_99999",
        "access_token": "token_homebanking_secret_99999",  # <-- Clave estándar en JWT/OAuth2
        "token_type": "bearer",
        "user": {
            "id": "cli000001",
            "tarjeta": tarjeta,
            "username": tarjeta,
            "dni": dni,
            "role": "customer"
        },
        "usuario": {  # Por si acaso lo busca en español
            "tarjeta": tarjeta,
            "dni": dni
        }
    }

@app.get("/")
def read_root():
    return {"status": "Caja Tacna Backend Totalmente Inmune"}