const Joi = require('joi');

const officeLocation = Joi.object({
    name: Joi.string().min(2).required(),
});

module.exports.officeLocationSchema = officeLocation;