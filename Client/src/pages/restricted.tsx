import { Page } from '@/@types';
import { Alert } from '@chakra-ui/react';
import React from 'react';

const RestrictedRoute: Page = () => {
  return (
    <div className="flex w-full flex-col gap-y-4">
      <Alert status="error" className="flex flex-col w-full">
        <p className=" text-center">Restricted Route</p>
        <p className=" text-center">You are not allowed to view this route</p>
      </Alert>
    </div>
  );
};

RestrictedRoute.metadata = {
  title: 'Restricted Route - InvictusRMF',
  description: 'Restricted Route',
};

export default RestrictedRoute;
