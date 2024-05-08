const Joi = require("joi")


const unitSchema = Joi.object({
    name: Joi.string(),
    prefix: Joi.string().max(5)
})



module.exports = unitSchema