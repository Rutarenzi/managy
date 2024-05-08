/* eslint-disable react-hooks/exhaustive-deps */
import { Page } from '@/@types';
import { OutgoingRequest } from '@/@types/types2';
import Exporter from '@/components/constants/Exporter';
import AddStockItemModal from '@/components/stock/AddStockItemModal';
import StockTable from '@/components/stock/StockTable';
import { outgoingFormInfo } from '@/components/stock/data';
import {
  addOutgoingRequest,
  removeOutgoingRequest,
  setOutgoingRequests,
} from '@/redux/slices/stock.slice';
import { RootState } from '@/redux/store';
import { AuthApi } from '@/utils/axios.config';
import { makeColsFromObject } from '@/utils/funcs';
import { getOutgoingStock } from '@/utils/funcs/fetch';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { ArrowPathIcon, PlusIcon } from '@heroicons/react/24/outline';
import { GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const intialData = {
  item: '',
  dueDate: new Date(),
  quantity: '',
  unitOfMeasurement: '',
  price: '',
  reason: '',
  unitPrice: 0,
};

const OutgoingIndex: Page = () => {
  const [loading, setLoading] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const [outData, setOutData] = useState<OutgoingRequest>(intialData);
  const { outgoing } = useSelector((state: RootState) => state.stock);
  const [columns, setColumns] = React.useState<GridColDef[]>([]);
  const [editMode, setEditMode] = React.useState(false);
  const [activeOutgoing, setActiveOutgoing] = useState<OutgoingRequest | null>(null);

  const newData = outgoing.map((item) => {
    return {
      ...item,
      dueDate: moment(item.dueDate).format('DD/MM/YYYY'),
      item: (item.item as any).name,
    };
  });

  const submitNewOutgoing = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(outData);
    try {
      const res = await AuthApi.post('/stock/outgoingRequests/create', outData);
      console.log(res.data);
      if (res.status === 201) {
        dispatch(addOutgoingRequest(res.data.data));
        onClose();
        toast({
          title: 'Outgoing Stock Added',
          description: 'Outgoing stock has been added successfully',
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

  const getAllOutgoings = async () => {
    setLoading(true);
    try {
      const data = await getOutgoingStock();
      console.log(data);
      dispatch(setOutgoingRequests(data.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (req: OutgoingRequest) => {
    console.log(req);
    setActiveOutgoing(req);
    setEditMode(true);
    setOutData({
      item: req.item,
      dueDate: new Date(req.dueDate),
      quantity: req.quantity,
      unitOfMeasurement: req.unitOfMeasurement,
      price: req.price,
      reason: req.reason,
      unitPrice: req.unitPrice,
    });
    onOpen();
  };

  const editOutgoing = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(outData);
    try {
      const res = await AuthApi.patch(
        `/stock/outgoingRequests/update/${activeOutgoing?._id}`,
        outData,
      );
      console.log(res.data);
      if (res.status === 200) {
        onClose();
        toast({
          title: 'Request Updated',
          description: 'Your request has been updated successfully',
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

  const deleteOutgoing = async (mov: OutgoingRequest) => {
    setLoading(true);
    try {
      const res = await AuthApi.delete(`/stock/outgoingRequests/delete/${mov._id}`);
      console.log(res.data);
      if (res.status === 200) {
        dispatch(removeOutgoingRequest(mov._id));
        onClose();
        toast({
          title: 'Stock Outgoing Deleted',
          description: 'Your Stock Outgoing has been deleted successfully',
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

  useEffect(() => {
    getAllOutgoings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const toRemove = ['_id', '__v', 'requestedBy', 'createdAt', 'updatedAt', 'creator'];
    const columns = makeColsFromObject(outgoing[0], toRemove);
    setColumns(columns);
  }, [outgoing]);

  return (
    <div>
      <AddStockItemModal
        {...{
          isOpen,
          onClose,
          submitHandler: editMode ? editOutgoing : submitNewOutgoing,
          data: outData,
          setData: setOutData,
          loading,
          onOpen,
          setLoading,
          formInfo: outgoingFormInfo,
          closeOnOverlayClick: false,
          otherTitle: editMode ? 'Edit Outgoing' : 'New Outgoing',
          setEditMode,
        }}
      />
      <div className=" flex min-h-[84vh] flex-col w-full gap-y-3 p-2 rounded-md border-2">
        <div className="flex sm:flex-row flex-col gap-y-4 w-full justify-between items-center">
          {/* <h1 className=" font-semibold text-lg text-primary">Incommings</h1> */}
          <Exporter data={newData} columns={columns} fileName="Outgoing Stock" />
          <button
            onClick={onOpen}
            className=" bg-secondary sm:w-fit w-full hover:bg-primary duration-200 active:bg-primary-50 px-4 items-center flex gap-x-3  text-white rounded-md py-1.5"
          >
            <PlusIcon className="w-6" />
            New
          </button>
        </div>
        {outgoing.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-xl font-semibold text-gray-500">No Outgoing stock items</h1>
          </div>
        ) : !loading ? (
          <StockTable
            stockData={newData}
            onDelete={deleteOutgoing}
            onEdit={onEdit}
            columns={columns}
            resetFn={() => setOutData(intialData)}
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

OutgoingIndex.title = 'Outgoing stocks items - Invictus RMF';
OutgoingIndex.titleName = 'Outgoing stocks items';
OutgoingIndex.titleNameShown = true;
export default OutgoingIndex;
