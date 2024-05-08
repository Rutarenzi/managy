const Joi = require('joi');

const incomingReqSchema = Joi.object({
    item: Joi.string(),
    quantity: Joi.number(),
    unitOfMeasurement: Joi.string(),
    unitPrice: Joi.number(),
    deliveryNote: Joi.string(),
    supplier: Joi.string(),
    date: Joi.date(),
    isDeliveryFinished: Joi.boolean(),
    purchaseOrder: Joi.string(),
    VATno: Joi.string(),
    receivableNotes: Joi.string(),
});

module.exports = incomingReqSchema;
