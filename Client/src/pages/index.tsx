import Head from 'next/head';
import { Page } from '@/@types';
import ModuleCard from '@/components/constants/ModuleCard';
import { ReferenceDataModules } from '@/lib/data';

const Home: Page = () => {
  return (
    <>
      <div className=" flex flex-col w-full gap-y-3 p-2 rounded-md border-2">
        <h1 className=" font-semibold text-lg text-primary">Assests</h1>
        <div className=" gap-3 flex flex-wrap w-full">
          {ReferenceDataModules.map((module, i) => (
            <ModuleCard key={i} to={`/asset${module.link}`} name="Module Name" />
          ))}
        </div>
      </div>
    </>
  );
};

Home.metadata = {
  title: 'Home - InvictusRMF',
  description: 'InvictusRMF is a website that provides information about the InvictusRMF project.',
};
Home.titleName = 'Admin Control Panel';
export default Home;
