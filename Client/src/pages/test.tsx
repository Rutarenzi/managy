import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { autoTable } from 'jspdf-autotable';

const Table = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Row 1, Column 1</td>
          <td>Row 1, Column 2</td>
          <td>Row 1, Column 3</td>
        </tr>
        <tr>
          <td>Row 2, Column 1</td>
          <td>Row 2, Column 2</td>
          <td>Row 2, Column 3</td>
        </tr>
      </tbody>
    </table>
  );
};

const PDFExporter = () => {
  const handleExportPDF = () => {
    const doc: jsPDF & { autoTable: autoTable } = new jsPDF() as any;

    // Set the document title
    doc.setProperties({
      title: 'Table export',
    });

    // Add the table to the document
    doc.autoTable({
      head: [['Header 1', 'Header 2', 'Header 3']],
      body: [
        ['Row 1, Column 1', 'Row 1, Column 2', 'Row 1, Column 3'],
        ['Row 2, Column 1', 'Row 2, Column 2', 'Row 2, Column 3'],
      ],
    });

    // Save the document
    doc.save('table-export.pdf');
  };

  return (
    <div>
      <button onClick={handleExportPDF}>Export PDF</button>
      <Table />
    </div>
  );
};

const App = () => {
  return (
    <div>
      <PDFExporter />
    </div>
  );
};

export default App;
