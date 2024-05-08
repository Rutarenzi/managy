const Joi = require('joi')


const assetItemReferenceSchema  = Joi.object({
    name: Joi.string().min(2).required(),
    assetCategory: Joi.string().min(2).required(),
})


module.exports.assetItemReferenceSchema = assetItemReferenceSchema 