"""
Script de Automatización Oficial - Caja Tacna Homebanking.
Ingresa secuencialmente los 30 casos exactos del PDF del docente.
Simula el inicio de sesión y el registro de la proforma/solicitud.
"""
import requests
import time

# 🌍 CONFIGURACIÓN: Apuntando al servidor real en Render
BASE_URL = "https://homebanking-backend-q6fe.onrender.com"

# Estructura de datos limpia con los casos extraídos del enunciado del docente
CASOS_REALES = [
    {"id": 1, "monto": 1000, "plazo": 12, "tea": 43.92, "cliente": "Castor Pérez"},
    {"id": 2, "monto": 3000, "plazo": 12, "tea": 40.92, "cliente": "Eneida Mamani"},
    {"id": 3, "monto": 5000, "plazo": 18, "tea": 43.92, "cliente": "Ovidio Torres"},
    {"id": 4, "monto": 8000, "plazo": 6,  "tea": 43.92, "cliente": "Dante Flores"},
    {"id": 5, "monto": 10000, "plazo": 12, "tea": 43.92, "cliente": "Laura Mendoza"},
    {"id": 6, "monto": 12000, "plazo": 24, "tea": 40.92, "cliente": "Boccaccio Vargas"},
    {"id": 7, "monto": 15000, "plazo": 18, "tea": 43.92, "cliente": "Orlando Ríos"},
    {"id": 8, "monto": 18000, "plazo": 24, "tea": 43.92, "cliente": "Gerusalemme Huanca"},
    {"id": 9, "monto": 20000, "plazo": 36, "tea": 43.92, "cliente": "Pedro Calderón"},
    {"id": 10, "monto": 25000, "plazo": 24, "tea": 40.92, "cliente": "Félix Chávez"},
    {"id": 11, "monto": 2000, "plazo": 12, "tea": 43.92, "cliente": "Hildegarda Huanca"},
    {"id": 12, "monto": 4000, "plazo": 18, "tea": 43.92, "cliente": "Stendhal Aguilar"},
    {"id": 13, "monto": 6000, "plazo": 12, "tea": 40.92, "cliente": "Kipling Soto"},
    {"id": 14, "monto": 7500, "plazo": 6,  "tea": 43.92, "cliente": "Erinná Espinoza"},
    {"id": 15, "monto": 9000, "plazo": 24, "tea": 43.92, "cliente": "Annie Espinoza"},
    {"id": 16, "monto": 11000, "plazo": 18, "tea": 40.92, "cliente": "Homero Quispe"},
    {"id": 17, "monto": 13500, "plazo": 12, "tea": 43.92, "cliente": "Virgilio Mamani"},
    {"id": 18, "monto": 16000, "plazo": 36, "tea": 43.92, "cliente": "Ovidio Torres"},
    {"id": 19, "monto": 17000, "plazo": 24, "tea": 40.92, "cliente": "Dante Flores"},
    {"id": 20, "monto": 19000, "plazo": 18, "tea": 43.92, "cliente": "Laura Mendoza"},
    {"id": 21, "monto": 22000, "plazo": 36, "tea": 43.92, "cliente": "Boccaccio Vargas"},
    {"id": 22, "monto": 24000, "plazo": 24, "tea": 40.92, "cliente": "Orlando Ríos"},
    {"id": 23, "monto": 1500, "plazo": 6,  "tea": 43.92, "cliente": "Gerusalemme Huanca"},
    {"id": 24, "monto": 3500, "plazo": 12, "tea": 43.92, "cliente": "Pedro Calderón"},
    {"id": 25, "monto": 5500, "plazo": 18, "tea": 40.92, "cliente": "Félix Chávez"},
    {"id": 26, "monto": 7000, "plazo": 24, "tea": 43.92, "cliente": "Hildegarda Huanca"},
    {"id": 27, "monto": 8500, "plazo": 12, "tea": 43.92, "cliente": "Stendhal Aguilar"},
    {"id": 28, "monto": 10500, "plazo": 36, "tea": 40.92, "cliente": "Kipling Soto"},
    {"id": 29, "monto": 14000, "plazo": 18, "tea": 43.92, "cliente": "Erinná Espinoza"},
    {"id": 30, "monto": 30000, "plazo": 24, "tea": 43.92, "cliente": "Annie Espinoza"}
]

print("=" * 70)
print("🤖 CAJA TACNA - PROCESADOR AUTOMÁTICO DE LOS 30 CASOS EN PRODUCCIÓN")
print("=" * 70)

for caso in CASOS_REALES:
    idx = caso["id"]
    username = f"cli{str(idx).zfill(6)}"
    
    print(f"\n🚀 [CASO {idx}] Cliente: {caso['cliente']} ({username})")
    
    # 🔑 CORREGIDO: Formato x-www-form-urlencoded requerido por FastAPI OAuth2
    payload_login = {
        "username": username,
        "password": "demo1234"
    }
    
    try:
        # Usamos data= para enviar como Form Data en vez de json=
        res_login = requests.post(f"{BASE_URL}/auth/login", data=payload_login)
        
        if res_login.status_code == 200:
            token = res_login.json()["access_token"]
            headers = {"Authorization": f"Bearer {token}"}
            print("  🔑 Autenticación: Exitosa (JWT Generado)")
            
            # 2. Invocación de la proforma digital usando la ruta remota
            monto = caso["monto"]
            plazo = caso["plazo"]
            
            url_proforma = f"{BASE_URL}/creditos/proforma?monto={monto}&cuotas={plazo}"
            res_proforma = requests.get(url_proforma, headers=headers)
            
            if res_proforma.status_code == 200:
                data_p = res_proforma.json()
                print(f"  📊 Simulación: S/. {monto} | {plazo} meses | TEA {caso['tea']}%")
                print(f"  💵 Cuota Estimada del Sistema: S/. {data_p['cuota_estimada']}")
            else:
                print(f"  ❌ Simulación: Error al calcular la proforma (Status: {res_proforma.status_code}).")
                
        else:
            print(f"  ❌ Autenticación: Falló con código {res_login.status_code}")
            print(f"     Detalle: {res_login.text}")
            
    except requests.exceptions.ConnectionError:
        print("🚨 CRÍTICO: No se pudo conectar con el servidor en Render. Revisa tu conexión a internet o el estado del servicio.")
        break
        
    # Un pequeño delay de 200ms para no saturar la API gratuita de Render
    time.sleep(0.2)

print("\n" + "=" * 70)
print("🏁 PROCESO COMPLETADO: Los 30 casos han sido procesados en la nube.")
print("=" * 70)