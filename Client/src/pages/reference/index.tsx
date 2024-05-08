import { Metadata, NextPage } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';
import { Page } from '@/@types';
import { Grid } from '@chakra-ui/react';
import ModuleCard from '@/components/constants/ModuleCard';
import { ReferenceDataModules } from '@/lib/data';
import { referenceRoutes } from '@/components/constants/links';
import { camelToNormal } from '@/utils/funcs';

const Reference: Page = () => {
  return (
    <>
      <Head>
        <title>Reference data - InvictusRMF</title>
      </Head>
      <div className=" flex flex-col w-full gap-y-3 p-2 rounded-md border-2">
        <h1 className=" font-semibold text-lg text-primary">Reference Data</h1>
        <div className=" gap-3 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-full">
          {Object.keys(referenceRoutes).map((module: string, i: number) => (
            <ModuleCard key={i} to={`/reference/${module}`} name={camelToNormal(module)} />
          ))}
        </div>
      </div>
      {/* <div className=" flex flex-col w-full gap-y-3 p-2 rounded-md border-2">
        <h1 className=" font-semibold text-xl text-primary">Stock</h1>
        <div className=" gap-3 grid grid-cols-5 w-full">
          {ReferenceDataModules.map((module, key) => (
            <ModuleCard key={key} to={`/reference${module.link}`} name={module.name} />
          ))}
        </div>
      </div>
      <div className=" flex flex-col w-full gap-y-3 p-2 rounded-md border-2">
        <h1 className=" font-semibold text-xl text-primary">Others</h1>
        <div className=" gap-3 grid grid-cols-5 w-full">
          {ReferenceDataModules.map((module, key) => (
            <ModuleCard key={key} to={`/reference${module.link}`} name={module.name} />
          ))}
        </div>
      </div> */}
    </>
  );
};

Reference.metadata = {
  title: 'Reference data - InvictusRMF',
  description: 'InvictusRMF is a website that provides information about the InvictusRMF project.',
};
Reference.titleName = 'Reference Data';
export default Reference;
