import AddUserModal from '@/components/home/AddUserModal';
import UsersTable from '@/components/home/UsersTable';
import { setUsers } from '@/redux/slices/user.slice';
import { RootState } from '@/redux/store';
import { AuthApi } from '@/utils/axios.config';
import { useDisclosure } from '@chakra-ui/react';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ControlPanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.user);

  const getUsers = async () => {
    try {
      const res = await AuthApi.get('/admin/users/getAll');
      console.log(res);
      const users = res.data.data.users;
      dispatch(setUsers(users));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <title>Home - InvictusRMF</title>
      </Head>
      <AddUserModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} closeOnOverlayClick={false} />
      <div className=" flex min-h-[84vh] flex-col w-full gap-y-3 p-2 rounded-md border-2">
        <div className="flex w-full justify-between items-center">
          <h1 className=" font-semibold text-lg text-primary">Users</h1>
          <button
            onClick={onOpen}
            className=" bg-secondary hover:bg-primary duration-200 active:bg-primary-50 px-4 items-center flex gap-x-3 uppercase text-white rounded-md py-1.5"
          >
            <UserPlusIcon className="w-6" />
            Add User
          </button>
        </div>
        <UsersTable users={users} />
      </div>
    </>
  );
};

export default ControlPanel;
