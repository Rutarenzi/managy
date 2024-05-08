const Joi = require('joi')


/**
 * Asset, DestinationOffice, DateOfMovement, MovementReason, RequestedBy, ApprovedBy
 */

const assetMovementSchema = Joi.object({
    asset: Joi.string().required(), 
    destinationOffice: Joi.string().required(), 
    dateOfMovement:Joi.date().required(), 
    movementReason: Joi.string().required(), 
    requestedBy: Joi.string().required(), 
    approvedBy: Joi.string().required(),
})


module.exports.assetMovementSchema = assetMovementSchema 