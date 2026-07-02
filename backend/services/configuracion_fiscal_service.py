from config import (
    IVA_TIPOS,
    IVA_POR_DEFECTO,
    IRPF_POR_DEFECTO,
    MEDIOS_PAGO,
    ALERTA_IRPF_PREVISION,
    ALERTA_IVA_PREVISION,
)

def obtener_configuracion_fiscal():
    return {
        "iva_tipos": IVA_TIPOS,
        "iva_por_defecto": IVA_POR_DEFECTO,
        "irpf_por_defecto": IRPF_POR_DEFECTO,
        "medios_pago": MEDIOS_PAGO,
        "alerta_irpf_prevision": ALERTA_IRPF_PREVISION,
        "alerta_iva_prevision": ALERTA_IVA_PREVISION,
    }

def actualizar_configuracion_fiscal(data: dict):
    global IVA_TIPOS, IVA_POR_DEFECTO, IRPF_POR_DEFECTO
    global MEDIOS_PAGO, ALERTA_IRPF_PREVISION, ALERTA_IVA_PREVISION

    IVA_TIPOS = data.get("iva_tipos", IVA_TIPOS)
    IVA_POR_DEFECTO = data.get("iva_por_defecto", IVA_POR_DEFECTO)
    IRPF_POR_DEFECTO = data.get("irpf_por_defecto", IRPF_POR_DEFECTO)
    MEDIOS_PAGO = data.get("medios_pago", MEDIOS_PAGO)
    ALERTA_IRPF_PREVISION = data.get("alerta_irpf_prevision", ALERTA_IRPF_PREVISION)
    ALERTA_IVA_PREVISION = data.get("alerta_iva_prevision", ALERTA_IVA_PREVISION)

    return obtener_configuracion_fiscal()
