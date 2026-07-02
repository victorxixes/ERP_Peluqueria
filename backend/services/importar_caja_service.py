from typing import Dict, Any
from fastapi import UploadFile
from openpyxl import load_workbook
from io import BytesIO
from sqlalchemy.orm import Session
from models.historico import Ticket, MovimientoCaja


# ---------------------------------------------------------
# LECTURA DEL EXCEL DETALLADO
# ---------------------------------------------------------

def _leer_hoja_principal(excel_file: UploadFile):
    contenido = excel_file.file.read()
    wb = load_workbook(BytesIO(contenido), data_only=True)
    ws = wb[wb.sheetnames[0]]
    return ws


def _mapear_cabeceras(ws) -> Dict[str, int]:
    cabeceras = {}
    for idx, cell in enumerate(ws[1], start=1):
        nombre = str(cell.value).strip() if cell.value is not None else ""
        if nombre:
            cabeceras[nombre] = idx
    return cabeceras


# ---------------------------------------------------------
# IMPORTADOR DETALLADO (GUARDA EN BD)
# ---------------------------------------------------------

def importar_caja_excel(caja_excel: UploadFile, db: Session) -> Dict[str, Any]:
    ws = _leer_hoja_principal(caja_excel)
    cabeceras = _mapear_cabeceras(ws)

    # Columnas necesarias
    col_ticket = cabeceras.get("Ticket")
    col_fecha_venta = cabeceras.get("Fecha venta")
    col_cliente = cabeceras.get("Cliente")
    col_empleado = cabeceras.get("Empleado")
    col_concepto = cabeceras.get("Concepto")
    col_categoria = cabeceras.get("Categoría")
    col_cantidad = cabeceras.get("Cantidad")
    col_subtotal = cabeceras.get("Subtotal")
    col_impuesto = cabeceras.get("Impuesto")
    col_cuota = cabeceras.get("Cuota")
    col_descuento = cabeceras.get("Descuento")
    col_total = cabeceras.get("Total")
    col_forma_pago = cabeceras.get("Forma de pago")

    # Validación mínima
    campos_obligatorios = [
        col_ticket, col_fecha_venta, col_cliente, col_empleado,
        col_concepto, col_categoria, col_cantidad,
        col_subtotal, col_impuesto, col_cuota, col_total
    ]
    if any(c is None for c in campos_obligatorios):
        raise ValueError("El Excel no tiene todas las columnas necesarias para el importador detallado.")

    formas_pago_por_ticket: Dict[str, str] = {}
    tickets_cache: Dict[str, Ticket] = {}
    movimientos_count = 0

    # ---------------------------------------------------------
    # RECORRER TODAS LAS FILAS DEL EXCEL
    # ---------------------------------------------------------

    for row_idx in range(2, ws.max_row + 1):
        ticket_val = ws.cell(row=row_idx, column=col_ticket).value
        concepto = ws.cell(row=row_idx, column=col_concepto).value

        if ticket_val is None and concepto is None:
            continue

        ticket_codigo = str(ticket_val).strip() if ticket_val is not None else ""

        # ---------------------------------------------------------
        # FILA "TOTAL TICKET"
        # ---------------------------------------------------------
        if concepto and str(concepto).strip().upper() == "TOTAL TICKET":
            forma_pago = ws.cell(row=row_idx, column=col_forma_pago).value
            formas_pago_por_ticket[ticket_codigo] = str(forma_pago).strip() if forma_pago else ""

            total_ticket = ws.cell(row=row_idx, column=col_total).value
            fecha_venta = ws.cell(row=row_idx, column=col_fecha_venta).value
            cliente = ws.cell(row=row_idx, column=col_cliente).value
            empleado = ws.cell(row=row_idx, column=col_empleado).value

            # Calcular totales base/iva sumando movimientos ya creados
            movimientos_ticket = db.query(MovimientoCaja).join(Ticket).filter(
                Ticket.ticket_codigo == ticket_codigo
            ).all()

            total_base = sum(m.subtotal or 0 for m in movimientos_ticket)
            total_iva = sum(m.iva_cuota or 0 for m in movimientos_ticket)

            # Buscar si ya existe el ticket
            ticket_obj = db.query(Ticket).filter(Ticket.ticket_codigo == ticket_codigo).first()
            if not ticket_obj:
                ticket_obj = Ticket(
                    ticket_codigo=ticket_codigo,
                    fecha_venta=fecha_venta,
                    cliente=cliente,
                    empleado=empleado,
                    total_base=total_base,
                    total_iva=total_iva,
                    total_ticket=float(total_ticket or 0),
                    forma_pago=formas_pago_por_ticket.get(ticket_codigo, "")
                )
                db.add(ticket_obj)
                tickets_cache[ticket_codigo] = ticket_obj
            else:
                ticket_obj.fecha_venta = fecha_venta
                ticket_obj.cliente = cliente
                ticket_obj.empleado = empleado
                ticket_obj.total_base = total_base
                ticket_obj.total_iva = total_iva
                ticket_obj.total_ticket = float(total_ticket or 0)
                ticket_obj.forma_pago = formas_pago_por_ticket.get(ticket_codigo, "")

            continue

        # ---------------------------------------------------------
        # FILA NORMAL → MOVIMIENTO
        # ---------------------------------------------------------

        fecha_venta = ws.cell(row=row_idx, column=col_fecha_venta).value
        cliente = ws.cell(row=row_idx, column=col_cliente).value
        empleado = ws.cell(row=row_idx, column=col_empleado).value
        categoria = ws.cell(row=row_idx, column=col_categoria).value
        cantidad = ws.cell(row=row_idx, column=col_cantidad).value
        subtotal = ws.cell(row=row_idx, column=col_subtotal).value
        impuesto = ws.cell(row=row_idx, column=col_impuesto).value
        cuota = ws.cell(row=row_idx, column=col_cuota).value
        descuento = ws.cell(row=row_idx, column=col_descuento).value
        total_linea = ws.cell(row=row_idx, column=col_total).value

        # Buscar/crear ticket base
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
            tickets_cache[ticket_codigo] = ticket_obj

        movimiento = MovimientoCaja(
            ticket=ticket_obj,
            fecha_venta=fecha_venta,
            cliente=cliente,
            empleado=empleado,
            concepto=concepto,
            categoria=categoria,
            cantidad=float(cantidad or 0),
            subtotal=float(subtotal or 0),
            iva_porcentaje=str(impuesto or ""),
            iva_cuota=float(cuota or 0),
            descuento=float(descuento or 0),
            total_linea=float(total_linea or 0),
        )

        db.add(movimiento)
        movimientos_count += 1

    db.commit()

    tickets_creados = db.query(Ticket).count()

    return {
        "tickets_creados": tickets_creados,
        "movimientos_historico": movimientos_count,
        "desconocidos": []
    }
