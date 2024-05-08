const { model, Schema, default: mongoose } = require("mongoose")

const stockMovementSchema = new Schema({
    item: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'StockItemReference'
    },
    destinationOffice: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Office'
    },
    dateOfMovement: {
        type: Date,
        default: Date.now()
    },
    movementReason: {
        type: String,
        required: true
    },
    requestedBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    approvedBy: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: 'User',
        default: null
    }
}, {
    timestamps: true
})



const StockMovement = model("StockMovement", stockMovementSchema);
module.exports = StockMovement;