import React from 'react';
import ModalLayout from '../constants/ModalLayout';
import { AtomIcon } from '../icons';
import { Input, Textarea } from '@chakra-ui/react';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
};
const EditModal = ({ isOpen, onOpen, onClose, closeOnOverlayClick }: Props) => {
  return (
    <ModalLayout {...{ isOpen, onClose, onOpen, closeOnOverlayClick }}>
      <form className="flex flex-col gap-y-6 p-3 pb-5">
        <h1 className=" font-medium text-lg">Edit</h1>
        <Input placeholder="Name" />
        <Input placeholder="Location" />
        <Input placeholder="Link" />
        <Textarea placeholder="Description" />
        <button className="hover:bg-secondary-50 hover:text-white text-secondary-50 border-2 border-secondary-50 w-fit px-2 flex items-center gap-x-2 py-2 rounded-md font-medium">
          <AtomIcon size={15} />
          Update
          <AtomIcon size={15} />
        </button>
      </form>
    </ModalLayout>
  );
};

export default EditModal;
