const { default: mongoose } = require("mongoose")
const StockMovement = require("./model")
const stockMovementSchema = require("./schema")

exports.createStockMovement = async (req, res) => {
    try {
        const { value, error } = stockMovementSchema.validate(req.body)
        if (error) throw new Error(error.message)
        const stockMovement = new StockMovement({
            ...value ,
            requestBy : req.user._id 
        })
        return res.status(201).json({ success: true, message: "Stock Movement created successfully", data: stockMovement })

    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}


exports.getAllStockMovements = async (req, res) => {
    try {
        const all = await StockMovement.find().populate("item").populate("destinationOffice").populate("requestedBy").populate("approvedBy")
        return res.status(200).json({ success: true, message: "All Stock Movements", data: all })
    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}

exports.getSingleStockMovement = async (req, res) => {

    try {
        const validatedId = new mongoose.Types.ObjectId(req.params.id)
        const all = await StockMovement.findById(validatedId).populate("item").populate("destinationOffice").populate("requestedBy").populate("approvedBy")
        return res.status(200).json({ success: true, message: "All Stock Movements", data: all })
    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}

exports.updateStockMovement = async (req, res) => {
    try {
        const validatedId = new mongoose.Types.ObjectId(req.params.id)
        const { value, error } = stockMovementSchema.validate(req.body)
        if (error) throw new Error(error.message)
        const updated = await StockMovement.findByIdAndUpdate(validatedId, value, { new: true })
        return res.status(200).json({ success: true, message: "Stock Movement updated successfully", data: updated })
    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}

// delete api handler
exports.deleteStockMovement = async (req, res) => {
    try {
        const validatedId = new mongoose.Types.ObjectId(req.params.id)
        const deleted = await StockMovement.findByIdAndDelete(validatedId)
        return res.status(200).json({ success: true, message: "Stock Movement deleted successfully", data: deleted })
    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}

exports.approveStockMovement = async (req, res) => {
    try {
        const validatedId = new mongoose.Types.ObjectId(req.params.id)
        const approved = await StockMovement.findByIdAndUpdate(validatedId, { approvedBy: req.user._id }, { new: true })
        return res.status(200).json({ success: true, message: "Stock Movement approved successfully", data: approved })
            } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}

exports.getStockMovementsByCreator = async (req, res) => {
    try {
        const creatorId = mongoose.Types.ObjectId(req.user._id)
        const all = await StockMovement.find({ requestedBy: creatorId }).populate("item").populate("destinationOffice").populate("requestedBy").populate("approvedBy")
        return res.status(200).json({ success: true, message: "All Stock Movements", data: all })
    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}