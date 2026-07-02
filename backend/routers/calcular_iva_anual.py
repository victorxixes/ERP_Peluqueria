from sqlalchemy.orm import Session
from models.iva_resumen import IVAResumen
from config import ALERTA_IVA_PREVISION

def calcular_iva_anual(db: Session, year: int):
    # Obtener los 4 trimestres ya calculados
    trimestres = (
        db.query(IVAResumen)
        .filter(IVAResumen.año == year)
        .order_by(IVAResumen.trimestre.asc())
        .all()
    )

    # Si faltan trimestres, recalcularlos automáticamente
    if len(trimestres) < 4:
        faltantes = {1, 2, 3, 4} - {t.trimestre for t in trimestres}
        from services.iva_service import calcular_iva_trimestre
        for q in faltantes:
            calcular_iva_trimestre(db, year, q)

        # Volver a cargar los trimestres
        trimestres = (
            db.query(IVAResumen)
            .filter(IVAResumen.año == year)
            .order_by(IVAResumen.trimestre.asc())
            .all()
        )

    iva_repercutido_total = sum(t.iva_repercutido_total for t in trimestres)
    iva_soportado_total = sum(t.iva_soportado_total for t in trimestres)
    saldo_anual = iva_repercutido_total - iva_soportado_total

    return {
        "year": year,
        "iva_repercutido_total": iva_repercutido_total,
        "iva_soportado_total": iva_soportado_total,
        "saldo_anual": saldo_anual,
        "trimestres": [
            {
                "trimestre": t.trimestre,
                "base_imponible_total": t.base_imponible_total,
                "iva_repercutido_total": t.iva_repercutido_total,
                "detalle": t.detalle,
            }
            for t in trimestres
        ],
        "alerta": saldo_anual >= ALERTA_IVA_PREVISION,
        "alerta_umbral": ALERTA_IVA_PREVISION,
    }
