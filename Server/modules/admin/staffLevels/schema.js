const Joi = require('joi');

const staffLevel = Joi.object({
    name: Joi.string().min(2).required(),
});

module.exports.staffLevelSchema = staffLevel;