import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { ISummaryEvangelismDaily } from '@/modules/dashboard/types/bi-evangelism.interface'
import { formatDateToPtBr } from '~/infra/utils/helper.ts'
import { slugify } from '~/infra/utils/slugify.ts'
import { teamColors } from '~/infra/utils/colors.ts'

export const useTeamPerformersExportData = (data: Array<ISummaryEvangelismDaily>, team: string, color: string, year: number) => {
  function exportToPDF() {
    const doc = new jsPDF()

    doc.setFontSize(16)
    doc.setTextColor(0, 0, 0)
    doc.text(`Desempenho ${team}`, 14, 20)

    doc.setFontSize(11)
    doc.setTextColor(100, 100, 100)
    doc.text(`Ano: ${year}`, 14, 27)

    const totals = data.reduce(
      (acc, item) => {
        acc.total += Number(item.total) || 0
        acc.courses += Number(item.courses) || 0
        acc.cells += Number(item.cells) || 0
        acc.decision += Number(item.decision) || 0
        return acc
      },
      { total: 0, courses: 0, cells: 0, decision: 0 },
    )

    const teamColor = teamColors[color] || [0, 0, 0];

    autoTable(doc, {
      startY: 34,
      head: [['Data', 'Evangelizados', 'Cursos', 'Células', 'Conversões']],
      body: data.map((item) => [
        formatDateToPtBr(item.date),
        item.total,
        item.courses,
        item.cells,
        item.decision,
      ]),
      foot: [['Total', totals.total, totals.courses, totals.cells, totals.decision]],
      styles: {
        fontSize: 10,
      },
      headStyles: {
        fillColor: teamColor,
        textColor: 255,
      },
      footStyles: {
        fillColor: [240, 240, 240],
        textColor: 20,
        fontStyle: 'bold',
      },
    })

    doc.save(`relatorio-desempenho-equipe-${slugify(team)}-${year}.pdf`)
  }

  return {
    exportToPDF,
  }
}
