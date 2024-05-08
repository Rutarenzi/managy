import {
  useDisclosure,
  Input,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/react';
import { CircleStackIcon, UserIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { SlidersIcon, PackageIcon, BagIcon } from '../icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { sideFooterLinks, sideMainLinks } from './links';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  pathname: string;
};

const SideBarDrawer = ({ isOpen, pathname, onClose }: Props) => {
  const { loggInData } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    console.log(pathname);
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent backgroundColor="#04244A" className="" color="white">
        <DrawerCloseButton />
        <DrawerHeader>
          <div className="flex w-full items-center">
            <Image
              className=" rounded-full bg-white aspect-square object-cover"
              src="/logo.svg"
              width={50}
              style={{
                boxShadow: '0px 0px 44px 5px rgba(0, 117, 255, 0.57)',
              }}
              height={50}
              alt="Invictus"
            />
            <h1 className="text-2xl font-bold ml-2">RMF</h1>
          </div>
        </DrawerHeader>
        <DrawerBody>
          <div className="flex w-full flex-col">
            <div className="flex flex-col mt-24 gap-y-3">
              {sideMainLinks.map((link, i) => {
                if (loggInData?.role !== 'ADMIN' && link.isForAdmin) return null;
                const isIndexPage = link.path === '/';
                const isOtherActive = pathname.startsWith(link.path) && !isIndexPage;
                let isActive;
                if (isIndexPage) {
                  isActive = pathname === '/';
                } else {
                  isActive = isOtherActive;
                }
                return (
                  <Link
                    key={i}
                    href={link.path}
                    className={`flex items-center 
                ${isActive ? 'bg-secondary' : ''}
                 rounded-md py-2 px-3 hover:bg-secondary duration-200`}
                  >
                    {link.icon}
                    <h1 className="ml-2">{link.name}</h1>
                  </Link>
                );
              })}
            </div>
          </div>
        </DrawerBody>

        <DrawerFooter color="white">
          <div className="flex flex-col gap-y-3 w-full">
            {sideFooterLinks.map((link, i) => (
              <Link
                key={i}
                href={link.path}
                className={`flex items-center
              ${pathname === link.path ? 'bg-secondary' : ''}
                rounded-md py-2 px-3 hover:bg-secondary duration-200`}
              >
                {link.icon}
                <h1 className="ml-2">{link.name}</h1>
              </Link>
            ))}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SideBarDrawer;
