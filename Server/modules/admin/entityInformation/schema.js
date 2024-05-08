const Joi = require('joi');

const entityInformation = Joi.object({
  name: Joi.string().min(2).required(),
  address: Joi.string().min(2).required(),
  telephone: Joi.string().min(2).required(),
  email: Joi.string().min(2).required(),
  blackListed: Joi.boolean(),
  website: Joi.string().min(2).required(),
  VATNo: Joi.string().min(2).required(),
});

module.exports = entityInformation;