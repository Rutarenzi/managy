import { DynamicFormComponent, FormInfo } from '@/@types/types1';

export const requestFormInfo: FormInfo = {
  title: 'New Request',
  description: 'Fill in the details below to add a new request',
  fields: [
    {
      name: 'department',
      type: 'select',
      placeholder: 'Department',
      dataUrl: '/admin/departments/getAll',
    },
    {
      name: 'item',
      type: 'select',
      placeholder: 'Item',
      dataUrl: '/admin/stockItemReference/getAll',
    },
    {
      name: 'store',
      type: 'text',
      placeholder: 'Store',
    },
    {
      name: 'unitPrice',
      type: 'text',
      placeholder: 'unit price',
    },
    {
      name: 'quantity',
      type: 'number',
      placeholder: 'Quantity',
    },
    {
      name: 'itemGroup',
      type: 'select',
      placeholder: 'Item Group',
      dataUrl: '/admin/stockItemCategories/getAll',
    },
    {
      name: 'unitOfMeasurement',
      type: 'select',
      placeholder: 'Unit of Measurement',
      dataUrl: '/admin/unitsOfMeasurement/getAll',
    },
    {
      name: 'vendor',
      type: 'select',
      placeholder: 'Vendor',
      dataUrl: '/admin/vendors/getAll',
    },
    {
      name: 'assetCode',
      type: 'text',
      placeholder: 'Asset Code',
      minLen: 24,
      maxLen: 24,
    },
    {
      name: 'reason',
      type: 'text',
      placeholder: 'Reason',
      required: false,
    },
  ],
};

export const incFomInfo: FormInfo = {
  title: 'New Incomming Stock item',
  description: 'Add a new incomming stock item',
  fields: [
    {
      name: 'supplier',
      type: 'text',
      placeholder: 'Supplier',
    },
    {
      name: 'deliveryNote',
      type: 'text',
      placeholder: 'Delivery note',
    },
    {
      name: 'item',
      type: 'select',
      placeholder: 'Item',
      dataUrl: '/admin/stockItemReference/getAll',
    },
    {
      name: 'purchaseOrder',
      type: 'text',
      placeholder: 'Purchase order',
    },
    {
      name: 'unitPrice',
      type: 'text',
      placeholder: 'unit price',
    },
    {
      name: 'quantity',
      type: 'number',
      placeholder: 'Quantity',
    },
    {
      name: 'VATno',
      type: 'text',
      placeholder: 'VAT No.',
    },
    {
      name: 'unitOfMeasurement',
      type: 'select',
      placeholder: 'Unit of Measurement',
      dataUrl: '/admin/unitsOfMeasurement/getAll',
    },
    {
      name: 'date',
      type: 'date',
      placeholder: 'Date',
    },
    {
      name: 'receivableNotes',
      type: 'text',
      placeholder: 'Receivable Notes',
    },
  ],
};

export const notesFromInfo: FormInfo = {
  title: 'New Receivable Notes',
  description: 'Add a new receivable notes',
  fields: [
    ...incFomInfo.fields,
    {
      name: 'isDeliveryFinished',
      type: 'boolean',
      placeholder: 'is Delivery Finished',
    },
  ],
};

export const outgoingFormInfo: FormInfo = {
  title: 'New Outgoing Request',
  description: 'Add a new outgoing',
  fields: [
    {
      name: 'item',
      type: 'select',
      placeholder: 'Item',
      dataUrl: '/admin/stockItemReference/getAll',
    },
    {
      name: 'dueDate',
      type: 'date',
      placeholder: 'Due Date',
    },
    {
      name: 'unitPrice',
      type: 'text',
      placeholder: 'unit price',
    },
    {
      name: 'quantity',
      type: 'number',
      placeholder: 'Quantity',
    },
    {
      name: 'unitOfMeasurement',
      type: 'select',
      placeholder: 'Unit of Measurement',
      dataUrl: '/admin/unitsOfMeasurement/getAll',
    },
    {
      name: 'price',
      type: 'number',
      placeholder: 'Price',
    },
    {
      name: 'reason',
      type: 'text',
      placeholder: 'Reason',
    },
  ],
};

export const movementFormInfo: FormInfo = {
  title: 'New Stock Movement',
  description: 'Add a new stock movement',
  fields: [
    {
      name: 'item',
      type: 'select',
      placeholder: 'Item',
      dataUrl: '/admin/stockItemReference/getAll',
    },
    {
      name: 'destinationOffice',
      type: 'text',
      placeholder: 'Destination Office',
    },
    {
      name: 'dateOfMovement',
      type: 'date',
      placeholder: 'Date of Movement',
    },
    {
      name: 'movementReason',
      type: 'text',
      placeholder: 'Movement Reason',
    },
  ],
};

export const stockItemFormInfo: FormInfo = {
  title: 'New Stock Item',
  description: 'Add a new stock item',
  fields: [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Name',
    },
    {
      name: 'stockItemCategory',
      type: 'select',
      placeholder: 'Stock Item Category',
      dataUrl: '/admin/stockItemCategories/getAll',
    },
    {
      name: 'unitOfMeasurement',
      type: 'select',
      placeholder: 'Unit of Measurement',
      dataUrl: '/admin/unitsOfMeasurement/getAll',
    },
    {
      name: 'minimumStockLevel',
      type: 'number',
      placeholder: 'Minimum Stock Level',
    },
    {
      name: 'maximumStockLevel',
      type: 'number',
      placeholder: 'Maximum Stock Level',
    },
    {
      name: 'stockAlertLevel',
      type: 'number',
      placeholder: 'Stock Alert Level',
    },
    {
      name: 'isActive',
      type: 'boolean',
      placeholder: 'Is Active',
    },
  ],
};

export const openingStockFormInfo: FormInfo = {
  title: 'New Opening Stock',
  description: 'Add a new opening stock',
  fields: [
    {
      name: 'item',
      type: 'select',
      placeholder: 'Item',
      dataUrl: '/admin/stockItemReference/getAll',
    },
    {
      name: 'quantity',
      type: 'number',
      placeholder: 'Quantity',
    },
    {
      name: 'unitPrice',
      type: 'number',
      placeholder: 'Unit Price',
    },
    {
      name: 'date',
      type: 'date',
      placeholder: 'Date',
    },
    {
      name: 'VATno',
      type: 'text',
      placeholder: 'VAT No.',
    },
    {
      name: 'supplier',
      type: 'text',
      placeholder: 'Supplier',
    },
  ],
};
