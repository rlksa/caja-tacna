"""Router de créditos (solicitar). Exige get_cliente."""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.engine import Connection

from app.controllers import ctrl_creditos
from app.core.cfg_auth import get_cliente
from app.core.cfg_database import get_db
from app.schemas.sch_creditos import SolicitudCreditoRequest, SolicitudCreditoResponse

router = APIRouter(prefix="/creditos", tags=["creditos"], dependencies=[Depends(get_cliente)])


@router.post("/solicitar", response_model=SolicitudCreditoResponse)
def solicitar(
    body: SolicitudCreditoRequest,
    conn: Connection = Depends(get_db),
    cliente: dict = Depends(get_cliente),
):
    return ctrl_creditos.solicitar(
        conn,
        cliente["pkcliente"],
        body.montosolicitud,
        body.plazo,
        body.codtipocredito,
        body.codactividadeconomica,
        body.montoingresoneto,
    )


# 🌟 AGREGA ESTE ENDPOINT AQUÍ ABAJO PARA GENERAR LA PROFORMA DIGITAL
@router.get("/proforma")
def obtener_proforma(
    monto: float = Query(..., description="Monto del préstamo solicitado"),
    cuotas: int = Query(..., description="Número de meses de plazo"),
    cliente: dict = Depends(get_cliente),  # Protegido también por seguridad
):
    """Calcula la proforma digital al instante usando la TEM de 3.05%."""
    # 📈 Tasa Efectiva Mensual calculada a partir de la TEA 43.92%
    tem = 0.0305  
    
    # Método Francés (Cuota Fija)
    cuota_mensual = monto * ((tem * (1 + tem)**cuotas) / ((1 + tem)**cuotas - 1))
    
    cronograma = []
    saldo_pendiente = monto

    for i in range(1, cuotas + 1):
        interes_mes = saldo_pendiente * tem
        amortizacion = cuota_mensual - interes_mes
        saldo_pendiente -= amortizacion
        
        cronograma.append({
            "cuota": i,
            "monto_cuota": round(cuota_mensual, 2),
            "interes": round(interes_mes, 2),
            "amortizacion": round(amortizacion, 2),
            "saldo_final": round(max(0, saldo_pendiente), 2)
        })

    return {
        "mensaje": "Proforma digital generada con éxito. Ya no es necesario ir a la agencia.",
        "tea": "43.92%",
        "tem_aplicada": "3.05%",
        "seguro": "Sin seguro de desgravamen",
        "monto": monto,
        "plazo_meses": cuotas,
        "cuota_estimada": round(cuota_mensual, 2),
        "cronograma": cronograma
    }