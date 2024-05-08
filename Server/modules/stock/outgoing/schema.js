const Joi = require('joi');

const outgoingReqSchema = Joi.object({
    item: Joi.string().required(),
    dueDate: Joi.string().required(),
    quantity: Joi.number().required(),
    unitOfMeasurement: Joi.string().required(),
    unitPrice: Joi.number().required(),
    price: Joi.number().required(),
    reason: Joi.string().required()
});

module.exports = outgoingReqSchema;
