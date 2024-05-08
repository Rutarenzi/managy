import React from 'react';
import ModalLayout from '../constants/ModalLayout';
import { AtomIcon } from '../icons';
import { AlertIcon, Button, Spinner, useDisclosure } from '@chakra-ui/react';
import { ArchiveBoxXMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  onDelete: () => Promise<void>;
  loading?: boolean;
  extranote?: string | null;
};
const DeleteModal = ({
  isOpen,
  onClose,
  onOpen,
  closeOnOverlayClick,
  onDelete,
  loading,
  extranote,
}: Props) => {
  const [note, setNote] = React.useState('You are about to delete this item !');
  const [isWarn, setIsWarn] = React.useState(false);

  const onWarn = () => {
    setNote(extranote ?? 'Are you sure you want to delete this item?');
    setIsWarn(true);
  };

  const handleClose = () => {
    setNote('You are about to delete this item !');
    setIsWarn(false);
    onClose();
  };

  const handleDelete = async () => {
    await onDelete();
    handleClose();
  };

  return (
    <ModalLayout {...{ isOpen, onClose: handleClose, onOpen, closeOnOverlayClick }}>
      <div className="flex flex-col gap-y-6 p-3 pb-5">
        <h1 className=" font-medium text-lg">Delete</h1>
        <p className={`font-semibold flex gap-3 ${isWarn ? 'text-red-500' : ''}`}>
          <ExclamationTriangleIcon className="w-6 text-red-500" />
          {note}
        </p>
        <div className="flex w-full justify-between">
          <Button onClick={handleClose} color={'red.500'}>
            Cancel
          </Button>
          <button
            onClick={isWarn ? handleDelete : onWarn}
            disabled={loading}
            className="hover:bg-red-500 hover:text-white text-red-500 border-2 border-red-500 w-fit px-2 flex items-center gap-x-2 py-2 rounded-md font-medium"
          >
            {loading ? (
              <Spinner size="sm" />
            ) : (
              <>
                <ArchiveBoxXMarkIcon className="w-5 h-5" />
                {isWarn ? 'Confirm' : 'Delete'}
                {/* <AtomIcon size={15} /> */}
              </>
            )}
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default DeleteModal;
