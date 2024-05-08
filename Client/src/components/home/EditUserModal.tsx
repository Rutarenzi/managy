import React, { useEffect, useState } from 'react';
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
import { User } from '@/@types';
import { updateUser } from '@/redux/slices/user.slice';
import { useDispatch } from 'react-redux';

export type EditUserType = User & { password: string };

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  prevData: EditUserType;
};
const EditUserModal = ({ isOpen, onOpen, onClose, closeOnOverlayClick, prevData }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    // password: '',
    role: 'USER',
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleEditUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await AuthApi.patch(`/admin/users/update/${prevData._id}`, data);
      console.log(res);
      if (res.status === 200) {
        toast({
          description: 'User updated successfully',
          status: 'success',
        });
        dispatch(updateUser(res.data.data.user));
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

  useEffect(() => {
    setData({
      email: prevData.email,
      firstName: prevData.firstName,
      lastName: prevData.lastName,
      // password: prevData.password,
      role: prevData.role as string,
    });
  }, [prevData]);

  return (
    <ModalLayout {...{ isOpen, onClose, onOpen, closeOnOverlayClick }}>
      <form onSubmit={handleEditUser} className="flex flex-col gap-y-4 p-3 pb-5">
        <h1 className=" font-medium text-lg">Edit User</h1>
        <div className="flex flex-col w-full gap-y-1">
          <label>FirstName</label>
          <Input
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
            placeholder="FirstName"
            value={data.firstName}
            required
          />
        </div>
        <div className="flex flex-col w-full gap-y-1">
          <label>LastName</label>
          <Input
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
            placeholder="LastName"
            value={data.lastName}
            required
          />
        </div>
        <div className="flex flex-col w-full gap-y-1">
          <label>Email</label>
          <Input
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="email"
            type="email"
            value={data.email}
            required
          />
        </div>
        <label>Role</label>
        <Select
          onChange={(e) => setData({ ...data, role: e.target.value })}
          placeholder="Select Role..."
          value={data.role}
          required
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </Select>
        <label>Password</label>
        {/* <InputGroup>
          <Input
            _placeholder={{ opacity: 1, color: 'gray.500' }}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={data.password}
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
        </InputGroup> */}
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
            {loading ? <Spinner /> : ' Save Changes'}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default EditUserModal;
