import React from 'react';
import { IncommingReq, ReceivableNotes, StockRequest } from '@/@types';
import { ArchiveBoxXMarkIcon, CheckBadgeIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useMuiChakraTheme from '@/utils/hooks/useMuiChakraTheme';
import { useAuth } from '@/contexts/AuthProvider';
import DeleteModal from '../home/DeleteModal';
import { useDisclosure } from '@chakra-ui/react';
import { IStockMovement, OpeningStock, OutgoingRequest, StockItemReference } from '@/@types/types2';

const theme = createTheme({});

type TableProps = {
  stockData:
    | StockRequest[]
    | IncommingReq[]
    | ReceivableNotes[]
    | OutgoingRequest[]
    | IStockMovement[]
    | OpeningStock[]
    | StockItemReference[];
  columns: GridColDef[];
  actionsEl?: React.ReactNode;
  onEdit?: (obj: any) => void;
  onDelete?: (obj: any, closeHandler?: any) => void;
  isApprove?: boolean;
  loading?: boolean;
  extraInfo?: string;
  resetFn?: () => void;
  setEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
};

const StockTable = ({
  stockData,
  columns,
  onDelete,
  onEdit,
  isApprove,
  loading,
  extraInfo,
  resetFn,
  setEditMode,
}: TableProps) => {
  const { muiIndex } = useMuiChakraTheme();
  const { isAdmin } = useAuth();
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
  const [toDelete, setToDelete] = React.useState(null);
  const router = useRouter();

  const newData = stockData.map((da) => {
    return {
      ...da,
      id: da._id,
    };
  });

  const handleClose = () => {
    onClose1();
    resetFn?.();
    setEditMode?.(false);
  };

  const handleItemDelete = (obj: any) => {
    console.log('obj', obj);
    setToDelete(obj);
    onOpen1();
  };

  const actionCol: GridColDef = {
    field: 'Actions',
    width: 250,
    renderCell: (celval) => {
      return (
        <div className="flex gap-x-2">
          {isAdmin && isApprove ? (
            // !celval?.row?.isApproved ? (
            <button
              onClick={onEdit?.bind(null, celval.row)}
              disabled={celval.row?.isApproved}
              className="bg-green-500 text-white px-4 flex items-center gap-x-1 py-2 rounded-md font-medium"
            >
              <CheckBadgeIcon className="w-5 h-5" />
              {celval.row?.isApproved ? 'Approved' : 'Approve'}
            </button>
          ) : (
            // ) : (
            //   <div className=""></div>
            // )
            <button
              onClick={onEdit?.bind(null, celval.row)}
              className="bg-secondary-50 text-white px-4 flex items-center gap-x-1 py-2 rounded-md font-medium"
            >
              <PencilSquareIcon className="w-5 h-5" />
              Edit
            </button>
          )}
          <button
            onClick={() => handleItemDelete(celval.row)}
            className="bg-red-500 duration-150 text-white px-2 flex items-center gap-x-2 py-2 rounded-md font-medium"
          >
            <ArchiveBoxXMarkIcon className="w-5 h-5" />
            Delete
          </button>
        </div>
      );
    },
  };
  return (
    <>
      <DeleteModal
        isOpen={isOpen1}
        onDelete={onDelete?.bind(null, toDelete, onClose1) as any}
        onOpen={onOpen1}
        onClose={handleClose}
        loading={loading}
        extranote={extraInfo}
      />
      <ThemeProvider theme={theme}>
        <Box sx={{ height: '80vh', width: '100%', zIndex: muiIndex }}>
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
            getCellClassName={(params) => {
              if (params.field === 'name') {
                return 'custom-cell';
              }
              return '';
            }}
            sx={{
              '& .MuiDataGrid-cell': {
                whiteSpace: 'normal !important',
                wordBreak: 'break-word',
              },
            }}
          />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default StockTable;
