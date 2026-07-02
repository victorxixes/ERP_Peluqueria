import openpyxl
from openpyxl.styles import Font
from fastapi.responses import StreamingResponse
from io import BytesIO


def exportar_excel(datos: list, nombre: str):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Informe"

    if datos:
        # Cabeceras
        headers = list(datos[0].keys())
        ws.append(headers)

        for cell in ws[1]:
            cell.font = Font(bold=True)

        # Filas
        for fila in datos:
            ws.append(list(fila.values()))

    stream = BytesIO()
    wb.save(stream)
    stream.seek(0)

    return StreamingResponse(
        stream,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f"attachment; filename={nombre}.xlsx"}
    )
