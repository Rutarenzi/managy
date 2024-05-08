const Joi = require("joi")
const stockItemCategorySchema = Joi.object({
    name : Joi.string(),

})
module.exports.stockItemCategorySchema = stockItemCategorySchema