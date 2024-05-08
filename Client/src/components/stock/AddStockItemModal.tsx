import { Button, Input, Select, Spinner, Switch, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import ModalLayout from '../constants/ModalLayout';
import { addUser } from '@/redux/slices/user.slice';
import { AuthApi } from '@/utils/axios.config';
import { useDispatch } from 'react-redux';
import { FormInfo } from '@/@types/types1';
import { CustomSelect } from '../reference/DynamicForm';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  formInfo: FormInfo;
  data: any;
  setData: any;
  loading: boolean;
  setLoading: any;
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  otherTitle?: string;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddStockItemModal = ({
  isOpen,
  onOpen,
  onClose,
  closeOnOverlayClick,
  formInfo,
  data,
  setData,
  submitHandler,
  loading,
  otherTitle,
  setEditMode,
}: Props) => {
  const handleClose = () => {
    setData({});
    setEditMode(false);
    onClose();
  };
  return (
    <ModalLayout {...{ isOpen, onClose: handleClose, onOpen, closeOnOverlayClick }}>
      <form onSubmit={submitHandler} className="flex flex-col gap-y-4 py-3 pb-5">
        <h1 className=" font-medium text-lg">{otherTitle ?? formInfo.title}</h1>
        <div className="flex flex-col w-full gap-y-3 max-h-[70vh] overflow-y-auto">
          {formInfo.fields.map((field) => {
            switch (field.type) {
              case 'select':
                const selectdata = field.options?.map((el) => el.value);
                return (
                  <div className="flex w-full flex-col">
                    {<label className="p-1 text-primary font-medium">{field.placeholder}:</label>}
                    <CustomSelect
                      data={selectdata}
                      dataFromURL={field.dataUrl}
                      placeholder={field.placeholder}
                      key={field.name}
                      no_ref={true}
                      onChange={(e) => {
                        console.log('value', e.target.value);
                        setData({ ...data, [field.name]: e.target.value });
                      }}
                    />
                  </div>
                );
              case 'boolean':
                return (
                  <div className="flex w-full flex-col">
                    {<label className="p-1 text-primary font-medium">{field.placeholder}:</label>}
                    <div className="flex items-center gap-x-3">
                      <span>No</span>
                      <Switch
                        key={field.name}
                        name={field.name}
                        isChecked={data[field?.name] ?? false}
                        onChange={(e) => setData({ ...data, [field.name]: e.target.checked })}
                      />
                      <span>Yes</span>
                    </div>
                  </div>
                );
              default:
                return (
                  <div className="flex w-full flex-col">
                    {<label className="p-1 text-primary font-medium">{field.placeholder}:</label>}
                    <Input
                      key={field.name}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={data[field.name] ?? ''}
                      onChange={(e) => setData({ ...data, [field.name]: e.target.value })}
                      required={field.required ?? true}
                    />
                  </div>
                );
            }
          })}
        </div>
        <div className="flex justify-between items-center">
          <Button onClick={handleClose} color={'red.500'}>
            Cancel
          </Button>
          <button
            // onClick={handleAddUser}
            type="submit"
            disabled={loading}
            className=" bg-secondary hover:bg-primary duration-200 active:bg-primary-50 px-4 items-center flex gap-x-3 uppercase text-white rounded-md py-1.5"
          >
            {loading ? <Spinner /> : ' Save Item'}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default AddStockItemModal;
