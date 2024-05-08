import React from 'react';
import { Metadata } from 'next';
import Head from 'next/head';
import SideBar from '@/components/constants/SideBar';
import NavBar from '@/components/constants/NavBar';
import NavigationIndicator from '@/components/constants/NavigationIndicator';

type MainLayoutProps = {
  children: React.ReactNode;
  title?: string;
  metadata?: Metadata;
  titleName?: string;
  titleNameShown?: boolean;
};

const MainLayout = ({ children, metadata, title, titleName, titleNameShown }: MainLayoutProps) => {
  console.log({ titleNameShown, titleName });
  return (
    <>
      <Head>
        <title>{(title || (metadata?.title as string)) ?? 'InvictusRMF'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/logo.svg" type="image/x-icon" />
        <meta name="description" content={metadata?.description ?? ''} />
        <meta name="keywords" content={metadata?.keywords as string} />
        {/* og */}
        <meta property="og:title" content={metadata?.title as string} />
        <meta property="og:description" content={metadata?.description as string} />
        <meta property="og:image" content={metadata?.openGraph?.images! as string} />
        <meta property="og:url" content={metadata?.openGraph?.url as string} />
      </Head>
      <main className="font-sans overflow-y-auto flex w-full flex-col h-screen flex-1 xtab:pl-[250px]">
        <SideBar />
        <div className=" flex-1 h-full items-center w-full flex flex-col">
          <NavBar titleName={titleName ?? 'Invictus RMF'} />
          <div className="flex flex-col w-full gap-y-3 py-3 px-[2%]">
            {/* NavigationIndicator*/}
            <NavigationIndicator />
            {/* {titleNameShown && <h1 className="text-xl text-primary font-semibold">{titleName}</h1>} */}
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default MainLayout;
