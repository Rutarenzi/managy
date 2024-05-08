import React, { useState } from 'react';
import ModalLayout from '../constants/ModalLayout';
import { EyeIcon as ViewIcon, EyeSlashIcon as ViewOffIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { AuthApi } from '@/utils/axios.config';
import { useDispatch } from 'react-redux';
import { addUser } from '@/redux/slices/user.slice';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
};
const AddUserModal = ({ isOpen, onOpen, onClose, closeOnOverlayClick }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    role: 'USER',
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await AuthApi.post('/admin/users/create', data);
      console.log(res);
      if (res.status === 200) {
        toast({
          description: 'User created successfully',
          status: 'success',
        });
        dispatch(addUser(res.data.data.user));
        onClose();
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

  return (
    <ModalLayout {...{ isOpen, onClose, onOpen, closeOnOverlayClick }}>
      <form onSubmit={handleAddUser} className="flex flex-col gap-y-4 p-3 pb-5">
        <h1 className=" font-medium text-lg">Add User</h1>
        <div className="flex flex-col w-full gap-y-1">
          <label>FirstName</label>
          <Input
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
            placeholder="FirstName"
            required
          />
        </div>
        <div className="flex flex-col w-full gap-y-1">
          <label>LastName</label>
          <Input
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
            placeholder="LastName"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col w-full gap-y-1">
          <label>Email</label>
          <Input
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="email"
            type="email"
            required
          />
        </div>
        <label>Role</label>
        <Select
          onChange={(e) => setData({ ...data, role: e.target.value })}
          placeholder="Select Role..."
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </Select>
        <label>Password</label>
        <InputGroup>
          <Input
            _placeholder={{ opacity: 1, color: 'gray.500' }}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type={showPassword ? 'text' : 'password'}
            required
          />
          <InputRightElement h={'full'}>
            <Button
              variant={'ghost'}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? (
                <ViewIcon
                  style={{
                    transform: 'scale(2)',
                  }}
                />
              ) : (
                <ViewOffIcon
                  style={{
                    transform: 'scale(2)',
                  }}
                />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
        <div className="flex justify-between items-center">
          <Button onClick={onClose} color={'red.500'}>
            Cancel
          </Button>
          <button
            // onClick={handleAddUser}
            type="submit"
            disabled={loading}
            className=" bg-secondary hover:bg-primary duration-200 active:bg-primary-50 px-4 items-center flex gap-x-3 uppercase text-white rounded-md py-1.5"
          >
            {loading ? <Spinner /> : ' Add User'}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default AddUserModal;
