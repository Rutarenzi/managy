import { removeProps } from '@/utils/funcs';
import { exportExcel, exportPdf } from '@/utils/funcs/excelpdf';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react';

type Props = {
  columns: GridColDef[];
  data: any[];
  fileName: string;
  pdfFunc?: Function;
  excelFunc?: Function;
  ExcelElement?: React.ReactNode;
};

const Exporter = ({ columns, data, fileName, pdfFunc, excelFunc, ExcelElement }: Props) => {
  const newData = data.map((item) => removeProps(item, ['__v', '_id']));

  const handleExcel = () => {
    if (excelFunc) {
      excelFunc();
    } else {
      exportExcel(columns, newData, fileName);
    }
  };

  const handlePdf = () => {
    if (pdfFunc) {
      pdfFunc();
    } else {
      exportPdf(columns, newData, fileName);
    }
  };
  return (
    <div className="flex items-center xs:w-fit w-full xs:flex-row flex-col gap-4">
      {ExcelElement ? (
        ExcelElement
      ) : (
        <button
          className={`flex justify-center xs:w-fit w-full items-center gap-x-2 bg-white text-green-500 hover:bg-green-500 hover:text-white duration-150
         px-4 py-[0.3em] pb-2 rounded-lg font-medium border-2 border-green-500`}
          onClick={handleExcel}
        >
          Export as excel
          <ChevronDoubleRightIcon className="w-4 h-4" />
        </button>
      )}
      <button
        className={`flex justify-center xs:w-fit w-full items-center gap-x-2 bg-white hover:bg-red-500 hover:text-white duration-150 text-red-500 px-4 py-[0.3em] pb-2 rounded-lg font-medium border-2 border-red-500`}
        onClick={handlePdf}
      >
        Export as PDF
        <ChevronDoubleRightIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Exporter;
