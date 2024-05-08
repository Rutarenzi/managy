import Head from 'next/head';
import { Page } from '@/@types';
import ModuleCard from '@/components/constants/ModuleCard';
import { RequestIcon } from '@/components/icons';
import {
  ArrowsUpDownIcon,
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  FolderOpenIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline';
import { FilePresentOutlined } from '@mui/icons-material';

const Stock: Page = () => {
  return (
    <>
      <Head>
        <title>Stock Management - InvictusRMF</title>
      </Head>
      <div className=" flex flex-col min-h-[85vh] w-full gap-y-3 p-2 rounded-md border-2">
        <h1 className=" font-semibold text-lg text-primary">Stock Actions</h1>
        <div className="w-full grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-6 gap-y-4">
          {/* <ModuleCard name="All Stock Items" to="/stock/stock-items" /> */}
          <ModuleCard icon={<RequestIcon />} name="Requested Stock Items" to="/stock/requested" />
          <ModuleCard
            icon={<DocumentArrowDownIcon className="w-11" />}
            name="Incoming Stock Items"
            to={`/stock/incomming`}
          />
          <ModuleCard
            icon={<FilePresentOutlined fontSize="inherit" />}
            name="receivableNotes"
            to={`/stock/received-notes`}
          />
          <ModuleCard
            icon={<DocumentArrowUpIcon className="w-11" />}
            name="Outgoing Stock"
            to={`/stock/outgoing`}
          />
          <ModuleCard
            icon={<ArrowsUpDownIcon className="w-11" />}
            name="Stock Movements"
            to={`/stock/movements`}
          />
          <ModuleCard
            icon={<FolderOpenIcon className="w-11" />}
            name="Opening Stock"
            to={`/stock/opening`}
          />
          <ModuleCard
            icon={<NewspaperIcon className="w-11" />}
            name="Stock Reports"
            to={`/stock/reports`}
          />
        </div>
      </div>
    </>
  );
};

Stock.metadata = {
  title: 'Stock Management - InvictusRMF',
  description: 'InvictusRMF is a website that provides information about the InvictusRMF project.',
};
Stock.titleName = 'Stock Management';
export default Stock;
