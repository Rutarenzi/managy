const Joi   = require('joi')

const stockMovementSchema = Joi.object({
    item : Joi.string().required(),
    destinationOffice : Joi.string().required(),
    dateOfMovement : Joi.date().default(Date.now()),
    movementReason : Joi.string().required(),
    approvedBy : Joi.string(),
})


module.exports = stockMovementSchema ;