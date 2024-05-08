import { useDisclosure, useToast } from '@chakra-ui/react';
import React from 'react';
import DeleteModal from './DeleteModal';
import { User } from '@/@types';
import EditUserModal, { EditUserType } from './EditUserModal';
import { AuthApi } from '@/utils/axios.config';
import { ArchiveBoxXMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { deleteCookie } from '@/utils/cookies';
import { useRouter } from 'next/router';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import { removeUser } from '@/redux/slices/user.slice';

const theme = createTheme({});
const columns: GridColDef[] = [
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: false,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    editable: false,
  },
  {
    field: 'role',
    headerName: 'Role',
    sortable: false,
    width: 110,
    editable: false,
  },
  {
    field: 'FullName',
    headerName: 'FullName',
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const UsersTable = ({ users }: { users: User[] }) => {
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = React.useState(false);
  const [prevData, setPrevData] = React.useState({} as EditUserType);
  const toast = useToast();
  const dispatch = useDispatch();
  const { loggInData } = useSelector((state: RootState) => state.user);
  const [extraInfo, setExtraInfo] = React.useState<string | null>(null);
  const newData = users.map((da) => {
    return {
      ...da,
      id: da._id,
    };
  });

  const [isHimself, setIsHimself] = React.useState(false);

  const openDeleteModal = (user: User) => {
    setPrevData(user as EditUserType);
    const isHimself = loggInData?._id === user._id;
    if (isHimself) {
      setExtraInfo('You are deleting yourself !!');
      setIsHimself(true);
    } else {
      setExtraInfo(null);
      setIsHimself(false);
    }
    onOpen1();
  };
  const router = useRouter();

  const onEdit = (user: any) => {
    console.log('celvAl', user);
    setPrevData(user as EditUserType);
    onOpen();
  };

  const onDelete = async () => {
    setLoading(true);
    try {
      const res = await AuthApi.delete(`/admin/users/delete/${prevData._id}`);
      console.log(res);
      if (res.status === 200) {
        toast({
          description: 'User deleted successfully',
          status: 'success',
        });
        dispatch(removeUser(prevData));
        onClose1();
        if (isHimself) {
          deleteCookie('token');
          router.reload();
        }
      }
    } catch (error: any) {
      console.log(error);
      const mess = error.response?.data?.message ?? 'Something went wrong';
      const notAllowedMess =
        mess === 'Unauthorized' ? 'You are not allowed to perform this action' : mess;
      toast({
        description: notAllowedMess,
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const actionCol: GridColDef = {
    field: 'Actions',
    width: 200,
    renderCell: (celval) => {
      return (
        <div className="flex gap-x-2">
          <button
            onClick={onEdit.bind(null, celval.row)}
            className="bg-secondary-50 text-white px-4 flex items-center gap-x-1 py-2 rounded-md font-medium"
          >
            <PencilSquareIcon className="w-5 h-5" />
            Edit
            {/* <AtomIcon size={15} />PencilIcon */}
          </button>
          <button
            onClick={() => openDeleteModal(celval.row)}
            className="bg-red-500 duration-150 text-white px-2 flex items-center gap-x-2 py-2 rounded-md font-medium"
          >
            <ArchiveBoxXMarkIcon className="w-5 h-5" />
            Delete
            {/* <AtomIcon size={15} /> */}
          </button>
        </div>
      );
    },
  };
  return (
    <>
      <DeleteModal
        isOpen={isOpen1}
        onDelete={onDelete}
        onOpen={onOpen1}
        onClose={onClose1}
        loading={loading}
        extranote={extraInfo}
      />
      <EditUserModal {...{ isOpen, onOpen, onClose, prevData }} closeOnOverlayClick={false} />
      <ThemeProvider theme={theme}>
        <Box sx={{ height: '80vh', width: '100%' }}>
          <DataGrid
            rows={[...newData]}
            columns={[...columns, actionCol]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default UsersTable;
