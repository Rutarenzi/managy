import { Page } from '@/@types';
import { referenceRoutes } from '@/components/constants/links';
import SearchBar from '@/components/reference/SearchBar';
import { AuthApi } from '@/utils/axios.config';
import { Button, Flex, useDisclosure, useToast } from '@chakra-ui/react';
import {
  ArchiveBoxXMarkIcon,
  ArrowPathIcon,
  ChevronDoubleRightIcon,
  ExclamationTriangleIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { ThemeProvider } from '@mui/material';
import { DataGrid, GridCellParams, GridColDef, GridColumnHeaderParams } from '@mui/x-data-grid';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { muiTheme } from '../_app';

import DeleteModal from '../../components/reference/DeleteModal';
import DynamicForm from '@/components/reference/DynamicForm';
import AddModal from '@/components/reference/AddModal';
import useMuiChakraTheme from '@/utils/hooks/useMuiChakraTheme';
import { camelToNormal } from '@/utils/funcs';

// const ref_notification_titles = {
//   add: 'Adding new item',
//   update: 'Updating item',
//   delete: 'Deleting item',
// };

const Reference: Page = () => {
  const [active, setActive] = useState('excel');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [TableData, setTableData] = useState<any[]>([]);
  const [toDelete, setToDelete] = useState(null);
  const [toUpdate, setToUpdate] = useState(null);
  const router = useRouter();
  const toast = useToast();
  const { muiIndex } = useMuiChakraTheme();
  const { ref_name } = router.query as any;

  const select_ref_data = useMemo<{ [key: string]: any }>(() => {
    const needed = referenceRoutes[ref_name].schema.filter((el) => el.dataFromURL);
    const data: any = needed.reduce(
      (prev, cur) => ({ ...prev, [cur.title]: { data: undefined } }),
      {},
    );
    (async () => {
      for (const obj of needed) {
        try {
          const { data: fetchedData } = await AuthApi.get(obj.dataFromURL!);
          data[obj.title] = fetchedData.data;
        } catch (err) {
          console.log(err);
        }
      }
    })();
    console.log('GOT THE SELECT_REF_DATA!');
    return data;
  }, [ref_name]);

  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

  useEffect(() => {
    getTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref_name]);

  const getTableData = async () => {
    setIsLoading(true);
    try {
      const { data: tableData } = await AuthApi.get(referenceRoutes[ref_name].getAll);
      setTableData(tableData.data);
    } catch (err) {
      console.log('/err', err);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: WORK on Dynamic On Submit
  // const handleOnSubmit = (formData: any = {}, type: 'add' | 'update' | 'delete') => {
  //   const id = toast({
  //     title: ref_notification_titles[type],
  //     description: 'Please wait...',
  //     isClosable: false,
  //     duration: null,
  //   });

  //   setToUpdate(null);
  //   setToDelete(null);
  // };

  const handleOnAdd = (formData: any) => {
    const id = toast({
      title: 'Adding new item',
      description: 'Please wait...',
      isClosable: false,
      duration: null,
    });
    AuthApi.post(referenceRoutes[ref_name].add, {
      ...formData,
    })
      .then(({ data }) => {
        console.log('%cRESPONSE', 'font-size: 2rem; color: gold;');
        console.log(data);
        getTableData();
      })
      .catch(({ response, ...err }) => {
        console.log('%cFailed', 'font-size: 2rem; color: red', err);
        toast({
          title: 'Failed!',
          description: response.data.message,
          duration: 2000,
          status: 'error',
        });
        console.log(err);
      })
      .finally(() => {
        toast.close(id);
      });
  };

  const handleOnUpdate = (formData: any) => {
    const id = toast({
      title: 'Updating item',
      description: 'Please wait...',
      isClosable: false,
      duration: null,
    });

    if ((toUpdate as any)._id) {
      AuthApi.patch(referenceRoutes[ref_name].update + `/${(toUpdate as any)._id}`, {
        ...formData,
      })
        .then(({ data }) => {
          console.log('%cRESPONSE', 'font-size: 2rem; color: gold;');
          console.log(data);
          getTableData();
        })
        .catch(({ response, ...err }) => {
          console.log('%cFailed', 'font-size: 2rem; color: red', err);
          toast({
            title: 'Failed!',
            description: response.data.message,
            duration: 2000,
            status: 'error',
          });
          console.log(err);
        })
        .finally(() => {
          toast.close(id);
        });
    }

    setToUpdate(null);
  };

  const handleItemDelete = () => {
    if (!toDelete) return;
    const id = toast({
      title: 'Deleting item',
      description: 'Please wait...',
      isClosable: false,
      duration: null,
    });
    AuthApi.delete(referenceRoutes[ref_name].delete + `/${toDelete}`)
      .then(({ data }) => {
        console.log('%cRESPONSE', 'font-size: 2rem; color: gold;');
        console.log(data);
        getTableData();
        setToDelete(null);
      })
      .catch((err) => {
        console.log('%cFailed', 'font-size: 2rem; color: red');
        toast({
          title: 'Failed!',
          description: 'Something Went Wrong. Please Try Again',
          duration: 2000,
          status: 'error',
        });
        console.log(err);
        toast({
          title: 'Failed to delete item',
          description: 'Please try again later',
          colorScheme: 'red',
        });
      })
      .finally(() => {
        toast.close(id);
      });

    onDeleteClose();
  };

  const columns: GridColDef[] = [
    ...referenceRoutes[ref_name].schema.map(
      (key: { title: string }): GridColDef => ({
        field: key.title,
        headerName: key.title,
        flex: 1,
        minWidth: 100,
        renderHeader: (params: GridColumnHeaderParams) => (
          <h1 className="font-bold capitalize">{camelToNormal(params.field)}</h1>
        ),
        renderCell: (params: GridCellParams) => {
          if (typeof params.formattedValue === 'object')
            return <span>{(params.formattedValue as any).name}</span>;
          return <span>{params.formattedValue?.toString()}</span>;
        },
      }),
    ),
    {
      field: 'Action',
      headerName: 'Action',
      sortable: false,
      flex: 1,
      minWidth: 200,
      renderHeader: (params: GridColumnHeaderParams) => (
        <h1 className="font-bold capitalize">{params.field}</h1>
      ),
      renderCell: (params: GridCellParams) => {
        return (
          <Flex gap={2} alignItems={'center'}>
            <button
              className="bg-secondary-50 text-white px-4 flex items-center gap-x-1 py-2 rounded-md font-medium"
              onClick={() => {
                setToUpdate(params.row);
                onAddOpen();
              }}
            >
              <PencilSquareIcon className="w-5 h-5" />
              Edit
            </button>
            <button
              className="bg-red-500 duration-150 text-white px-2 flex items-center gap-x-2 py-2 rounded-md font-medium"
              onClick={() => {
                setToDelete(params.row._id);
                onDeleteOpen();
              }}
            >
              <ArchiveBoxXMarkIcon className="w-5 h-5" />
              Delete
            </button>
          </Flex>
        );
      },
    },
  ];

  return (
    <>
      <AddModal onClose={onAddClose} onOpen={onAddOpen} isOpen={isAddOpen} closeOnOverlayClick>
        <DynamicForm
          components={referenceRoutes[ref_name].schema.map((el) => {
            if (!el.dataFromURL) return el;
            return { ...el, dataFromURL: undefined, data: select_ref_data[el.title] };
          })}
          onSubmit={toUpdate ? handleOnUpdate : handleOnAdd}
          onClose={onAddClose}
          {...(!!toUpdate ? { data: toUpdate } : {})}
        />
      </AddModal>
      <DeleteModal
        onClose={onDeleteClose}
        onOpen={onDeleteOpen}
        isOpen={isDeleteOpen}
        closeOnOverlayClick
        onConfirm={handleItemDelete}
      />
      <div className=" flex w-full flex-col p-2 gap-y-3">
        <div className="flex items-center w-full justify-between gap-x-4">
          <Flex gap={2} alignItems={'center'} grow={1}>
            <SearchBar />
            <Button colorScheme="blue" variant={'outline'} onClick={onAddOpen}>
              ADD
            </Button>
            <Button
              colorScheme="blue"
              onClick={isLoading ? undefined : getTableData}
              variant={'ghost'}
            >
              <ArrowPathIcon className={`w-5 h-5 stroke-2 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </Flex>
        </div>
        <div className=" flex flex-col w-full gap-y-3 p-2 rounded-md border-2">
          {/* <ReferenceDataTable /> */}
          {TableData.length == 0 && (
            <h1 className="text-center p-4 font-bold">
              {isLoading ? 'Loading....' : 'No Reference Data'}
            </h1>
          )}
          {TableData.length > 0 && (
            <ThemeProvider theme={muiTheme}>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={TableData.map((el: any, i: number) => ({ ...el, id: i }))}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  sx={{ zIndex: muiIndex }}
                  pageSizeOptions={[5, 10, 20, 50, 100]}
                  checkboxSelection
                  hideFooterSelectedRowCount
                />
              </div>
            </ThemeProvider>
          )}
        </div>
      </div>
    </>
  );
};

Reference.title = 'Asset Functional Locations';
Reference.titleName = 'Reference';
Reference.metadata = {
  title: 'Asset Functional Locations - InvictusRMF',
  description: 'InvictusRMF is a website that provides information about the InvictusRMF project.',
};

Reference.titleNameShown = false;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const ref_name = ctx.params?.ref_name as string;
  if (ref_name && !referenceRoutes[ref_name]) return { notFound: true };
  return {
    props: {},
  };
};

export default Reference;
