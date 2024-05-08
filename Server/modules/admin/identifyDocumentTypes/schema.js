const Joi = require('joi');

const identifyDocumentType = Joi.object({
    name: Joi.string().min(2).required(),
});

module.exports.identifyDocumentTypeSchema = identifyDocumentType;