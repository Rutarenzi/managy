const Joi  =  require("joi")

const vendorSchema = Joi.object({
    name: Joi.string().required().not(""),
    address  : Joi.string().required().not(""),
    email : Joi.string().email().required(),
    website : Joi.string(),
    vatNo : Joi.number().required(),
    isBlackListed : Joi.boolean().default(false)
})

module.exports = vendorSchema