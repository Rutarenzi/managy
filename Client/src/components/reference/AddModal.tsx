import ModalLayout from '@/components/constants/ModalLayout';

interface AddModalProps {
  children: JSX.Element | JSX.Element[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  closeOnOverlayClick: boolean;
}

const AddModal = ({ children, isOpen, closeOnOverlayClick, onClose, onOpen }: AddModalProps) => {
  return (
    <ModalLayout {...{ isOpen, onOpen, onClose, closeOnOverlayClick: true }}>
      {children}
    </ModalLayout>
  );
};

export default AddModal;
