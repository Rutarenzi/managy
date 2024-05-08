import { Department, Page, StockRequest, Vendor } from '@/@types';
import { FormInfo } from '@/@types/types1';
import Exporter from '@/components/constants/Exporter';
import AddStockItemModal from '@/components/stock/AddStockItemModal';
import StockTable from '@/components/stock/StockTable';
import { requestFormInfo } from '@/components/stock/data';
import { useAuth } from '@/contexts/AuthProvider';
import {
  addRequestedStock,
  removeRequestedStock,
  setStockRequests,
} from '@/redux/slices/stock.slice';
import { RootState } from '@/redux/store';
import { AuthApi } from '@/utils/axios.config';
import { makeColsFromObject } from '@/utils/funcs';
import { getStockRequests } from '@/utils/funcs/fetch';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { ArrowPathIcon, PlusIcon } from '@heroicons/react/24/outline';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const RequestedIndex: Page = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { loggInData } = useSelector((state: RootState) => state.user);
  const initialData = {
    department: '',
    item: '',
    store: '',
    quantity: 0,
    itemGroup: '',
    unitOfMeasurement: '',
    vendor: '',
    assetCode: '',
    reason: '',
    unitPrice: 0,
  };
  const [reqData, setReqData] = React.useState<StockRequest>(initialData);
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  const { requested } = useSelector((state: RootState) => state.stock);
  const [columns, setColumns] = React.useState<GridColDef[]>([]);
  const [editMode, setEditMode] = React.useState(false);
  const [activeRequest, setActiveRequest] = React.useState<StockRequest | null>(null);
  const { isAdmin } = useAuth();
  const newData = requested.map((item) => {
    return {
      ...item,
      vendor: (item.vendor as Vendor)?.name ?? '',
      department: (item.department as Department)?.name ?? '',
      item: (item.item as any)?.name ?? '',
      itemGroup: (item.itemGroup as any)?.name ?? '',
      unitOfMeasurement: (item.unitOfMeasurement as any)?.name ?? '',
    };
  });

  const submitNewRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(reqData);
    try {
      const res = await AuthApi.post('/stock/stockRequest/createRequest', reqData);
      console.log(res.data);
      if (res.status === 201) {
        dispatch(addRequestedStock(res.data.data));
        onClose();
        toast({
          title: 'Request Added',
          description: 'Your request has been added successfully',
          status: 'success',
        });
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: 'Error',
        description:
          (error?.response?.data.message || error?.response?.data?.error) ?? 'Something went wrong',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (req: StockRequest) => {
    console.log(req);
    setActiveRequest(req);
    setEditMode(true);
    setReqData(req);
    onOpen();
  };

  // const onDelete = async (id: string) => {
  //   setLoading(true);

  const editRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(reqData);
    try {
      const res = await AuthApi.patch(
        `/stock/stockRequest/updateRequest/${activeRequest?._id}`,
        reqData,
      );
      console.log(res.data);
      if (res.status === 200) {
        dispatch(removeRequestedStock(activeRequest?._id));
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
          (error?.response?.data.message || error?.response?.data?.error) ?? 'Something went wrong',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (req: StockRequest) => {
    setLoading(true);
    try {
      const res = await AuthApi.delete(`/stock/stockRequest/deleteRequest/${req._id}`);
      console.log(res.data);
      if (res.status === 200) {
        dispatch(removeRequestedStock(req._id));
        onClose();
        toast({
          title: 'Request Deleted',
          description: 'Your request has been deleted successfully',
          status: 'success',
        });
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: 'Error',
        description:
          (error?.response?.data.message || error?.response?.data?.error) ?? 'Something went wrong',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const approveRequest = async (req: StockRequest) => {
    setLoading(true);
    try {
      const res = await AuthApi.put(`/stock/stockRequest/approveRequest/${req._id}`);
      console.log(res.data);
      if (res.status === 200) {
        dispatch(removeRequestedStock(req._id));
        onClose();
        toast({
          title: 'Request Approved',
          description: 'Your request has been approved successfully',
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

  const getAllRequest = async () => {
    setLoading(true);
    try {
      const data = await getStockRequests();
      console.log(data);
      dispatch(setStockRequests(data.data));
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
    const toRemove = ['_id', '__v', 'requestedBy', 'creator', 'createdAt', 'updatedAt'];
    const columns = makeColsFromObject(requested[0], toRemove);
    setColumns(columns);
  }, [requested]);

  return (
    <div>
      <AddStockItemModal
        {...{
          isOpen,
          onClose,
          submitHandler: editMode && !isAdmin ? editRequest : submitNewRequest,
          data: reqData,
          setData: setReqData,
          loading,
          onOpen,
          setLoading,
          formInfo: requestFormInfo,
          closeOnOverlayClick: false,
          otherTitle: editMode ? 'Edit Request' : 'New Request',
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
            New Request
          </button>
        </div>
        {newData.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-xl font-semibold text-gray-500">No Requested stock items</h1>
          </div>
        ) : !loading ? (
          <StockTable
            stockData={newData}
            columns={columns}
            onEdit={isAdmin ? approveRequest : onEdit}
            onDelete={deleteRequest}
            loading={loading}
            resetFn={() => setReqData(initialData)}
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

RequestedIndex.title = 'Requested Stock - Invictus RMF';
RequestedIndex.titleName = 'Requested Stock';
RequestedIndex.titleNameShown = true;

export default RequestedIndex;
