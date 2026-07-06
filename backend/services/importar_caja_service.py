from typing import Dict, Any
from fastapi import UploadFile
from openpyxl import load_workbook
from io import BytesIO
from sqlalchemy.orm import Session
from datetime import datetime
from models.historico import Ticket, MovimientoCaja


# ---------------------------------------------------------
# UTILIDADES
# ---------------------------------------------------------

def _normalize(s: str) -> str:
    """Normaliza cabeceras: minúsculas, sin tildes, sin espacios."""
    if not s:
        return ""
    s = s.strip().lower()
    s = s.replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u")
    return s


def _to_float(v):
    if v is None:
        return 0.0
    if isinstance(v, str):
        v = v.replace(",", ".").strip()
    try:
        return float(v)
    except:
        return 0.0


def _to_date(v):
    if isinstance(v, datetime):
        return v
    if isinstance(v, float):  # número de serie Excel
        return datetime.fromordinal(datetime(1900, 1, 1).toordinal() + int(v) - 2)
    return None


# ---------------------------------------------------------
# LECTURA DEL EXCEL
# ---------------------------------------------------------

def _leer_hoja_principal(excel_file: UploadFile):
    contenido = excel_file.file.read()
    excel_file.file.seek(0)
    wb = load_workbook(BytesIO(contenido), data_only=True)
    ws = wb[wb.sheetnames[0]]
    return ws


def _mapear_cabeceras(ws) -> Dict[str, int]:
    cabeceras = {}
    for idx, cell in enumerate(ws[1], start=1):
        nombre = _normalize(str(cell.value)) if cell.value else ""
        if nombre:
            cabeceras[nombre] = idx
    return cabeceras


# ---------------------------------------------------------
# IMPORTADOR DETALLADO
# ---------------------------------------------------------

def importar_caja_excel(caja_excel: UploadFile, db: Session) -> Dict[str, Any]:
    try:
        ws = _leer_hoja_principal(caja_excel)
        cabeceras = _mapear_cabeceras(ws)

        print("CABECERAS DETECTADAS:", cabeceras)

        # Columnas necesarias según tu Excel REAL
        required = [
            "ticket",
            "fecha venta",
            "cliente",
            "empleado",
            "concepto",
            "categoria",
            "cantidad",
            "subtotal",
            "impuesto",
            "cuota",
            "descuento",
            "total",
            "forma de pago"
        ]

        missing = [col for col in required if col not in cabeceras]
        if missing:
            return {
                "error": "Faltan columnas en el Excel",
                "faltan": missing,
                "cabeceras_detectadas": list(cabeceras.keys())
            }

        # Asignación de columnas
        col = {c: cabeceras[c] for c in required}

        tickets_cache: Dict[str, Ticket] = {}
        movimientos_count = 0

        # ---------------------------------------------------------
        # RECORRER TODAS LAS FILAS
        # ---------------------------------------------------------

        for row_idx in range(2, ws.max_row + 1):
            ticket_val = ws.cell(row=row_idx, column=col["ticket"]).value
            concepto = ws.cell(row=row_idx, column=col["concepto"]).value

            if ticket_val is None and concepto is None:
                continue

            ticket_codigo = str(ticket_val).strip() if ticket_val else ""

            # ---------------------------------------------------------
            # TOTAL TICKET
            # ---------------------------------------------------------
            if concepto and _normalize(str(concepto)) == "total ticket":
                forma_pago = ws.cell(row=row_idx, column=col["forma de pago"]).value
                total_ticket = _to_float(ws.cell(row=row_idx, column=col["total"]).value)
                fecha_venta = _to_date(ws.cell(row=row_idx, column=col["fecha venta"]).value)
                cliente = ws.cell(row=row_idx, column=col["cliente"]).value
                empleado = ws.cell(row=row_idx, column=col["empleado"]).value

                movimientos_ticket = db.query(MovimientoCaja).join(Ticket).filter(
                    Ticket.ticket_codigo == ticket_codigo
                ).all()

                total_base = sum(m.subtotal or 0 for m in movimientos_ticket)
                total_iva = sum(m.iva_cuota or 0 for m in movimientos_ticket)

                ticket_obj = db.query(Ticket).filter(Ticket.ticket_codigo == ticket_codigo).first()
                if not ticket_obj:
                    ticket_obj = Ticket(
                        ticket_codigo=ticket_codigo,
                        fecha_venta=fecha_venta,
                        cliente=cliente,
                        empleado=empleado,
                        total_base=total_base,
                        total_iva=total_iva,
                        total_ticket=total_ticket,
                        forma_pago=str(forma_pago or "")
                    )
                    db.add(ticket_obj)
                else:
                    ticket_obj.fecha_venta = fecha_venta
                    ticket_obj.cliente = cliente
                    ticket_obj.empleado = empleado
                    ticket_obj.total_base = total_base
                    ticket_obj.total_iva = total_iva
                    ticket_obj.total_ticket = total_ticket
                    ticket_obj.forma_pago = str(forma_pago or "")

                db.commit()
                tickets_cache[ticket_codigo] = ticket_obj
                continue

            # ---------------------------------------------------------
            # MOVIMIENTO NORMAL
            # ---------------------------------------------------------

            fecha_venta = _to_date(ws.cell(row=row_idx, column=col["fecha venta"]).value)
            cliente = ws.cell(row=row_idx, column=col["cliente"]).value
            empleado = ws.cell(row=row_idx, column=col["empleado"]).value
            categoria = ws.cell(row=row_idx, column=col["categoria"]).value
            cantidad = _to_float(ws.cell(row=row_idx, column=col["cantidad"]).value)
            subtotal = _to_float(ws.cell(row=row_idx, column=col["subtotal"]).value)
            impuesto = ws.cell(row=row_idx, column=col["impuesto"]).value
            cuota = _to_float(ws.cell(row=row_idx, column=col["cuota"]).value)
            descuento = _to_float(ws.cell(row=row_idx, column=col["descuento"]).value)
            total_linea = _to_float(ws.cell(row=row_idx, column=col["total"]).value)

            ticket_obj = tickets_cache.get(ticket_codigo)
            if not ticket_obj:
                ticket_obj = db.query(Ticket).filter(Ticket.ticket_codigo == ticket_codigo).first()
                if not ticket_obj:
                    ticket_obj = Ticket(
                        ticket_codigo=ticket_codigo,
                        fecha_venta=fecha_venta,
                        cliente=cliente,
                        empleado=empleado,
                        total_base=0.0,
                        total_iva=0.0,
                        total_ticket=0.0,
                        forma_pago=""
                    )
                    db.add(ticket_obj)
                    db.commit()
                tickets_cache[ticket_codigo] = ticket_obj

            movimiento = MovimientoCaja(
                ticket=ticket_obj,
                fecha_venta=fecha_venta,
                cliente=cliente,
                empleado=empleado,
                concepto=concepto,
                categoria=categoria,
                cantidad=cantidad,
                subtotal=subtotal,
                iva_porcentaje=str(impuesto or ""),
                iva_cuota=cuota,
                descuento=descuento,
                total_linea=total_linea,
            )

            db.add(movimiento)
            movimientos_count += 1

        db.commit()

        return {
            "tickets_creados": len(tickets_cache),
            "movimientos_historico": movimientos_count,
            "desconocidos": []
        }

    except Exception as e:
        return {
            "error": "Excepción interna en el importador",
            "detalle": str(e)
        }
