import ModalLayout from '@/components/constants/ModalLayout';
import { Button, Flex } from '@chakra-ui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface DeleteModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  closeOnOverlayClick: boolean;
  onConfirm?: () => void;
}

const DeleteModal = ({
  isOpen,
  closeOnOverlayClick,
  onClose,
  onOpen,
  onConfirm,
}: DeleteModalProps) => {
  return (
    <ModalLayout {...{ isOpen, onOpen, onClose, closeOnOverlayClick: true }}>
      <Flex flexDirection={'column'} gap={4} px={2} py={4}>
        <h1 className=" font-medium text-lg">Delete</h1>
        <Flex alignItems={'center'} gap={2}>
          <ExclamationTriangleIcon className="w-6 text-red-500" />
          <p className="font-semibold flex gap-3">Are you sure you want to delete this item?</p>
        </Flex>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Button onClick={onClose} color={'red.500'}>
            Cancel
          </Button>
          <Button colorScheme="red" variant={'outline'} onClick={onConfirm ?? onClose}>
            DELETE
          </Button>
        </Flex>
      </Flex>
    </ModalLayout>
  );
};

export default DeleteModal;
