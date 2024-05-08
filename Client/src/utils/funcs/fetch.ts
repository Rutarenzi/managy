import { AuthApi } from '../axios.config';

export const getStockRequests = async () => {
  const res = await AuthApi.get('/stock/stockRequest/getAllRequests');
  return res.data;
};

export const getIncommingStock = async () => {
  const res = await AuthApi.get('/stock/incomingRequests/getAll');
  return res.data;
};

export const getReceivableNotesStock = async () => {
  const res = await AuthApi.get('/stock/receivableNotes/getAll');
  return res.data;
};

export const getOutgoingStock = async () => {
  const res = await AuthApi.get('/stock/outgoingRequests/getAll');
  return res.data;
};

export const getOpeningStock = async () => {
  const res = await AuthApi.get('/stock/openingStock/getAll');
  return res.data;
};

export const getStockMovements = async () => {
  const res = await AuthApi.get('/stock/stockMovements/getAll');
  return res.data;
};

export const getStockItems = async () => {
  const res = await AuthApi.get('/admin/stockItemReference/getAll');
  return res.data;
};
