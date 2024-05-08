import { Page } from '@/@types';
import React, { useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import moment, { Moment } from 'moment';
import { AuthApi } from '@/utils/axios.config';

const ReportsIndex: Page = () => {
  const [startDate, setStartDate] = useState<Moment>(moment());
  const [endDate, setEndDate] = useState<Moment>(moment());
  const [loading, setLoading] = useState({
    asset: false,
    stock: false,
    status: '',
  });

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(moment(e.target.value));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(moment(e.target.value));
  };

  // get report on backend route /stock/:startDate/:endDate
  const getReport = async (pathName: string) => {
    setLoading({ ...loading, [pathName]: true });
    try {
      const res = await AuthApi.get(`/reports/${pathName}/${startDate}/${endDate}`);
      console.table(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading({ ...loading, [pathName]: false });
    }
  };

  return (
    <div className=" w-full flex flex-col gap-y-4">
      <h1 className=" font-medium text-lg">Assets Reports</h1>
      <div className="flex font-medium w-full flex-col gap-y-5 p-4 rounded-md border-2">
        <h1>Assets Reports generator</h1>
        <div className="flex gap-5">
          <div className="flex flex-col gap-y-4">
            <h1>Select the beginning date</h1>
            <Input
              type="date"
              className=" cursor-pointer"
              onChange={handleStartDateChange}
              placeholder="Select the beginning date"
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <h1>Select the ending date</h1>
            <Input
              type="date"
              className=" cursor-pointer"
              onChange={handleEndDateChange}
              placeholder="Select the beginning date"
            />
          </div>
        </div>
        <Button
          colorScheme="blue"
          onClick={() => getReport('asset')}
          w={'fit-content'}
          className=" bg-secondary-50"
          disabled={loading.asset}
        >
          {loading.asset ? 'Generating Report...' : 'Generate Report'}
        </Button>
      </div>
      <h1 className=" font-medium text-lg">Stock Reports</h1>
      <div className="flex font-medium w-full flex-col gap-y-5 p-4 rounded-md border-2">
        <h1>Stock Reports generator</h1>
        <div className="flex gap-5">
          <div className="flex flex-col gap-y-4">
            <h1>Select the beginning date</h1>
            <Input
              type="date"
              className=" cursor-pointer"
              onChange={handleStartDateChange}
              placeholder="Select the beginning date"
            />
          </div>
          <div className="flex flex-col gap-y-4">
            <h1>Select the ending date</h1>
            <Input
              type="date"
              className=" cursor-pointer"
              onChange={handleEndDateChange}
              placeholder="Select the beginning date"
            />
          </div>
        </div>
        <Button
          colorScheme="blue"
          onClick={() => getReport('stock')}
          w={'fit-content'}
          className=" bg-secondary-50"
          disabled={loading.stock}
        >
          {loading.stock ? 'Generating Report...' : 'Generate Report'}
        </Button>
      </div>
    </div>
  );
};

ReportsIndex.metadata = {
  title: 'Reports - Invictus RMF',
  description: 'Reports - Invictus RMF',
};

ReportsIndex.titleName = 'Reports';

export default ReportsIndex;
