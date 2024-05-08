import { CircleStackIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';

interface Props {
  name?: string;
  to: string;
  icon?: React.ReactNode;
}

const ModuleCard = ({ name, to, icon }: Props) => {
  return (
    <Link
      href={to}
      className="border-2 mx-auto  w-full items-center justify-center max-w-[300px] h-[180px]  flex flex-col gap-y-3 p-3 rounded-xl"
    >
      <span className=" text-6xl">
        {icon ?? <CircleStackIcon className="w-20 h-20 text-primary" />}
      </span>
      <h1 className="text-center text-lg  mt-5">{name ?? 'Module Name'}</h1>
    </Link>
  );
};

export default ModuleCard;
