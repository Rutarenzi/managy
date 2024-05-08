/* eslint-disable react-hooks/exhaustive-deps */
import { Page } from '@/@types';
import { OpeningStock } from '@/@types/types2';
import Exporter from '@/components/constants/Exporter';
import AddStockItemModal from '@/components/stock/AddStockItemModal';
import StockTable from '@/components/stock/StockTable';
import { openingStockFormInfo } from '@/components/stock/data';
import { AuthApi } from '@/utils/axios.config';
import { makeColsFromObject } from '@/utils/funcs';
import { getOpeningStock } from '@/utils/funcs/fetch';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { ArrowPathIcon, PlusIcon } from '@heroicons/react/24/outline';
import { GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const intialData: OpeningStock = {
  item: '',
  date: new Date(),
  quantity: '',
  unitPrice: 0,
  VATno: '',
  supplier: '',
};

const OpeningIndex: Page = () => {
  const [loading, setLoading] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [openData, setOpenData] = useState<OpeningStock>(intialData);
  const [opening, setOpening] = useState<OpeningStock[]>([]);
  const [columns, setColumns] = React.useState<GridColDef[]>([]);
  const [editMode, setEditMode] = React.useState(false);
  const [activeOpening, setActiveOpening] = useState<OpeningStock | null>(null);

  const newData = opening.map((item) => {
    return {
      ...item,
      date: moment(item.date).format('DD/MM/YYYY'),
      item: (item.item as any).name,
    };
  });

  const submitNewOpening = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(openData);
    try {
      const res = await AuthApi.post('/stock/openingStock/create', openData);
      console.log(res.data);
      if (res.status === 201) {
        setOpening([...opening, res.data.data]);
        onClose();
        toast({
          title: 'Opening Stock Added',
          description: 'Opening stock has been added successfully',
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

  const getAllOpenings = async () => {
    setLoading(true);
    try {
      const data = await getOpeningStock();
      console.log(data);
      setOpening(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (req: OpeningStock) => {
    console.log(req);
    setActiveOpening(req);
    setEditMode(true);
    setOpenData({
      item: req.item,
      date: req.date,
      quantity: req.quantity,
      unitPrice: req.unitPrice,
      VATno: req.VATno,
      supplier: req.supplier,
    });
    onOpen();
  };

  const editOpening = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(openData);
    try {
      const res = await AuthApi.patch(`/stock/openingStock/update/${activeOpening?._id}`, openData);
      console.log(res.data);
      if (res.status === 200) {
        onClose();
        toast({
          title: 'Opening Stock Updated',
          description: 'Your Opening Stock has been updated successfully',
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

  const deleteOpening = async (mov: OpeningStock) => {
    setLoading(true);
    try {
      const res = await AuthApi.delete(`/stock/openingStock/delete/${mov._id}`);
      console.log(res.data);
      if (res.status === 200) {
        setOpening(opening.filter((item) => item._id !== mov._id));
        onClose();
        toast({
          title: 'Stock Opeing Deleted',
          description: 'Your Stock Opeing has been deleted successfully',
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
    getAllOpenings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const toRemove = ['_id', '__v', 'requestedBy', 'createdAt', 'updatedAt', 'creator'];
    const columns = makeColsFromObject(opening[0], toRemove);
    setColumns(columns);
  }, [opening]);

  return (
    <div>
      <AddStockItemModal
        {...{
          isOpen,
          onClose,
          submitHandler: editMode ? editOpening : submitNewOpening,
          data: openData,
          setData: setOpenData,
          loading,
          onOpen,
          setLoading,
          formInfo: openingStockFormInfo,
          closeOnOverlayClick: false,
          otherTitle: editMode ? 'Edit Opening' : 'New Opening',
          setEditMode,
        }}
      />
      <div className=" flex min-h-[84vh] flex-col w-full gap-y-3 p-2 rounded-md border-2">
        <div className="flex sm:flex-row flex-col gap-y-4 w-full justify-between items-center">
          {/* <h1 className=" font-semibold text-lg text-primary">Incommings</h1> */}
          <Exporter data={newData} columns={columns} fileName="Opening Stock" />
          <button
            onClick={onOpen}
            className=" bg-secondary sm:w-fit w-full hover:bg-primary duration-200 active:bg-primary-50 px-4 items-center flex gap-x-3  text-white rounded-md py-1.5"
          >
            <PlusIcon className="w-6" />
            New
          </button>
        </div>
        {opening.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-xl font-semibold text-gray-500">No Opening stock items</h1>
          </div>
        ) : !loading ? (
          <StockTable
            stockData={newData}
            onDelete={deleteOpening}
            onEdit={onEdit}
            columns={columns}
            resetFn={() => setOpenData(intialData)}
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

OpeningIndex.title = 'Opening stocks items - Invictus RMF';
OpeningIndex.titleName = 'Opening stocks items';
OpeningIndex.titleNameShown = true;
export default OpeningIndex;
