import { DynamicLink } from '@/@types/types1';

export const assetLinks: DynamicLink = {
  assetAuditingRecords: {
    add: '/asset-auditing-records/add',
    update: '/asset-auditing-records/update',
    delete: '/asset-auditing-records/delete',
    getAll: '/asset-auditing-records/getAll',
    schema: [
      {
        title: 'asset',
        type: 'string',
      },
      {
        title: 'destinationOffice',
        type: 'string',
      },
    ],
  },
};
