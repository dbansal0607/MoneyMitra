import sys
import os

try:
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import letter
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "reportlab"])
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import letter

def create_sample_pdf(filename):
    c = canvas.Canvas(filename, pagesize=letter)
    width, height = letter
    
    textobject = c.beginText()
    textobject.setTextOrigin(50, height - 50)
    textobject.setFont("Helvetica", 10)
    
    lines = [
        "CONSOLIDATED ACCOUNT STATEMENT",
        "Generated on: 25-Mar-2026",
        "",
        "Folio No: 987654321",
        "AMC Name: Axis Mutual Fund",
        "Scheme : Axis Bluechip Fund - Direct Plan Growth",
        "Date        Description           Amount      NAV       Units     Balance",
        "10-Jan-2023 SIP Installment       5,000.00    45.1234   110.8071  110.8071",
        "10-Feb-2023 SIP Installment       5,000.00    46.2345   108.1444  218.9515",
        "10-Mar-2023 SIP Installment       5,000.00    44.1122   113.3473  332.2988",
        "",
        "Folio No: 123456789",
        "AMC Name: PPFAS Mutual Fund",
        "Scheme : Parag Parikh Flexi Cap Fund - Direct Plan Growth",
        "Date        Description           Amount      NAV       Units     Balance",
        "15-Jan-2023 SIP Installment       10,000.00   55.4321   180.4009  180.4009",
        "15-Feb-2023 SIP Installment       10,000.00   56.5432   176.8559  357.2568",
        "15-Mar-2023 SIP Installment       10,000.00   54.3210   184.0909  541.3477",
        "",
        "Folio No: 555666777",
        "AMC Name: Nippon India Mutual Fund",
        "Scheme : Nippon India Small Cap Fund - Direct Plan Growth Option",
        "Date        Description           Amount      NAV       Units     Balance",
        "01-Jan-2023 Lumpsum Purchase      50,000.00   100.0000  500.0000  500.0000",
        "01-Feb-2024 SIP Installment       5,000.00    150.0000  33.3333   533.3333",
    ]
    
    for line in lines:
        textobject.textLine(line)
        
    c.drawText(textobject)
    c.save()
    print(f"Sample PDF successfully created at: {os.path.abspath(filename)}")

if __name__ == "__main__":
    create_sample_pdf("MoneyMitra_Sample_CAS.pdf")
