import { Page } from '@/@types';
import { IStockMovement } from '@/@types/types2';
import Exporter from '@/components/constants/Exporter';
import AddStockItemModal from '@/components/stock/AddStockItemModal';
import StockTable from '@/components/stock/StockTable';
import { movementFormInfo } from '@/components/stock/data';
import { useAuth } from '@/contexts/AuthProvider';
import {
  addRequestedStock,
  addStockMovement,
  removeRequestedStock,
  removeStockMovement,
  setStockMovements,
  updateIncomingStock,
  updateOutgoingRequest,
} from '@/redux/slices/stock.slice';
import { RootState } from '@/redux/store';
import { AuthApi } from '@/utils/axios.config';
import { makeColsFromObject } from '@/utils/funcs';
import { getStockMovements } from '@/utils/funcs/fetch';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { ArrowPathIcon, PlusIcon } from '@heroicons/react/24/outline';
import { GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const intialData = {
  destinationOffice: '',
  item: '',
  dateOfMovement: '',
  movementReason: '',
};

const MovementsIndex: Page = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { loggInData } = useSelector((state: RootState) => state.user);
  const [movData, setMovData] = React.useState<IStockMovement>(intialData);
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  const { movement } = useSelector((state: RootState) => state.stock);
  const [columns, setColumns] = React.useState<GridColDef[]>([]);
  const [editMode, setEditMode] = React.useState(false);
  const [activeMovement, setActiveMovement] = React.useState<IStockMovement | null>(null);
  const { isAdmin } = useAuth();
  const newData = movement.map((item) => {
    return {
      ...item,
      dateOfMovement: moment(item.dateOfMovement).format('DD/MM/YYYY'),
    };
  });

  const submitNewMovement = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(movData);
    try {
      const res = await AuthApi.post('/stock/stockMovements/create', movData);
      console.log(res.data);
      if (res.status === 201) {
        dispatch(addStockMovement(res.data.data));
        onClose();
        toast({
          title: 'Movement Added',
          description: 'Your Movement has been added successfully',
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

  const onEdit = (req: IStockMovement) => {
    console.log(req);
    setActiveMovement(req);
    setEditMode(true);
    setMovData(req);
    onOpen();
  };

  // const onDelete = async (id: string) => {
  //   setLoading(true);

  const editMovement = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(movData);
    try {
      const res = await AuthApi.patch(
        `/stock/stockMovements/update/${activeMovement?._id}`,
        movData,
      );
      console.log(res.data);
      if (res.status === 200) {
        dispatch(removeRequestedStock(activeMovement?._id));
        onClose();
        toast({
          title: 'Movement Updated',
          description: 'Your Movement has been updated successfully',
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

  const deleteMovement = async (mov: IStockMovement) => {
    setLoading(true);
    try {
      const res = await AuthApi.delete(`/stock/stockMovements/delete/${mov._id}`);
      console.log(res.data);
      if (res.status === 200) {
        dispatch(removeStockMovement(mov._id));
        onClose();
        toast({
          title: 'Stock Movement Deleted',
          description: 'Your Stock Movement has been deleted successfully',
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

  const approveMovement = async (mov: IStockMovement) => {
    setLoading(true);
    try {
      const res = await AuthApi.put(`/stock/stockMovements/approve/${mov._id}`);
      console.log(res.data);
      if (res.status === 200) {
        dispatch(updateOutgoingRequest(mov._id));
        onClose();
        toast({
          title: 'Stock Movement Approved',
          description: 'Your Stock Movement has been approved successfully',
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

  const getAllMovements = async () => {
    setLoading(true);
    try {
      const data = await getStockMovements();
      console.log(data);
      dispatch(setStockMovements(data.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMovements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const toRemove = ['_id', '__v', 'requestedBy', 'approvedBy', 'approvedDate'];
    const columns = makeColsFromObject(movement[0], toRemove);
    setColumns(columns);
  }, [movement]);

  return (
    <div>
      <AddStockItemModal
        {...{
          isOpen,
          onClose,
          submitHandler: editMode && !isAdmin ? editMovement : submitNewMovement,
          data: movData,
          setData: setMovData,
          loading,
          onOpen,
          setLoading,
          formInfo: movementFormInfo,
          closeOnOverlayClick: false,
          otherTitle: editMode ? 'Edit Movement' : 'New Movement',
          setEditMode,
        }}
      />
      <div className=" flex min-h-[84vh] flex-col w-full gap-y-3 p-2 rounded-md border-2">
        <div className="flex sm:flex-row flex-col gap-y-4 w-full justify-between items-center">
          {/* <h1 className=" font-semibold text-lg text-primary">Requests</h1> */}
          <Exporter data={newData} columns={columns} fileName="Requested Stock" />
          <button
            onClick={onOpen}
            className=" bg-secondary xs:w-fit w-full justify-center hover:bg-primary duration-200 active:bg-primary-50 px-4 items-center flex gap-x-3 uppercase text-white rounded-md py-1.5"
          >
            <PlusIcon className="w-6" />
            New Movement
          </button>
        </div>
        {newData.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-lg font-semibold text-gray-500">No stock Movements to show</h1>
          </div>
        ) : !loading ? (
          <StockTable
            stockData={newData}
            columns={columns}
            onEdit={isAdmin ? approveMovement : onEdit}
            onDelete={deleteMovement}
            loading={loading}
            resetFn={() => setMovData(intialData)}
            isApprove
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

MovementsIndex.title = 'Stock Movements - Invictus RMF';
MovementsIndex.titleName = 'Stock Movements';
MovementsIndex.titleNameShown = true;

export default MovementsIndex;
