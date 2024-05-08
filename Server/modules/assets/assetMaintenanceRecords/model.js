const { Schema, model, Types, default: mongoose } = require("mongoose")

const assetMaintenanceRecordSchema = new Schema({
    asset: {
        type: String,
        required: true
    },
    maintenanceDescription: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    maintenancePersonal: {
        type: Date,
        required: true
    },
    approvedBy: {
        type: String,
        required: true
    },
    maintenanceCost: {
        type: String,
        required: false
    },
    maintenanceReqNo: {
        type: String,
        required: true
    },
    maintenanceDate: {
        type: Date,
        required: true
    },
    maintenanceSupplier: {
        type: String,
        required: true
    },
    maintenanceLevel: {
        type: Number,
        required: true
    },
    creator: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

const assetMaintenanceRecord = model('assetMaintenanceRecord', assetMaintenanceRecordSchema)


module.exports = assetMaintenanceRecord