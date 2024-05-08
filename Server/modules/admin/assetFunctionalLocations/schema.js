const Joi = require('joi')


const assetFunctionalLocationSchema  = Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().min(2).required(),
    department: Joi.string().min(2).required(),
    location: Joi.string().required(),
})


module.exports.assetFunctionalLocationSchema = assetFunctionalLocationSchema 