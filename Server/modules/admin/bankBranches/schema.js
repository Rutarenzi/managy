const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().required().not(""),
  bank: Joi.string().required().not(""),
});
