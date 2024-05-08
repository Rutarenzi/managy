import { StockReportData } from '@/@types/reports';
import React, { SetStateAction, useRef } from 'react';
import data from './data.json';
import { XMarkIcon } from '@heroicons/react/24/outline';

type Props = {
  tableData: StockReportData[];
  tableRef: React.RefObject<HTMLTableElement>;
  isFullScreen: boolean;
  setFullScreen: React.Dispatch<SetStateAction<boolean>>;
};
const HtmlTable = ({ tableData, tableRef, isFullScreen, setFullScreen }: Props) => {
  const Th = (
    props: React.DetailedHTMLProps<
      React.ThHTMLAttributes<HTMLTableCellElement>,
      HTMLTableCellElement
    >,
  ) => (
    <td {...props} className={props.className + ' border-2 p-2 font-[700] border-sky-400'}>
      {props.children}
    </td>
  );
  const Td = (
    props: React.DetailedHTMLProps<
      React.TdHTMLAttributes<HTMLTableCellElement>,
      HTMLTableCellElement
    >,
  ) => (
    <td {...props} className={props.className + ' border-2 p-2 border-sky-400'}>
      {props.children}
    </td>
  );
  const Tr = (
    props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>,
  ) => (
    <tr {...props} className={props.className + ' border-2 p-2 border-sky-400'}>
      {props.children}
    </tr>
  );

  return (
    <div
      className={`w-full ${
        isFullScreen ? ' fixed top-0 z-[999] right-0 bottom-0 left-0 py-7' : ''
      } flex-col flex py-4 bg-white overflow-x-auto`}
    >
      {isFullScreen && (
        <XMarkIcon
          onClick={() => setFullScreen(false)}
          className=" absolute cursor-pointer right-2 top-1 w-6"
        />
      )}
      <table id="stock-report-table" ref={tableRef} className=" bg-white border-2 min-w-[1300px]">
        {tableData.map((d, i) => (
          <tbody key={i}>
            <Tr>
              <Th colSpan={4}>{d.category}</Th>
              <Th className=" bg-sky-300" colSpan={11}></Th>
            </Tr>
            <Tr>
              <Th>Item</Th>
              <Th>code</Th>
              <Th>UoM</Th>
              <Th colSpan={3}>Opening Stock</Th>
              <Th colSpan={3}>received</Th>
              <Th colSpan={3}>Issued</Th>
              <Th colSpan={3}>Closing Stock</Th>
            </Tr>
            <Tr>
              <Th colSpan={3}></Th>
              {/* opening stock */}
              <Th>Quantity</Th>
              <Th>Unit Price</Th>
              <Th>Value</Th>
              {/* Received */}
              <Th>Quantity</Th>
              <Th>Unit Price</Th>
              <Th>Value</Th>
              {/* Issued */}
              <Th>Quantity</Th>
              <Th>Unit Price</Th>
              <Th>Value</Th>
              {/* close stock */}
              <Th>Quantity</Th>
              <Th>Unit Price</Th>
              <Th>Value</Th>
            </Tr>
            {d.items.map((it, i) => (
              <Tr key={i}>
                <Td>{it.name}</Td>
                <Td>{it.code ?? Math.floor(Math.random() * 1000)}</Td>
                <Td>{it.unitOfMeasurement.name}</Td>
                <Td>{it.opening.qty}</Td>
                <Td>{it.opening.unitPrice}</Td>
                <Td>{it.opening.value}</Td>
                <Td>{it.received.qty}</Td>
                <Td>{it.received.unitPrice}</Td>
                <Td>{it.received.value}</Td>
                <Td>{it.issued.qty}</Td>
                <Td>{it.issued.unitPrice}</Td>
                <Td>{it.issued.value}</Td>
                <Td>{it.closing.qty}</Td>
                <Td>{it.closing.unitPrice}</Td>
                <Td>{it.closing.value}</Td>
              </Tr>
            ))}
            <Tr>
              <Td colSpan={3}></Td>
              <Td colSpan={3}>Total: {d.openingTotal}</Td>
              <Td colSpan={3}>Total: {d.receivedTotal}</Td>
              <Td colSpan={3}>Total: {d.issuedTotal}</Td>
              <Td colSpan={3}>Total: {d.closingTotal}</Td>
            </Tr>
          </tbody>
        ))}
        {/* <tfoot> */}
        <Tr>
          <Td colSpan={3} className=" font-bold">
            Grand Total:
          </Td>
          <Td colSpan={3} className=" font-bold">
            {tableData.reduce((a, b) => a + b.openingTotal, 0)}
          </Td>
          <Td colSpan={3} className=" font-bold">
            {tableData.reduce((a, b) => a + b.receivedTotal, 0)}
          </Td>
          <Td colSpan={3} className=" font-bold">
            {tableData.reduce((a, b) => a + b.issuedTotal, 0)}
          </Td>
          <Td colSpan={3} className=" font-bold">
            {tableData.reduce((a, b) => a + b.closingTotal, 0)}
          </Td>
        </Tr>
        {/* </tfoot> */}
      </table>
    </div>
  );
};

export default HtmlTable;
