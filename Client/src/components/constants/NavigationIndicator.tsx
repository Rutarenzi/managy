import React, { useEffect } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { camelToNormal } from '@/utils/funcs';

const NavigationIndicator = () => {
  const router = useRouter();
  const [paths, setPaths] = React.useState<string[]>([]);

  const removeQueries = (path: string) => {
    const queryIndex = path.indexOf('?');
    if (queryIndex !== -1) {
      return path.slice(0, queryIndex);
    }
    return path;
  };

  useEffect(() => {
    const rPath = removeQueries(router.asPath);
    const path = rPath.split('/');
    setPaths(path);
  }, [router]);
  return (
    <div className=" w-full flex items-center gap-x-2">
      {paths.map((path, index) => (
        <div
          key={index}
          className={`flex items-center gap-x-2 ${
            index === paths.length - 1 ? 'text-primary font-semibold' : 'text-gray-500'
          }`}
        >
          <Link href={paths.slice(0, index + 1).join('/')} className=" capitalize">
            {camelToNormal(path)}
          </Link>
          {index !== paths.length - 1 && index > 0 && <ChevronRightIcon className="w-4 h-4" />}
        </div>
      ))}
    </div>
  );
};

export default NavigationIndicator;
