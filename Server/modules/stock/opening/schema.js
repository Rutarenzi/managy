const Joi = require('joi')

const openingStockSchema = Joi.object({
    item: Joi.string(),
    date: Joi.date(),
    supplier: Joi.string(),
    VATno: Joi.string(),
    quantity: Joi.number(),
    unitPrice: Joi.number(),
    total: Joi.number(),
    creator: Joi.string(),
})



module.exports = openingStockSchema;