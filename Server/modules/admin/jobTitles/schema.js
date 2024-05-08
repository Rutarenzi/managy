const Joi = require('joi');

const staffLevelSchema = Joi.object({
    name: Joi.string().min(2).required(),
    staffLevel: Joi.string().min(2).required(),
});

module.exports = staffLevelSchema;