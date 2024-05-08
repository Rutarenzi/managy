import { Metadata, NextPage } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';
import { Page } from '@/@types';
import { Grid } from '@chakra-ui/react';
import ModuleCard from '@/components/constants/ModuleCard';
import { ReferenceDataModules } from '@/lib/data';
import { assetRoutes } from '@/components/constants/links';
import { camelToNormal } from '@/utils/funcs';
import { CubeIcon, DocumentChartBarIcon } from '@heroicons/react/24/outline';

const Asset: Page = () => {
  return (
    <>
      <Head>
        <title>Asset Management - InvictusRMF</title>
      </Head>
      <div className=" flex flex-col w-full gap-y-3 p-2 rounded-md border-2">
        <h1 className=" font-semibold text-lg text-primary">Assets</h1>
        <div className=" gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full">
          {Object.keys(assetRoutes).map((module: string, i: number) => (
            <ModuleCard
              key={i}
              to={`/asset/${module}`}
              name={camelToNormal(module)}
              icon={<CubeIcon className="w-20 h-20" />}
            />
          ))}
          <ModuleCard
            to={`/asset/report`}
            name={camelToNormal('asset report')}
            icon={<DocumentChartBarIcon className="w-20 h-20" />}
          />
        </div>
      </div>
    </>
  );
};

Asset.metadata = {
  title: 'Asset Management - InvictusRMF',
  description: 'InvictusRMF is a website that provides information about the InvictusRMF project.',
};
Asset.titleName = 'Asset Management';
export default Asset;
