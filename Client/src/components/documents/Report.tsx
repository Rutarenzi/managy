import React from 'react';
import { Document, Page, Text } from '@react-pdf/renderer';

const MyPdfDocument = () => {
  return (
    <Document>
      <Page>
        <Text>Hello, world!</Text>
      </Page>
    </Document>
  );
};

export default MyPdfDocument;
