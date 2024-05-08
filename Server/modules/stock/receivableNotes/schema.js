const Joi = require('joi');

const receivableNotesSchema = Joi.object({
  deliveryNote: Joi.string(),
  supplier: Joi.string(),
  date: Joi.date(),
  isDeliveryFinished: Joi.boolean(),
  purchaseOrder: Joi.string(),
  VATno: Joi.string(),
  receivableNotes: Joi.string(),
});

module.exports = receivableNotesSchema;
