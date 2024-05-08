const Joi = require('joi')

const departmentSchema = Joi.object({
    name: Joi.string().required()
})


module.exports = departmentSchema
