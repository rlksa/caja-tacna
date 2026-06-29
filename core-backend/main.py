from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API Core Backend - Caja Tacna")

# 🛡️ CORS TOTALMENTE ABIERTO: Permite que cualquier URL de Vercel se conecte
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ⚡ BYPASS PARA INICIO DE SESIÓN DEL PERSONAL
@app.post("/auth/login")
async def core_login_bypass(request: Request):
    dni = "1111111"
    try:
        body = await request.json()
        dni = body.get("dni", body.get("username", dni))
    except Exception:
        try:
            form = await request.form()
            dni = form.get("dni", form.get("username", dni))
        except Exception:
            pass

    print(f"Bypass Core Activado -> DNI Personal: {dni}")

    return {
        "status": "success",
        "message": "Acceso concedido al Core",
        "access_token": "token_core_secret_88888",
        "token_type": "bearer",
        "user": {
            "id": "pers001",
            "dni": dni,
            "username": dni,
            "role": "admin"
        }
    }

@app.get("/")
def read_root():
    return {"status": "Core Backend Running — Bypass Activo"}