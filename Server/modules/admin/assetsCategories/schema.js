const Joi = require('joi')


const assetCategorySchema  = Joi.object({
    name: Joi.string().min(2).required(),
    usefulEconomicYears: Joi.number().required(),
})


module.exports.assetCategorySchema = assetCategorySchema 