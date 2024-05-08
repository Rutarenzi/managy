import jwtDecode from 'jwt-decode';
import { getCookie } from '../cookies';
import { GridColDef } from '@mui/x-data-grid';

export const getLogginData = () => {
  let logginData = null;
  try {
    const data: any = jwtDecode(getCookie('token') ?? '');
    const isExpired = data.exp * 1000 < Date.now();
    console.log('isExpired', isExpired);
    if (isExpired) return null;
    logginData = data;
  } catch (err) {
    console.log(err);
  }
  return logginData;
};

// type InputData = {
//   ['key']: string;
// };
// const data: InputData = { key: 'U' };

export const validateInput = (data: any) => {};

/**
 * @param object
 * @param toRemove
 * @description This function takes an object and returns an array of columns
 * @returns {GridColDef[]} columns
 */
export const makeColsFromObject = (object: object, toRemove?: string[]) => {
  if (!object) return [] as GridColDef[];
  const columns: GridColDef[] = [];
  Object.keys(object).forEach((key) => {
    if (toRemove?.includes(key)) return;
    const col: GridColDef = {
      field: key,
      headerName: key,
      width: 200,
    };
    columns.push(col);
  });
  return columns;
};

export const removeProps = (obj: any, props: string[]) => {
  const newObj = { ...obj };
  props.forEach((prop) => delete newObj[prop]);
  return newObj;
};

export const camelToNormal = (val: string = '') =>
  val.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^([a-z])/, (res: string) => res.toUpperCase());

export const isIsoDate = (str: string) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d: Date = new Date(str);
  return d instanceof Date && d.toISOString() === str; // valid date
};
