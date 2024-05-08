import { ThemeProvider } from '@emotion/react';
import { useEffect, useState } from 'react';
import { muiTheme } from '../_app';
import { Box, Button, Flex, Input, useToast } from '@chakra-ui/react';
import { AuthApi } from '@/utils/axios.config';
import { Axios, AxiosError } from 'axios';
import { DataGrid, GridCellParams, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Exporter from '@/components/constants/Exporter';
import { camelToNormal, isIsoDate } from '@/utils/funcs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface AssetReportInt {
  assets: {
    acquisitionValue: number;
    depreciationRate: number;
    netBookValue: number;
    residualValue?: number;
    reEvaluationValue?: number;
  }[];
  _id: string;
  totals: {
    [key in totalKeys]: number;
  };
}

type totalKeys = 'acquisitionValue' | 'depreciationRate' | 'netBookValue';
// | 'residualValue'
// | 'reEvaluationValue'

const assetReportRoute = '/reports/asset';
const fieldsToExempt = [
  '_id',
  'department',
  'functionalLocation',
  'description',
  'serviceStatus',
  'brand',
  'model',
  'creator',
  'updatedAt',
  'createdAt',
  '__v',
];

const fieldsToShow = [
  'assetItem',
  'assetCode',
  'acquisitionYear',
  'assetCondition',
  'acquisitionValue',
  'depreciationRate',
  'netBookValue',
  // 'priorYearDepreciation',
  // 'thisYearDepreciation',
];

const AssetReport = () => {
  const [tableData, setTableData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | string | null>(null);
  const [endDate, setEndDate] = useState<Date | string | null>(null);
  const toast = useToast();

  useEffect(() => {}, []);

  const getTableData = async () => {
    setLoading(true);

    const begin = new Date(startDate!).toISOString().split('T')[0];
    const end = new Date(endDate!).toISOString().split('T')[0];
    try {
      const { data } = await AuthApi(`${assetReportRoute}/${begin}/${end}`);
      console.log(data.data);
      setTableData(data.data);
    } catch (err: AxiosError | unknown) {
      toast({
        title: 'Error',
        description:
          ((err as AxiosError).response?.data as { message: string }).message ??
          'Something went wrong. Please Try Again',
        status: 'error',
      });
    }
    setLoading(false);
  };
  const tableRows = tableData
    .map((dept: AssetReportInt, i: number) => [
      { _id: dept._id },
      fieldsToShow.reduce((prev, cur) => ({ ...prev, [cur]: cur }), {
        isHeader: true,
      }),
      ...dept.assets,
      {
        _id: 'TOTAL',
        totals: true,
        ...dept.assets.reduce(
          (prev, cur) => ({
            acquisitionValue: cur.acquisitionValue + prev.acquisitionValue,
            depreciationRate: cur.depreciationRate + prev.depreciationRate,
            netBookValue: cur.netBookValue + prev.netBookValue,
            // residualValue: cur.residualValue + prev.residualValue,
            // reEvaluationValue: cur.reEvaluationValue + prev.reEvaluationValue,
          }),
          {
            acquisitionValue: 0,
            depreciationRate: 0,
            netBookValue: 0,
            // residualValue: 0,
            // reEvaluationValue: 0,
          },
        ),
      },
    ])
    .reduce((acc: [], val: []) => [...acc, ...val], [])
    .map((el: any, i: number) => ({ ...el, id: i }));

  const tableColumns: GridColDef[] | {} = !tableData[0]
    ? {}
    : fieldsToShow.map(
        (el: string): GridColDef => ({
          field: el,
          headerName: el,
          minWidth: 200,
          flex: 1,
          renderCell: (params: GridCellParams) => {
            if (Object.keys(params.row).length === 2)
              return (
                <span className="font-bold uppercase text-2xl">
                  {params.formattedValue?.toString()}
                </span>
              );
            if (params.row.isHeader || params.row.totals)
              return <span className="font-bold">{params.formattedValue?.toString()}</span>;

            return <span>{params.formattedValue?.toString()}</span>;
          },
          colSpan: (params: GridCellParams) => {
            if (Object.keys(params.row).length === 2) return fieldsToShow.length;
            // if (params.row.totals) return Object.keys(tableData[0]?.assets[0]).length - 5;
            return 1;
          },
        }),
      );

  const grandTotal: { [key in totalKeys]?: number } = {};
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
    doc.text('Invictus RMF Asset Report', pageWidth / 2, 60, { align: 'center' });
    doc.setFontSize(10);
    doc.text(
      `From ${new Date(startDate!)
        .toISOString()
        .replace(/(\d{4})-(\d{2})-(\d{2})(.*)/g, '$3/$2/$1')} to ${new Date(endDate!)
        .toISOString()
        .replace(/(\d{4})-(\d{2})-(\d{2})(.*)/g, '$3/$2/$1')}`,
      pageWidth / 2,
      70,
      {
        align: 'center',
      },
    );
    doc.setFontSize(13);
    doc.setTextColor(100);
    autoTable(doc, { html: '#assetReportForm', theme: 'grid', useCss: true, startY: 80 });
    doc.save('table.pdf');
  }
  function exportTableToExcel(tableID: string, filename = '') {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect!.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement('a');

    document.body.appendChild(downloadLink);

    if ((navigator as any).msSaveOrOpenBlob) {
      var blob = new Blob(['\ufeff', tableHTML], {
        type: dataType,
      });
      (navigator as any).msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }
  }
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-3">Asset Report</h1>
      <Flex gap={4} alignItems={'flex-end'}>
        <Flex flexDirection={'column'} gap={0}>
          <span className="font-bold">From: </span>
          <Input
            type="date"
            onChange={(e) => {
              console.log(e.target.value);
              setStartDate(e.target.value);
            }}
          />
        </Flex>
        <Flex flexDirection={'column'} gap={0}>
          <span className="font-bold">To: </span>
          <Input
            type="date"
            onChange={(e) => {
              console.log(e.target.value);
              setEndDate(e.target.value);
            }}
          />
        </Flex>
        <Button
          className="bg-primary-50 hover:bg-primary-100 text-white flex items-center gap-2"
          onClick={!startDate || !endDate ? () => {} : getTableData}
        >
          <span>GENERATE</span>
          {loading && <ArrowPathIcon className="w-5 h-5 animate-spin" />}
        </Button>
      </Flex>
      <div className="h-[1px] w-full bg-gray-300 my-6"></div>
      <ThemeProvider theme={muiTheme}>
        <div style={{ minHeight: 400, width: '100%' }}>
          {tableData.length === 0 ? (
            <h1 className="p-4 text-center font-bold">{loading ? 'Loading...' : 'No Data'}</h1>
          ) : (
            <Box className="flex flex-col gap-4">
              <Exporter
                columns={tableColumns as GridColDef[]}
                data={tableRows}
                fileName="assetReport"
                pdfFunc={exportPDF}
                excelFunc={() => exportTableToExcel('assetReportForm')}
              />
              {/* <DataGrid
                slots={{
                  columnHeaders: () => null,
                }}
                //   rows={tableData[0].assets.map((el: any, i: number) => ({ ...el, id: i }))}
                rows={tableRows}
                columns={tableColumns as GridColDef[]}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 100 },
                  },
                }}
                sx={{ zIndex: 1 }}
                pageSizeOptions={[5, 10, 20, 50, 100]}
                // checkboxSelection
                hideFooterSelectedRowCount
                getRowClassName={(params: GridRowParams) => {
                  return params.row.totals ? 'font-bold bg-gray-200' : '';
                }}
              /> */}
              <div className="max-w-full overflow-x-auto p-2 border border-gray-200 rounded">
                <table
                  className="assetReportTable bg-white border-2  overflow-hidden rounded  w-full"
                  id="assetReportForm"
                >
                  {tableData.map((dept: AssetReportInt, i: number) => {
                    dept.totals = dept.assets.reduce(
                      (prev, cur) => ({
                        acquisitionValue: cur.acquisitionValue + prev.acquisitionValue,
                        depreciationRate: cur.depreciationRate + prev.depreciationRate,
                        netBookValue: cur.netBookValue + prev.netBookValue,
                        // residualValue: cur.residualValue + prev.residualValue,
                        // reEvaluationValue: cur.reEvaluationValue + prev.reEvaluationValue,
                      }),
                      {
                        acquisitionValue: 0,
                        depreciationRate: 0,
                        netBookValue: 0,
                        // residualValue: 0,
                        // reEvaluationValue: 0,
                      },
                    );
                    // add this department's totals to the grand total
                    Object.keys(dept.totals).forEach((key) => {
                      if (grandTotal[key as totalKeys])
                        grandTotal[key as totalKeys]! += dept.totals![key as totalKeys]!;
                      else grandTotal[key as totalKeys] = dept.totals![key as totalKeys]!;
                    });
                    return (
                      <tbody key={`tableData-${i}`}>
                        <tr>
                          <th
                            colSpan={fieldsToShow.length}
                            className="font-bold text-start pt-4 bg-primary text-white"
                          >
                            <h1 className="font-bold text-2xl uppercase">
                              {dept._id.toUpperCase()}
                            </h1>
                          </th>
                        </tr>
                        <tr>
                          {fieldsToShow.map((el: string, i: number) => (
                            <th key={`tableData-${i}`} className="font-bold">
                              {camelToNormal(el)}
                            </th>
                          ))}
                        </tr>
                        {dept.assets.map((asset: any, i: number) => {
                          return (
                            <tr key={`tableData-${i}`}>
                              {fieldsToShow.map((el: string, i: number) => {
                                let toDisplay = asset[el];
                                if (isIsoDate(toDisplay))
                                  toDisplay = new Date(toDisplay).toISOString().split('T')[0];
                                return <td key={`tableData-${i}`}>{toDisplay}</td>;
                              })}
                            </tr>
                          );
                        })}
                        <tr className="bg-gray-100">
                          <th
                            colSpan={fieldsToShow.length - 0 - 3}
                            className="font-bold uppercase text-start"
                          >
                            TOTAL
                          </th>
                          {(Object.keys(dept.totals) as totalKeys[]).map(
                            (el: totalKeys, i: number) => (
                              <td key={`tableData-${i}`}>{dept.totals[el]}</td>
                            ),
                          )}
                          {/* <td></td> */}
                        </tr>
                        <tr></tr>
                      </tbody>
                    );
                  })}
                  <tfoot>
                    <tr>
                      <th colSpan={fieldsToShow.length - 0 - 3} className="font-bold text-start">
                        GRAND TOTAL
                      </th>
                      {(Object.keys(grandTotal) as totalKeys[]).map((el: totalKeys, i: number) => (
                        <td key={`tableData-${i}`}>{grandTotal[el]}</td>
                      ))}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </Box>
          )}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default AssetReport;
