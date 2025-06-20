import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function usePdfExport() {
  function createPDF(title: string, bodyData: any[], columns: string[]) {
    const doc = new jsPDF()

    doc.setFontSize(16)
    doc.text(title, 14, 15)

    autoTable(doc, {
      startY: 20,
      head: [columns],
      body: bodyData,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    })

    doc.save(`${title.toLowerCase().replace(/\s/g, '_')}.pdf`)
  }

  return { createPDF }
}
