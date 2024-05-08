const Joi = require('joi')


const assetServiceStatusSchema  = Joi.object({
    name: Joi.string().min(2).required(),
})


module.exports.assetServiceStatusSchema = assetServiceStatusSchema 