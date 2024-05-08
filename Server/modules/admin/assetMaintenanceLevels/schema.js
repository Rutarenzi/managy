const Joi = require('joi')


const assetMaintenanceLevel  = Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().min(2).required(),
})


module.exports.assetML = assetMaintenanceLevel 