"""
Controlador de Créditos para Caja Tacna.
Calcula cronogramas y proformas digitales usando la TEM de 3.05%.
"""
from fastapi import HTTPException, status
from sqlalchemy.engine import Connection
from sqlalchemy import text

def generar_proforma_credito(monto: float, cuotas: int) -> dict:
    # 📈 Tu Tasa Efectiva Mensual (TEM) derivada del 43.92% Anual
    tem = 0.0305  # 3.05%
    
    # Fórmula del método francés (Cuota Fija)
    # Cuota = M * [ (tem * (1+tem)^n) / ((1+tem)^n - 1) ]
    try:
        cuota_mensual = monto * ((tem * (1 + tem)**cuotas) / ((1 + tem)**cuotas - 1))
    except ZeroDivisionError:
        raise HTTPException(status_code=400, detail="Las cuotas deben ser mayores a 0.")

    cronograma = []
    saldo_pendiente = monto

    for i in range(1, cuotas + 1):
        interes_mes = saldo_pendiente * tem
        amortizacion = cuota_mensual - interes_mes
        saldo_pendiente -= amortizacion
        
        cronograma.append({
            "num_cuota": i,
            "cuota_fija": round(cuota_mensual, 2),
            "interes": round(interes_mes, 2),
            "amortizacion": round(amortizacion, 2),
            "saldo_restante": round(max(0, saldo_pendiente), 2)
        })

    return {
        "institucion": "Caja Tacna - Banca Digital",
        "tasa_aplicada": "TEA 43.92% (TEM 3.05%)",
        "seguro_desgravamen": "0.00% (Sin seguro solicitado)",
        "monto_solicitado": round(monto, 2),
        "total_cuotas": cuotas,
        "cuota_mensual_estimada": round(cuota_mensual, 2),
        "cronograma_pagos": cronograma
    }