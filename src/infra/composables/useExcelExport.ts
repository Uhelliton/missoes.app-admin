// composables/useExcelExport.ts
import * as XLSX from 'xlsx'

export function useExcelExport() {
  function createExcel(title: string, bodyData: any[]) {
    const worksheet = XLSX.utils.json_to_sheet(bodyData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    const fileName = `${title.toLowerCase().replace(/\s/g, '_')}.xlsx`
    XLSX.writeFile(workbook, fileName)
  }

  return { createExcel }
}
