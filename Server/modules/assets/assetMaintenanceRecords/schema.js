const Joi = require('joi');

const assetMaintenanceRecordSchema = Joi.object({
    asset: Joi.string(),
    maintenanceDescription: Joi.string(),
    notes: Joi.string(),
    maintenancePersonal: Joi.date(),
    approvedBy: Joi.string(),
    maintenanceCost: Joi.string(),
    maintenanceReqNo: Joi.string(),
    maintenanceDate: Joi.date(),
    maintenanceSupplier: Joi.string(),
    maintenanceLevel: Joi.number(),
});

module.exports = assetMaintenanceRecordSchema;