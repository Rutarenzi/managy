const Joi = require('joi');

const assetMaintenanceRequestSchema = Joi.object({
    asset: Joi.string(),
    requiredMaintenance: Joi.string(),
    requiringStaff: Joi.string(),
    maintenanceSupplier: Joi.date(),
    preparedBy: Joi.string(),
    verifiedBy: Joi.string(),
    authorizedBy: Joi.string(),
    maintenanceLevel: Joi.string(),
});

module.exports = assetMaintenanceRequestSchema;
