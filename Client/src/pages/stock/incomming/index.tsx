/* eslint-disable react-hooks/exhaustive-deps */
import { IncommingReq, Page, UnitOfMeasurement } from '@/@types';
import Exporter from '@/components/constants/Exporter';
import AddStockItemModal from '@/components/stock/AddStockItemModal';
import StockTable from '@/components/stock/StockTable';
import { incFomInfo } from '@/components/stock/data';
import {
  addIncomingStock,
  removeIncomingStock,
  setIncommingStock,
} from '@/redux/slices/stock.slice';
import { RootState } from '@/redux/store';
import { AuthApi } from '@/utils/axios.config';
import { makeColsFromObject } from '@/utils/funcs';
import { getIncommingStock } from '@/utils/funcs/fetch';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { ArrowPathIcon, PlusIcon } from '@heroicons/react/24/outline';
import { GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const IncommingIndex: Page = () => {
  const [loading, setLoading] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const initialData = {
    supplier: '',
    deliveryNote: '',
    purchaseOrder: '',
    VATno: '',
    date: '',
    receivableNotes: '',
    unitPrice: 0,
    quantity: 0,
    unitOfMeasurement: '',
  };
  const [incData, setIncData] = useState<IncommingReq>(initialData);
  const { incomming } = useSelector((state: RootState) => state.stock);
  const [columns, setColumns] = React.useState<GridColDef[]>([]);
  const [editMode, setEditMode] = React.useState(false);
  const [activeInc, setActiveInc] = React.useState<IncommingReq | null>(null);

  const newData = incomming.map((item) => {
    return {
      ...item,
      date: moment(item.date).format('DD/MM/YYYY'),
      unitOfMeasurement: (item.unitOfMeasurement as UnitOfMeasurement).name,
      item: (item.item as any).name,
    };
  });

  const submitNewIncomming = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(incData);
    try {
      const res = await AuthApi.post('/stock/incomingRequests/create', incData);
      console.log(res.data);
      if (res.status === 201) {
        dispatch(addIncomingStock(res.data.data));
        onClose();
        toast({
          title: 'Request Added',
          description: 'Incommng stock has been added successfully',
          status: 'success',
        });
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: 'Error',
        description: error?.response?.message ?? 'Something went wrong',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (req: IncommingReq) => {
    console.log(req);
    setActiveInc(req);
    setEditMode(true);
    setIncData({
      supplier: req.supplier,
      deliveryNote: req.deliveryNote,
      purchaseOrder: req.purchaseOrder,
      VATno: req.VATno,
      date: req.date,
      receivableNotes: req.receivableNotes,
      unitPrice: req.unitPrice,
      quantity: req.quantity,
      unitOfMeasurement: req.unitOfMeasurement,
    });
    onOpen();
  };

  const editInc = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(incData);
    try {
      const res = await AuthApi.patch(`/stock/incomingRequests/update/${activeInc?._id}`, incData);
      console.log(res.data);
      if (res.status === 200) {
        onClose();
        toast({
          title: 'Note Updated',
          description: 'Your Note has been updated successfully',
          status: 'success',
        });
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: 'Error',
        description: error?.response?.data?.message ?? 'Something went wrong',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteInc = async (mov: IncommingReq) => {
    setLoading(true);
    try {
      const res = await AuthApi.delete(`/stock/incomingRequests/delete/${mov._id}`);
      console.log(res.data);
      if (res.status === 200) {
        dispatch(removeIncomingStock(mov._id));
        onClose();
        toast({
          title: 'Stock Incoming Deleted',
          description: 'Your Stock Incoming has been deleted successfully',
          status: 'success',
        });
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: 'Error',
        description:
          (error?.response.data?.message || error?.response.data?.error) ?? 'Something went wrong',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const getAllRequest = async () => {
    setLoading(true);
    try {
      const data = await getIncommingStock();
      console.log(data);
      dispatch(setIncommingStock(data.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const toRemove = ['_id', '__v', 'requestedBy', 'creator'];
    const columns = makeColsFromObject(incomming[0], toRemove);
    setColumns(columns);
  }, [incomming]);

  return (
    <div>
      <AddStockItemModal
        {...{
          isOpen,
          onClose,
          submitHandler: editMode ? editInc : submitNewIncomming,
          data: incData,
          setData: setIncData,
          loading,
          onOpen,
          setLoading,
          formInfo: incFomInfo,
          closeOnOverlayClick: false,
          otherTitle: editMode ? 'Edit Incomming Stock' : 'Add Incomming Stock',
          setEditMode,
        }}
      />
      <div className=" flex min-h-[84vh] flex-col w-full gap-y-3 p-2 rounded-md border-2">
        <div className="flex sm:flex-row flex-col gap-y-4 w-full justify-between items-center">
          {/* <h1 className=" font-semibold text-lg text-primary">Incommings</h1> */}
          <Exporter data={newData} columns={columns} fileName="Incomming Stock" />
          <button
            onClick={onOpen}
            className=" bg-secondary sm:w-fit w-full hover:bg-primary duration-200 active:bg-primary-50 px-4 items-center flex gap-x-3  text-white rounded-md py-1.5"
          >
            <PlusIcon className="w-6" />
            New
          </button>
        </div>
        {incomming.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-xl font-semibold text-gray-500">No incomming stock items</h1>
          </div>
        ) : !loading ? (
          <StockTable
            stockData={newData}
            resetFn={() => setIncData(initialData)}
            columns={columns}
            onDelete={deleteInc}
            onEdit={onEdit}
          />
        ) : (
          <ArrowPathIcon
            className={`w-5 mx-auto h-5 stroke-2 ${loading ? 'animate-spin' : ' hidden'}`}
          />
        )}
        {/* <UsersTable users={users} /> */}
      </div>
    </div>
  );
};

IncommingIndex.title = 'Incomming stocks items - Invictus RMF';
IncommingIndex.titleName = 'Incomming stocks items';
IncommingIndex.titleNameShown = true;
export default IncommingIndex;
