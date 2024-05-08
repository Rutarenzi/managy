import React from 'react';
import Image from 'next/image';
import { useDisclosure } from '@chakra-ui/react';
import { Bars3Icon, CircleStackIcon, UserIcon } from '@heroicons/react/24/outline';
import SideBarDrawer from './SideBarDrawer';
import Link from 'next/link';
import { BagIcon, PackageIcon, SlidersIcon } from '../icons';
import { useRouter } from 'next/router';
import { sideFooterLinks, sideMainLinks } from './links';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pathname, setPathname] = React.useState('');
  const { loggInData } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  React.useEffect(() => {
    setPathname(router.pathname);
  }, [router.pathname]);
  return (
    <>
      <Bars3Icon
        className="w-6 cursor-pointer z-[51] xtab:hidden text-white absolute top-4 left-2"
        onClick={onOpen}
      />
      <SideBarDrawer pathname={pathname} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <div className=" w-[250px] xtab:flex justify-between hidden flex-col p-4 py-9 bg-primary text-white fixed top-0 left-0 h-screen">
        <div className="flex w-full flex-col">
          <Link href={'/'} className="flex w-fit items-center">
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
          </Link>
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
        <div className="flex flex-col gap-y-3 w-full">
          {sideFooterLinks.map((link, i) => {
            return (
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
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SideBar;
