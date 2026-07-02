from fpdf import FPDF

def generar_pdf_informe(data: dict):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    pdf.cell(200, 10, txt=f"Informe mensual - {data['periodo']}", ln=True)

    pdf.ln(10)
    pdf.cell(200, 10, txt=f"Ingresos: {data['totales']['ingresos']} €", ln=True)
    pdf.cell(200, 10, txt=f"Gastos: {data['totales']['gastos']} €", ln=True)
    pdf.cell(200, 10, txt=f"Nóminas: {data['totales']['nominas']} €", ln=True)
    pdf.cell(200, 10, txt=f"Beneficio: {data['totales']['beneficio']} €", ln=True)

    return pdf.output(dest="S").encode("latin-1")
