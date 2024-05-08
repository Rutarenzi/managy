export interface StockReportData {
  category: string;
  openingTotal: number;
  receivedTotal: number;
  issuedTotal: number;
  closingTotal: number;
  items: Item[];
}

export interface Item {
  code: number;
  _id?: string;
  name: string;
  stockItemCategory: StockItemCategory;
  unitOfMeasurement: UnitOfMeasurement;
  minimumStockLevel: number;
  maximumStockLevel: number;
  stockAlertLevel: number;
  isActive: boolean;
  __v?: number;
  opening: Opening;
  received: Received;
  issued: Issued;
  closing: Closing;
}

export interface StockItemCategory {
  _id?: string;
  name: string;
  __v?: number;
}

export interface UnitOfMeasurement {
  _id?: string;
  name: string;
  prefix: string;
  __v?: number;
}

export interface Opening {
  qty: number;
  unitPrice: number;
  value: number;
}

export interface Received {
  qty: number;
  unitPrice: number;
  value: number;
}

export interface Issued {
  qty: number;
  unitPrice: number;
  value: number;
}

export interface Closing {
  qty: number;
  unitPrice: number;
  value: number;
}
