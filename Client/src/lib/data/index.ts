import { ModuleLink } from '@/@types';

export const ReferenceDataModules: ModuleLink[] = [
  {
    name: 'Asset Maintenance Levels',
    link: '/assetMaintenanceLevels',
  },
  {
    name: 'Asset Categories',
    link: '/assetMaintenanceLevels',
  },
  {
    name: 'Asset Conditions',
    link: '/assetConditions',
  },
  {
    name: 'Asset Functional Locations',
    link: '/assetFunctionalLocations',
  },
  {
    name: 'Asset Item Reference',
    link: '/assetReferenceItem',
  },
  {
    name: 'Asset Service Status',
    link: '/assetServiceStatus',
  },
];

export const Notifications: { value: string; date: Date | number }[] = [
  {
    value: '5 assets have been added to the inventory',
    date: 1682672950000,
  },
];
