const Joi = require("joi")

const assetCustodySchema = Joi.object({
    assetName: Joi.string(),
    custodian: Joi.string().min(2),
    issuedBy: Joi.string(),
    issuedOn: Joi.date(),
    receivedBy: Joi.string(),
    returnedBy: Joi.string(),
    returnReceivedBy: Joi.string(),
    returnedOn: Joi.date()
})

module.exports = assetCustodySchema;