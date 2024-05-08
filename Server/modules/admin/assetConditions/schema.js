const Joi = require('joi')


const assetConditionSchema  = Joi.object({
    name: Joi.string().min(2).required()
})


module.exports.assetConditionSchema = assetConditionSchema 