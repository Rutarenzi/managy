import { AuthApi } from '@/utils/axios.config';
import { Button } from '@chakra-ui/react';
import moment, { Moment } from 'moment';
import { Input } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Page } from '@/@types';
import { StockReportData } from '@/@types/reports';
import { makeColsFromObject } from '@/utils/funcs';
import Exporter from '@/components/constants/Exporter';
import HtmlTable from '@/components/documents/HtmlTable';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { exportReportExcel } from '@/utils/funcs/excelpdf';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';

const StockReports: Page = () => {
  const [startDate, setStartDate] = useState<Moment>(moment());
  const [endDate, setEndDate] = useState<Moment>(moment());
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [tableData, setTableData] = useState<StockReportData[]>([]);
  const tableRef = useRef<HTMLTableElement>(null);
  const [isFullScreen, setFullScreen] = useState(false);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(moment(e.target.value));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(moment(e.target.value));
  };

  // get report on backend route /stock/:startDate/:endDate
  const getReport = async () => {
    setLoading(true);
    try {
      const res = await AuthApi.get(
        `/reports/stock/${startDate.format('YYYY-MM-DD')}/${endDate.format('YYYY-MM-DD')}`,
      );
      console.table(res.data.data);
      setTableData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const newData = tableData.map((da) => {
    return {
      ...da,
      id: Math.random() * 3013010,
      //   items: da.items.length,
    };
  });
  const exportData = newData.map((da) => {
    return {
      ...da,
      items: da.items.map((item) => item.name).join(', '),
    };
  });

  const itemsCol: GridColDef = {
    field: 'items',
    headerName: 'Items',
    width: 150,
    editable: false,
    sortable: false,
    renderCell: (params: any) => {
      return (
        <div className="flex flex-col gap-y-2">
          {(params.row.items as StockReportData['items']).map((item) => (
            <div key={item._id} className="flex gap-x-2">
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      );
    },
  };

  // view table fullscreen using document api
  const viewTableFullScreen = () => {
    // const table = tableRef.current;
    // if (table) {
    //   const fullscreen = table.requestFullscreen || (table as any).webkitRequestFullscreen;
    //   if (fullscreen) {
    //     fullscreen.call(table);
    //   }
    // }
    setFullScreen(true);
  };

  function exportPDF() {
    const doc = new jsPDF({
      orientation: 'landscape',
    });
    // Add image at center
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.addImage('/logo.png', 'PNG', pageWidth / 2 - 20, 10, 40, 40);
    // add text below image
    doc.setFontSize(20);
    doc.text('Invictus RMF Stock Report', pageWidth / 2, 60, { align: 'center' });
    doc.setFontSize(10);
    doc.text(
      `From ${startDate.format('DD/MM/YYYY')} to ${endDate.format('DD/MM/YYYY')}`,
      pageWidth / 2,
      70,
      {
        align: 'center',
      },
    );

    // add table below text
    doc.setFontSize(11);
    doc.setTextColor(100);
    autoTable(doc, { html: '#stock-report-table', theme: 'grid', useCss: true, startY: 80 });
    doc.save('stock-report.pdf');
  }

  useEffect(() => {
    const cols = makeColsFromObject(tableData[0], ['items']);
    setColumns([...cols, itemsCol]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData]);

  console.log(newData);

  const renderEcelElemet = () => (
    <DownloadTableExcel
      currentTableRef={tableRef.current}
      sheet="StockReport"
      filename={
        'Stock - Report-' + startDate.format('DD/MM/YYYY') + '-' + endDate.format('DD/MM/YYYY')
      }
    >
      <button
        className={`flex justify-center xs:w-fit w-full items-center gap-x-2 bg-white text-green-500 hover:bg-green-500 hover:text-white duration-150
         px-4 py-[0.3em] pb-2 rounded-lg font-medium border-2 border-green-500`}
      >
        Export as excel
        <ChevronDoubleRightIcon className="w-4 h-4" />
      </button>
    </DownloadTableExcel>
  );

  return (
    <div>
      <h1 className=" font-medium text-lg">Stock Reports</h1>
      <div className="flex font-medium w-full flex-col gap-y-5 p-4 rounded-md border-2">
        <h1>Stock Reports generator</h1>
        <div className="flex gap-5">
          <div className="flex flex-col gap-y-4">
            <h1>Select the beginning date</h1>
            <Input
              type="date"
              className=" cursor-pointer"
              onChange={handleStartDateChange}
              placeholder="Select the beginning date"
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <h1>Select the ending date</h1>
            <Input
              type="date"
              className=" cursor-pointer"
              onChange={handleEndDateChange}
              placeholder="Select the beginning date"
            />
          </div>
        </div>
        <Button
          colorScheme="blue"
          onClick={getReport}
          w={'fit-content'}
          className=" bg-secondary-50"
          disabled={loading}
        >
          {loading ? 'Generating Report...' : 'Generate Report'}
        </Button>
        {tableData.length > 0 && (
          <>
            <div className="flex sm:flex-row flex-col w-full items-center gap-4 justify-between">
              <Exporter
                pdfFunc={exportPDF}
                columns={columns}
                data={exportData}
                fileName={
                  'Stock - Report-' +
                  startDate.format('DD/MM/YYYY') +
                  '-' +
                  endDate.format('DD/MM/YYYY')
                }
                excelFunc={() => exportReportExcel(tableData)}
                ExcelElement={React.createElement(renderEcelElemet)}
              />
              <Button colorScheme="blue" className=" bg-secondary-50" onClick={viewTableFullScreen}>
                View Table
              </Button>
            </div>
            <HtmlTable {...{ tableData, tableRef, isFullScreen, setFullScreen }} />
          </>
        )}
      </div>
    </div>
  );
};

StockReports.metadata = {
  title: 'Stock Reports - Invictus RMF',
  description: 'generate stock reports',
};

export default StockReports;
