const Joi = require('joi')

const assetReportSchema = Joi.object({
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
})

module.exports = assetReportSchema