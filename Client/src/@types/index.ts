import { Metadata, NextPage } from 'next';
import { AppProps } from 'next/app';

export type PageProps = AppProps['Component'] & {
  title?: string;
  metadata?: Metadata;
  titleName?: string;
  titleNameShown?: boolean;
};

export type Page = NextPage & PageProps;

export type ReferenceData = {
  id: string;
  name: string;
  description: string;
  location: string;
  department: string;
};

export type ModuleLink = {
  name: string;
  link: string;
};

export type User = {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: 'USER' | 'ADMIN';
  __v?: number;
};

export type StockRequest = {
  _id?: string;
  store: string;
  itemGroup: string;
  item: string;
  department: string | Department;
  unitOfMeasurement: string | UnitOfMeasurement;
  unitPrice: string | number;
  quantity: string | number;
  isApproved?: string;
  assetCode?: string;
  vendor: string | Vendor;
  requestedBy?: string | User;
  reason: string;
  creator?: string | User;
  total?: number;
  __v?: number;
};

export type IncommingReq = {
  _id?: string;
  deliveryNote: string;
  supplier: string;
  date: Date | string;
  isDeliveryFinished?: boolean | string;
  unitPrice: string | number;
  quantity: string | number;
  purchaseOrder: string;
  VATno: string;
  item?: string;
  receivableNotes?: string;
  unitOfMeasurement: string | UnitOfMeasurement;
  __v?: number;
  total?: number;
  creator?: string | User;
};

export type ReceivableNotes = {
  _id?: string;
  deliveryNote: string;
  supplier: string;
  date: Date | string;
  isDeliveryFinished?: boolean | string;
  VATno: string;
  receivableNotes?: string;
  purchaseOrder: string;
  creator?: string | User;
  __v?: number;
};

export type Department = {
  _id?: string;
  name: string;
};

export type Vendor = {
  _id?: string;
  name: string;
  address: string;
  email: string;
};

export type UnitOfMeasurement = {
  _id?: string;
  name: string;
  prefix: string;
};
