import { UnitOfMeasurement } from '.';

export interface AssetAuditingRecords {
  _id?: string;
  asset: string;
  destinationOffice: string;
  dateOfMovement: Date;
  movementReason: string;
  requestedBy: string;
  approvedBy: string;
  creator?: string;
}

export interface AssetCustodyRecord {
  _id?: string;
  assetName: string;
  custodian: string;
  issuedBy?: string;
  issuedOn: Date;
  receivedBy?: string;
  returnedBy?: string;
  returnReceivedBy: string;
  returnedOn: Date;
}

export interface AssetMaintenanceRecord {
  _id?: string;
  asset: string;
  maintenanceDescription: string;
  notes?: string;
  maintenancePersonal: Date;
  approvedBy?: string;
  maintenanceCost?: string;
  maintenanceReqNo: string;
  maintenanceDate: Date;
  maintenanceSupplier: string;
  maintenanceLevel: number | string;
}

export interface AssetMaintenanceRequest {
  _id?: string;
  creator?: string;
  asset: string;
  requiredMaintenance: string;
  requiringStaff?: string;
  maintenanceSupplier: Date;
  preparedBy: string;
  verifiedBy: string;
  authorizedBy: string;
  maintenanceLevel: string;
}

export interface AssetMovement {
  _id?: string;
  asset: string;
  destinationOffice: string;
  dateOfMovement: Date | string;
  movementReason: string;
  requestedBy: string;
  approvedBy: string;
  creator?: string;
}

export interface Asset {
  _id?: string;
  department: string;
  functionalLocation: string;
  assetCategory: string;
  assetItem: string;
  assetCode: string;
  description: string;
  serviceStatus: string;
  assetCondition: string;
  serialNo: string;
  note: string;
  manufacturer: string;
  brand: string;
  model: string;
  vendor: string;
  acquisitionDate: Date;
  acquisitionValue: number | string;
  depreciationRate: number | string;
  residualValue: number | string;
  reEvaluationValue: number | string;
  reEvaluationDate: Date | string;
  creator?: string;
}

export interface OutgoingRequest {
  _id?: string;
  item: string;
  dueDate: Date | string;
  quantity: number | string;
  unitOfMeasurement: string | UnitOfMeasurement;
  unitPrice: number | string;
  price: number | string;
  total?: number | string;
  reason: string;
  creator?: string;
}

export interface IStockMovement {
  _id?: string;
  item: string;
  destinationOffice: string;
  dateOfMovement?: Date | string;
  movementReason: string;
  requestedBy?: string;
  approvedBy?: string | null;
}

export interface StockItemReference {
  _id?: string;
  name: string;
  stockItemCategory: string;
  unitOfMeasurement: string | UnitOfMeasurement;
  minimumStockLevel: number | string;
  maximumStockLevel: number | string;
  stockAlertLevel?: number | string;
  isActive?: boolean | string;
}

export interface OpeningStock {
  _id?: string;
  item: string;
  supplier: string;
  date: string | Date;
  VATno: string;
  quantity: number | string;
  unitPrice: number | string;
  total?: number;
  creator?: string;
}
