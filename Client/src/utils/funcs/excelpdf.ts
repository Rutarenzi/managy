import { StockReportData } from '@/@types/reports';
import { GridColDef } from '@mui/x-data-grid';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import XLSX from 'xlsx';

/**
 *
 * @param columns
 * @param data
 * @param fileName
 * @param title
 */

export const exportPdf = (
  columns: GridColDef[],
  data: object[],
  fileName: string,
  title?: string,
) => {
  const ths = columns.map((col) => col.headerName as string);
  const pdf = new jsPDF({
    orientation: 'landscape',
  });
  pdf.setFontSize(15);
  pdf.text(title ?? fileName, 11, 8);
  pdf.setFontSize(11);
  pdf.setTextColor(100);
  autoTable(pdf, {
    head: [ths],
    body: data.map((item) => Object.values(item)),
    margin: { top: 25 },
    headStyles: {
      fillColor: [41, 128, 185],
      cellWidth: 'auto',
      minCellWidth: 10,
      overflow: 'visible',
    },
  });
  pdf.setProperties({
    title: title ?? fileName,
  });
  pdf.save(`${fileName}.pdf`);
};

/**
 * @description Export excel file
 * @param columns
 * @param data
 * @param fileName
 * @param title
 */
export const exportExcel = (
  columns: GridColDef[],
  data: object[],
  fileName: string,
  title?: string,
) => {
  const ths = columns.map((col) => col.headerName as string);
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.sheet_add_aoa(ws, [ths], { origin: 'A1' });
  XLSX.utils.book_append_sheet(wb, ws, title ?? fileName);
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};

export const exportJsonToExcel = (data: object[], fileName: string) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, fileName);
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};

export const exportReportExcel = (stockDataArray: StockReportData[]) => {
  const worksheet = XLSX.utils.json_to_sheet(
    stockDataArray.flatMap((stockData) =>
      stockData.items.map((item) => ({
        Name: item.name,
        Category: item.stockItemCategory.name,
        UoM: item.unitOfMeasurement.name,
        code: item.code,
        'Opening Qty': item.opening.qty,
        'Opening Unit Price': item.opening.unitPrice,
        'Opening Value': item.opening.value,
        'Received Qty': item.received.qty,
        'Received Unit Price': item.received.unitPrice,
        'Received Value': item.received.value,
        'Issued Qty': item.issued.qty,
        'Issued Unit Price': item.issued.unitPrice,
        'Issued Value': item.issued.value,
        'Closing Qty': item.closing.qty,
        'Closing Unit Price': item.closing.unitPrice,
        'Closing Value': item.closing.value,
      })),
    ),
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Stock Report');
  XLSX.writeFile(workbook, 'stock-report.xlsx');
};
