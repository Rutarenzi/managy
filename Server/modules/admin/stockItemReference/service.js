const StockItemReference = require("./model");
const stockItemReferenceSchema = require("./schema");

module.exports.createStockItemReference = async (req, res) => {
    try {
        const { value, error } = stockItemReferenceSchema.validate(req.body)
        if (error) throw new Error(error.message)

        const newStockItemReference = new StockItemReference({
            name: value.name,
            stockItemCategory: value.stockItemCategory,
            unitOfMeasurement: value.unitOfMeasurement,
            minimumStockLevel: value.minimumStockLevel,
            maximumStockLevel: value.maximumStockLevel,
            stockAlertLevel: value.stockAlertLevel,
            isActive: value.isActive,
            code: value.code,
            creator: req.user._id
        })

        const savedStockItemReference = await newStockItemReference.save();
        return res.status(200).json({ success: true, message: "StockItemReference added successfully", data: savedStockItemReference })

    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}


module.exports.getAllStockItemReferences = async (req, res) => {
    try {
        const stockItemReferences = await StockItemReference.find().populate("stockItemCategory").populate("unitOfMeasurement")
        return res.status(200).json({ success: true, message: "All stockItemReferences", data: stockItemReferences })
    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}



module.exports.getSingleStockItemReference = async (req, res) => {
    try {
        if (!req.params.id) throw new Error("StockItemReference id not found")
        const stockItemReference = await StockItemReference.findById(req.params.id).populate("stockItemCategory").populate("unitOfMeasurement")
        if (!stockItemReference) throw new Error("StockItemReference not found")
        return res.status(200).json({ success: true, message: "StockItemReference found", data: stockItemReference })
    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}

module.exports.updateStockItemReference = async (req, res) => {
    try {
        if (!req.params.id) throw new Error("StockItemReference id not found")
        const { value, error } = stockItemReferenceSchema.validate(req.body)
        if (error) throw new Error(error.message)
        const updated = await StockItemReference.findByIdAndUpdate(req.params.id, {
            name: value.name,
            stockItemCategory: value.stockItemCategory,
            unitOfMeasurement: value.unitOfMeasurement,
            minimumStockLevel: value.minimumStockLevel,
            maximumStockLevel: value.maximumStockLevel,
            stockAlertLevel: value.stockAlertLevel,
            isActive: value.isActive
        }, { new: true })
        if(!updated) throw new Error("StockItemReference not found")
        return res.status(200).json({ success: true, message: "StockItemReference updated successfully", data: updated })
    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}

module.exports.deleteStockItemReference = async (req, res) => {
    try {
        if (!req.params.id) throw new Error("StockItemReference id not found")
        const deleted = await StockItemReference.findByIdAndDelete(req.params.id)
        if(!deleted) throw new Error("No such stock item reference found")
        return res.status(200).json({ success: true, message: "StockItemReference deleted successfully", data: deleted })
        
    } catch (error) {
        return res.status(406).json({ success: false, message: error.message }); 
    }
}