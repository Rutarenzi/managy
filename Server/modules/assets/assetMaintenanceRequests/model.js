 const { Schema, model, Types } = require("mongoose")

const assetMaintenanceRequestSchema = new Schema({
    creator: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    asset: {
        type: String,
        required: true
    },
    requiredMaintenance: {
        type: String,
        required: true
    },
    requiringStaff: {
        type: String,
        required: false
    },
    maintenanceSupplier: {
        type: Date,
        required: true
    },
    preparedBy: {
        type: String,
        required: true
    },
    verifiedBy: {
        type: String,
        required: true
    },
    authorizedBy: {
        type: String,
        required: true
    },
    maintenanceLevel: {
        type: String,
        required: true
    }
} , {  timestamps: true })

const AssetMaintenanceRequest = model('AssetMaintainceRequest', assetMaintenanceRequestSchema)


module.exports = AssetMaintenanceRequest