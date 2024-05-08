import { Page, ReceivableNotes } from '@/@types';
import AddStockItemModal from '@/components/stock/AddStockItemModal';
import StockTable from '@/components/stock/StockTable';
import { notesFromInfo } from '@/components/stock/data';
import {
  addReceivedNotes,
  removeReceivedNotes,
  setReceivedNotes,
} from '@/redux/slices/stock.slice';
import { RootState } from '@/redux/store';
import { AuthApi } from '@/utils/axios.config';
import { makeColsFromObject } from '@/utils/funcs';
import { getReceivableNotesStock } from '@/utils/funcs/fetch';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { ArrowPathIcon, PlusIcon } from '@heroicons/react/24/outline';
import { GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'jspdf-autotable';
import Exporter from '@/components/constants/Exporter';

const initialData = {
  supplier: '',
  deliveryNote: '',
  purchaseOrder: '',
  VATno: '',
  date: '',
  receivableNotes: '',
  isDeliveryFinished: false,
};

const ReceivableNotesIndex: Page = () => {
  const [loading, setLoading] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const [noteData, setNoteData] = useState<ReceivableNotes>(initialData);
  const { receivedNotes } = useSelector((state: RootState) => state.stock);
  const [columns, setColumns] = React.useState<GridColDef[]>([]);
  const [editMode, setEditMode] = React.useState(false);
  const [activeNote, setActiveNote] = React.useState<ReceivableNotes | null>(null);

  const newNotesData = receivedNotes.map((item) => {
    return {
      ...item,
      isDeliveryFinished: item.isDeliveryFinished ? 'Yes' : 'No',
      date: moment(item.date).format('DD/MM/YYYY'),
    };
  });

  const submitNewNotes = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(noteData);
    try {
      const res = await AuthApi.post('/stock/receivableNotes/create', noteData);
      console.log(res.data);
      if (res.status === 201) {
        dispatch(addReceivedNotes(res.data.data));
        onClose();
        toast({
          title: 'Request Added',
          description: 'ReceivableNotes Stock stock has been added successfully',
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

  const onEdit = (req: ReceivableNotes) => {
    console.log(req);
    setActiveNote(req);
    setEditMode(true);
    setNoteData({
      supplier: req.supplier,
      deliveryNote: req.deliveryNote,
      purchaseOrder: req.purchaseOrder,
      VATno: req.VATno,
      date: req.date,
      receivableNotes: req.receivableNotes,
    });
    onOpen();
  };

  const editOutgoing = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(noteData);
    try {
      const res = await AuthApi.patch(`/stock/receivableNotes/update/${activeNote?._id}`, noteData);
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

  const deleteNote = async (mov: ReceivableNotes) => {
    setLoading(true);
    try {
      const res = await AuthApi.delete(`/stock/receivableNotes/delete/${mov._id}`);
      console.log(res.data);
      if (res.status === 200) {
        dispatch(removeReceivedNotes(mov._id));
        onClose();
        toast({
          title: 'Stock Note Deleted',
          description: 'Your Stock Note has been deleted successfully',
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
      const data = await getReceivableNotesStock();
      console.log(data);
      dispatch(setReceivedNotes(data.data));
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
    const toRemove = ['_id', '__v', 'requestedBy'];
    const columns = makeColsFromObject(receivedNotes[0], toRemove);
    setColumns(columns);
  }, [receivedNotes]);

  return (
    <div>
      <AddStockItemModal
        {...{
          isOpen,
          onClose,
          submitHandler: editMode ? editOutgoing : submitNewNotes,
          data: noteData,
          setData: setNoteData,
          loading,
          onOpen,
          setLoading,
          formInfo: notesFromInfo,
          closeOnOverlayClick: false,
          otherTitle: editMode ? 'Edit Note' : 'Add Note',
          setEditMode,
        }}
      />
      <div className=" flex min-h-[84vh] flex-col w-full gap-y-3 p-2 rounded-md border-2">
        <div className="flex sm:flex-row flex-col gap-y-4 w-full justify-between items-center">
          {/* <h1 className=" font-semibold text-lg text-primary">Receivable Notes</h1> */}
          <Exporter data={newNotesData} columns={columns} fileName="Received Notes" />
          <button
            onClick={onOpen}
            className=" bg-secondary sm:w-fit w-full hover:bg-primary duration-200 active:bg-primary-50 px-4 items-center flex gap-x-3  text-white rounded-md py-1.5"
          >
            <PlusIcon className="w-6" />
            New
          </button>
        </div>
        {receivedNotes.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-xl font-semibold text-gray-500">No receivableNotes stock items</h1>
          </div>
        ) : !loading ? (
          <StockTable
            stockData={newNotesData}
            onEdit={onEdit}
            onDelete={deleteNote}
            columns={columns}
            resetFn={() => setNoteData(initialData)}
          />
        ) : (
          <ArrowPathIcon
            className={`w-5 mx-auto h-5 stroke-2 ${loading ? 'animate-spin' : ' hidden'}`}
          />
        )}
      </div>
    </div>
  );
};

ReceivableNotesIndex.title = 'Receivable Notes - Invictus RMF';
ReceivableNotesIndex.titleName = 'Stock Receivable Notes';
ReceivableNotesIndex.titleNameShown = true;

export default ReceivableNotesIndex;
