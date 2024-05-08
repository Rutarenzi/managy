import React from 'react';
import Cookie from 'js-cookie';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { BellIcon, UserCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Notifications } from '@/lib/data';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import { deleteAllCookies, deleteCookie } from '@/utils/cookies';
import useMuiChakraTheme from '@/utils/hooks/useMuiChakraTheme';

const NavBar = ({ titleName }: { titleName: string }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loggInData } = useSelector((state: RootState) => state.user);
  const { setIndexMui } = useMuiChakraTheme();

  const logout = () => {
    // deleteCookie('token');
    Cookie.remove('token');
    window.location.reload();
  };

  const handleClose = () => {
    setIndexMui(0);
    onClose();
  };

  const handleOpen = () => {
    setIndexMui(-1);
    onOpen();
  };
  return (
    <Flex
      width="full"
      position="sticky"
      justifyContent=" space-between"
      p="2"
      zIndex={50}
      className="top-0 text-white items-center bg-primary"
    >
      <span className=" text-lg font-semibold max-w-[150px] truncate xtab:ml-0 sm:ml-11 ml-8 xs:max-w-none">
        {titleName}
      </span>
      <div className=" flex items-center gap-x-4 text-black">
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                aria-label="User Options"
                className={`${isOpen ? 'bg-primary-50' : 'bg-transparent'} hover:bg-primary-50`}
                px={4}
                py={1}
                rounded={'full'}
              >
                <Flex alignItems={'center'} gap={2} className="text-white">
                  <Text className="sm:text-base text-sm xs:flex hidden">{loggInData?.email}</Text>
                  <UserCircleIcon className="w-8 h-8 stroke-white" />
                </Flex>
              </MenuButton>
              <MenuList className="">
                <MenuItem onClick={logout}>Log Out</MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
        <div className="flex rounded-full cursor-pointer bg-white aspect-square text-black">
          <Popover {...{ isOpen, onClose: handleClose, onOpen: handleOpen }}>
            <PopoverTrigger>
              <BellIcon className="w-8 p-1" />
            </PopoverTrigger>
            <PopoverContent mr={4} zIndex={999}>
              <Flex flexDirection={'column'} gap={3} p={4}>
                <Heading size={'sm'}>Your Notifications</Heading>
                {[...Notifications, ...Notifications].map((notification, i) => {
                  return (
                    <Flex
                      key={`notification-${i}`}
                      flexDirection={'column'}
                      gap={2}
                      p={2}
                      position={'relative'}
                      className="hover:bg-slate-200 rounded"
                    >
                      <Text>{notification.value}</Text>
                      <Text fontSize={12} color={'gray.400'}>
                        {new Date(notification.date).toString().slice(0, 15)}
                      </Text>
                      <IconButton
                        aria-label="remove notification"
                        icon={<XCircleIcon className="h-6 w-6" />}
                        position={'absolute'}
                        top={-4}
                        right={-4}
                        rounded={'full'}
                      />
                    </Flex>
                  );
                })}
              </Flex>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Flex>
  );
};

export default NavBar;
