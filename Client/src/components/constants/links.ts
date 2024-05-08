import React from 'react';
import { BagIcon, PackageIcon, SlidersIcon } from '../icons';
import {
  CircleStackIcon,
  Cog6ToothIcon,
  HomeIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline';
import { DynamicLink } from '@/@types/types1';

export const sideMainLinks = [
  // {
  //   name: 'Home',
  //   path: '/',
  //   icon: React.createElement(HomeIcon, { className: 'w-6' }),
  //   isForAdmin: false,
  // },
  {
    name: 'Control Panel',
    path: '/admin/control-panel',
    icon: React.createElement(SlidersIcon, { size: 23 }),
    isForAdmin: true,
  },
  {
    name: 'Reference Data',
    path: '/reference',
    icon: React.createElement(CircleStackIcon, { className: 'w-6' }),
    isForAdmin: false,
  },
  {
    name: 'Asset Management',
    path: '/asset',
    icon: React.createElement(PackageIcon, { size: 24 }),
    isForAdmin: false,
  },
  {
    name: 'Stock Management',
    path: '/stock',
    icon: React.createElement(BagIcon, { size: 23 }),
    isForAdmin: false,
  },
  // {
  //   name: 'Reports',
  //   path: '/reports',
  //   icon: React.createElement(NewspaperIcon, { className: 'w-6' }),
  //   isForAdmin: false,
  // },
];

export const sideFooterLinks = [
  {
    name: 'Profile',
    path: '/profile',
    icon: React.createElement(SlidersIcon, { size: 23 }),
    isForAdmin: false,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: React.createElement(Cog6ToothIcon, { className: 'w-6' }),
    isForAdmin: false,
  },
];

export const referenceRoutes: DynamicLink = {
  assetConditions: {
    add: '/admin/assetConditions/create',
    update: '/admin/assetConditions/update',
    getAll: '/admin/assetConditions/getAll',
    delete: '/admin/assetConditions/delete',
    schema: [
      {
        title: 'name',
        type: 'string',
      },
    ],
  },
  assetFunctionalLocations: {
    add: '/admin/assetFunctionalLocations/create',
    update: '/admin/assetFunctionalLocations/update',
    getAll: '/admin/assetFunctionalLocations/getAll',
    delete: '/admin/assetFunctionalLocations/delete',
    schema: [
      {
        title: 'name',
        type: 'string',
      },
      {
        title: 'description',
        type: 'long_string',
      },
      {
        title: 'department',
        type: 'select',
        dataFromURL: '/admin/departments/getAll',
      },
      {
        title: 'location',
        type: 'string',
      },
    ],
  },
  assetItemReference: {
    add: '/admin/assetItemReference/create',
    update: '/admin/assetItemReference/update',
    getAll: '/admin/assetItemReference/getAll',
    delete: '/admin/assetItemReference/delete',
    schema: [
      {
        title: 'name',
        type: 'string',
      },
      {
        title: 'assetCategory',
        type: 'select',
        dataFromURL: '/admin/assetCategories/getAll',
      },
    ],
  },
  assetMaintenanceLevels: {
    add: '/admin/assetMaintenanceLevels/create',
    update: '/admin/assetMaintenanceLevels/update',
    getAll: '/admin/assetMaintenanceLevels/getAll',
    delete: '/admin/assetMaintenanceLevels/delete',
    schema: [
      {
        title: 'name',
        type: 'string',
      },
      {
        title: 'description',
        type: 'long_string',
      },
    ],
  },
  assetCategories: {
    add: '/admin/assetCategories/create',
    update: '/admin/assetCategories/update',
    getAll: '/admin/assetCategories/getAll',
    delete: '/admin/assetCategories/delete',
    schema: [
      {
        title: 'name',
        type: 'string',
      },
      {
        title: 'usefulEconomicYears',
        type: 'string',
      },
    ],
  },
  assetServiceStatus: {
    add: '/admin/assetServiceStatus/create',
    update: '/admin/assetServiceStatus/update',
    getAll: '/admin/assetServiceStatus/getAll',
    delete: '/admin/assetServiceStatus/delete',
    schema: [
      {
        title: 'name',
        type: 'string',
      },
    ],
  },
  bankBranches: {
    add: '/admin/bankBranches/create',
    update: '/admin/bankBranches/update',
    getAll: '/admin/bankBranches/getAll',
    delete: '/admin/bankBranches/delete',
    schema: [
      {
        title: 'name',
        type: 'string',
      },
      {
        title: 'bank',
        type: 'select',
        dataFromURL: '/admin/banks/getAll',
      },
    ],
  },
  banks: {
    add: '/admin/banks/create',
    update: '/admin/banks/update',
    getAll: '/admin/banks/getAll',
    delete: '/admin/banks/delete',
    schema: [
      {
        title: 'name',
        type: 'string',
      },
    ],
  },
  departments: {
    add: '/admin/departments/create',
    update: '/admin/departments/update',
    getAll: '/admin/departments/getAll',
    delete: '/admin/departments/delete',
    schema: [
      {
        title: 'name',
        type: 'string',
      },
    ],
  },
  educationalLevels: {
    add: '/admin/educationalLevels/create',
    update: '/admin/educationalLevels/update',
    getAll: '/admin/educationalLevels/getAll',
    delete: '/admin/educationalLevels/delete',
    schema: [
      {
        title: 'name',
        type: 'string',
      },
    ],
  },
  entityInformation: {
    add: '/admin/entityInformation/create',
    update: '/admin/entityInformation/update',
    getAll: '/admin/entityInformation/getAll',
    delete: '/admin/entityInformation/delete',
    schema: [
      {
        title: 'name',
        type: 'string',
      },
      {
        title: 'address',
        type: 'string',
      },
      {
        title: 'telephone',
        type: 'string',
      },
      {
        title: 'email',
        type: 'string',
      },
      {
        title: 'blackListed',
        type: 'boolean',
      },
      {
        title: 'website',
        type: 'string',
      },
      {
        title: 'VATNo',
        type: 'string',
      },
    ],
  },
  fieldsOfStudy: {
    add: '/admin/fieldsOfStudy/create',
    update: '/admin/fieldsOfStudy/update',
    getAll: '/admin/fieldsOfStudy/getAll',
    delete: '/admin/fieldsOfStudy/delete',
    schema: [
      {
        title: 'name',
        type: 'string',
      },
    ],
  },
  identifyDocumentTypes: {
    add: '/admin/identifyDocumentTypes/create',
    update: '/admin/identifyDocumentTypes/update',
    getAll: '/admin/identifyDocumentTypes/getAll',
    delete: '/admin/identifyDocumentTypes/delete',
    schema: [
      {
        title: 'name',
        type: 'string',
      },
    ],
  },
  jobTitles: {
    add: '/admin/jobTitles/create',
    update: '/admin/jobTitles/update',
    getAll: '/admin/jobTitles/getAll',
    delete: '/admin/jobTitles/delete',
    schema: [
      {
        title: 'name',
        type: 'string',
      },
      {
        title: 'staffLevel',
        type: 'select',
        dataFromURL: '/admin/staffLevels/getAll',
      },
    ],
  },
  officeLocations: {
    add: '/admin/officeLocations/create',
    update: '/admin/officeLocations/update',
    getAll: '/admin/officeLocations/getAll',
    delete: '/admin/officeLocations/delete',
    schema: [
      {
        title: 'name',
        type: 'string',
      },
    ],
  },
  staffLevels: {
    add: '/admin/staffLevels/create',
    update: '/admin/staffLevels/update',
    getAll: '/admin/staffLevels/getAll',
    delete: '/admin/staffLevels/delete',
    schema: [
      {
        title: 'name',
        type: 'string',
      },
    ],
  },
  staffMembers: {
    add: '/admin/staffMembers/create',
    update: '/admin/staffMembers/update',
    getAll: '/admin/staffMembers/getAll',
    delete: '/admin/staffMembers/delete',
    schema: [
      {
        title: 'Fname',
        type: 'string',
      },
      {
        title: 'Lname',
        type: 'string',
      },
      {
        title: 'email',
        type: 'string',
      },
      {
        title: 'active',
        type: 'boolean',
      },
      {
        title: 'jobTitle',
        type: 'select',
        dataFromURL: '/admin/jobTitles/getAll',
      },
      {
        title: 'department',
        type: 'select',
        dataFromURL: '/admin/departments/getAll',
      },
      {
        title: 'maritalStatus',
        type: 'select',
        data: ['MARRIED', 'SINGLE', 'DIVORCED', 'WIDOWED'],
      },
    ],
  },
  stockItemCategories: {
    add: '/admin/stockItemCategories/create',
    update: '/admin/stockItemCategories/update',
    getAll: '/admin/stockItemCategories/getAll',
    delete: '/admin/stockItemCategories/delete',
    schema: [
      {
        title: 'name',
        type: 'string',
      },
    ],
  },
  stockItemReference: {
    add: '/admin/stockItemReference/create',
    update: '/admin/stockItemReference/update',
    getAll: '/admin/stockItemReference/getAll',
    delete: '/admin/stockItemReference/delete',
    schema: [
      {
        title: 'name',
        type: 'string',
      },
      {
        title: 'stockItemCategory',
        type: 'select',
        dataFromURL: '/admin/stockItemCategories/getAll',
      },
      {
        title: 'unitOfMeasurement',
        type: 'select',
        dataFromURL: '/admin/unitOfMeasurement/getAll',
      },
      {
        title: 'code',
        type: 'string',
      },
      {
        title: 'minimumStockLevel',
        type: 'number',
      },
      {
        title: 'maximumStockLevel',
        type: 'number',
      },
      {
        title: 'stockAlertLevel',
        type: 'number',
      },
      {
        title: 'isActive',
        type: 'boolean',
      },
    ],
  },
  unitOfMeasurement: {
    add: '/admin/unitOfMeasurement/create',
    update: '/admin/unitOfMeasurement/update',
    getAll: '/admin/unitOfMeasurement/getAll',
    delete: '/admin/unitOfMeasurement/delete',
    schema: [
      {
        title: 'name',
        type: 'string',
      },
      {
        title: 'prefix',
        type: 'string',
      },
    ],
  },
  vendors: {
    add: '/admin/vendors/create',
    update: '/admin/vendors/update',
    getAll: '/admin/vendors/getAll',
    delete: '/admin/vendors/delete',
    schema: [
      {
        title: 'name',
        type: 'string',
      },
      {
        title: 'address',
        type: 'string',
      },
      {
        title: 'email',
        type: 'string',
      },
      {
        title: 'website',
        type: 'string',
      },
      {
        title: 'vatNo',
        type: 'string',
      },
      {
        title: 'isBlackListed',
        type: 'boolean',
      },
    ],
  },
};

export const assetRoutes: DynamicLink = {
  // assetAuditingRecords: {
  //   add: '/admin/assetAuditingRecords/create',
  //   update: '/admin/assetAuditingRecords/update',
  //   getAll: '/admin/assetAuditingRecords/getAll',
  //   delete: '/admin/assetAuditingRecords/delete',
  //   schema: [
  //     {
  //       title: 'asset',
  //       type: 'string',
  //       required: true,
  //     },
  //     {
  //       title: 'destinationOffice',
  //       type: 'string',
  //       required: true,
  //     },
  //     {
  //       title: 'dateOfMovement',
  //       type: 'date',
  //       required: true,
  //     },
  //     {
  //       title: 'movementReason',
  //       type: 'string',
  //       required: true,
  //     },
  //     {
  //       title: 'requestedBy',
  //       type: 'string',
  //       required: true,
  //     },
  //     {
  //       title: 'approvedBy',
  //       type: 'string',
  //       required: true,
  //     },
  //   ],
  // },
  assetCustodyRecords: {
    add: '/assetManagement/assetCustodyRecords/create',
    update: '/assetManagement/assetCustodyRecords/update',
    getAll: '/assetManagement/assetCustodyRecords/getAll',
    delete: '/assetManagement/assetCustodyRecords/delete',
    schema: [
      {
        title: 'assetName',
        type: 'string',
        required: true,
      },
      {
        title: 'custodian',
        type: 'string',
        required: true,
      },
      {
        title: 'issuedBy',
        type: 'string',
        required: true,
      },
      {
        title: 'issuedOn',
        type: 'date',
        required: true,
      },
      {
        title: 'receivedBy',
        type: 'string',
        required: true,
      },
      {
        title: 'returnedBy',
        type: 'string',
        required: false,
      },
      {
        title: 'returnReceivedBy',
        type: 'string',
        required: true,
      },
      {
        title: 'returnedOn',
        type: 'date',
        required: true,
      },
    ],
  },
  assetMaintenanceRecords: {
    add: '/assetManagement/assetMaintenanceRecords/create',
    update: '/assetManagement/assetMaintenanceRecords/update',
    getAll: '/assetManagement/assetMaintenanceRecords/getAll',
    delete: '/assetManagement/assetMaintenanceRecords/delete',
    schema: [
      {
        title: 'asset',
        type: 'string',
        required: true,
      },
      {
        title: 'maintenanceDescription',
        type: 'string',
        required: true,
      },
      {
        title: 'notes',
        type: 'string',
        required: false,
      },
      {
        title: 'maintenancePersonal',
        type: 'date',
        required: true,
      },
      {
        title: 'approvedBy',
        type: 'string',
        required: true,
      },
      {
        title: 'maintenanceCost',
        type: 'string',
        required: false,
      },
      {
        title: 'maintenanceReqNo',
        type: 'string',
        required: true,
      },
      {
        title: 'maintenanceDate',
        type: 'date',
        required: true,
      },
      {
        title: 'maintenanceSupplier',
        type: 'string',
        required: true,
      },
      {
        title: 'maintenanceLevel',
        type: 'number',
        required: true,
      },
    ],
  },
  assetMaintenanceRequests: {
    add: '/assetManagement/assetMaintenanceRequests/create',
    update: '/assetManagement/assetMaintenanceRequests/update',
    getAll: '/assetManagement/assetMaintenanceRequests/getAll',
    delete: '/assetManagement/assetMaintenanceRequests/delete',
    schema: [
      {
        title: 'asset',
        type: 'string',
        required: true,
      },
      {
        title: 'requiredMaintenance',
        type: 'string',
        required: true,
      },
      {
        title: 'requiringStaff',
        type: 'string',
        required: false,
      },
      {
        title: 'maintenanceSupplier',
        type: 'date',
        required: true,
      },
      {
        title: 'preparedBy',
        type: 'string',
        required: true,
      },
      {
        title: 'verifiedBy',
        type: 'string',
        required: true,
      },
      {
        title: 'authorizedBy',
        type: 'string',
        required: true,
      },
      {
        title: 'maintenanceLevel',
        type: 'string',
        required: true,
      },
    ],
  },
  assetMovement: {
    add: '/assetManagement/assetMovement/create',
    update: '/assetManagement/assetMovement/update',
    getAll: '/assetManagement/assetMovement/getAll',
    delete: '/assetManagement/assetMovement/delete',
    schema: [
      {
        title: 'asset',
        type: 'string',
        required: true,
      },
      {
        title: 'destinationOffice',
        type: 'string',
        required: true,
      },
      {
        title: 'dateOfMovement',
        type: 'date',
        required: true,
      },
      {
        title: 'movementReason',
        type: 'string',
        required: true,
      },
      {
        title: 'requestedBy',
        type: 'string',
        required: true,
      },
      {
        title: 'approvedBy',
        type: 'string',
        required: true,
      },
    ],
  },
  assets: {
    add: '/assetManagement/assetRegister/create',
    update: '/assetManagement/assetRegister/update',
    getAll: '/assetManagement/assetRegister/getAll',
    delete: '/assetManagement/assetRegister/delete',
    schema: [
      {
        title: 'department',
        type: 'select_no_ref',
        dataFromURL: '/admin/departments/getAll',
        required: true,
      },
      {
        title: 'functionalLocation',
        type: 'select_no_ref',
        dataFromURL: '/admin/assetFunctionalLocations/getAll',
        required: true,
      },
      {
        title: 'assetCategory',
        type: 'select_no_ref',
        dataFromURL: '/admin/assetCategories/getAll',
        required: true,
      },
      {
        title: 'assetItem',
        type: 'select_no_ref',
        dataFromURL: '/admin/assetItemReference/getAll',
        required: true,
      },
      {
        title: 'assetCode',
        type: 'string',
        required: true,
      },
      {
        title: 'description',
        type: 'string',
        required: true,
      },
      {
        title: 'serviceStatus',
        type: 'select_no_ref',
        dataFromURL: '/admin/assetServiceStatus/getAll',
        required: true,
      },
      {
        title: 'assetCondition',
        type: 'select_no_ref',
        dataFromURL: '/admin/assetConditions/getAll',
        required: true,
      },
      {
        title: 'serialNo',
        type: 'string',
        required: true,
      },
      {
        title: 'note',
        type: 'string',
        required: true,
      },
      {
        title: 'manufacturer',
        type: 'string',
        required: true,
      },
      {
        title: 'brand',
        type: 'string',
        required: true,
      },
      {
        title: 'model',
        type: 'string',
        required: true,
      },
      {
        title: 'vendor',
        type: 'select_no_ref',
        dataFromURL: '/admin/vendors/getAll',
        required: true,
      },
      {
        title: 'acquisitionDate',
        type: 'date',
        required: true,
      },
      {
        title: 'acquisitionValue',
        type: 'number',
        required: true,
      },
      {
        title: 'depreciationRate',
        type: 'number',
        required: true,
      },
      {
        title: 'residualValue',
        type: 'number',
        required: true,
      },
      {
        title: 'reEvaluationValue',
        type: 'number',
        required: true,
      },
      {
        title: 'reEvaluationDate',
        type: 'date',
        required: true,
      },
    ],
  },
};
