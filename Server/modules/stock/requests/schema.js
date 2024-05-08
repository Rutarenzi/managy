const Joi = require('joi');

const stockRequestSchema = Joi.object({
  store: Joi.string().trim(),
  itemGroup: Joi.string().trim(),
  item: Joi.string().trim(),
  department: Joi.string().trim(),
  unitOfMeasurement: Joi.string().trim(),
  quantity: Joi.number().integer().min(0).default(1),
  unitPrice: Joi.number().min(0),
  isApproved: Joi.boolean().default(false),
  assetCode: Joi.string().trim(),
  vendor: Joi.string().trim(),
  reason: Joi.string().trim()
});

module.exports = stockRequestSchema;