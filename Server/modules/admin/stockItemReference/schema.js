const Joi = require("joi")

const stockItemReferenceSchema = Joi.object({
    name : Joi.string(),
    stockItemCategory : Joi.string(),
    code: Joi.string(),
    unitOfMeasurement : Joi.string(),
    minimumStockLevel : Joi.number(),
    maximumStockLevel : Joi.number(),
    stockAlertLevel : Joi.number(),
    isActive : Joi.boolean()
})

module.exports = stockItemReferenceSchema