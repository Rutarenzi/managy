const StockItemCategory = require("./model");
const { stockItemCategorySchema } = require("./schema");

module.exports.createStockItemCategory = async (req, res) => {
    try {
        const { value, error } = stockItemCategorySchema.validate(req.body)
        if (error) throw new Error(error.message)

        const newStockItemCategory = new StockItemCategory({
            name: value.name,
            creator: req.user._id
        })

        const savedStockItemCategory = await newStockItemCategory.save();
        return res.status(200).json({ success: true, message: "StockItemCategory added successfully", data: savedStockItemCategory })

    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}


module.exports.getAllStockItemCategories = async (req, res) => {
    try {
        const stockItemCategories = await StockItemCategory.find()
        return res.status(200).json({ success: true, message: "All stockItemCategories", data: stockItemCategories })
    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}


module.exports.getSingleStockItemCategory = async (req, res) => {
    try {
        const stockItemCategory = await StockItemCategory.findById(req.params.id)
        if (!stockItemCategory) throw new Error("StockItemCategory not found")
        return res.status(200).json({ success: true, message: "StockItemCategory found", data: stockItemCategory })
    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}


module.exports.updateStockItemCategory = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) throw new Error("StockItemCategory id not found")
        const { value, error } = stockItemCategorySchema.validate(req.body)
        const updated = await StockItemCategory.findByIdAndUpdate(id , {
            name: value.name
        }, {  new : true})

        return res.status(200).json({ success : true , message : 'Category updated successfully', data : updated})
    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}


module.exports.deleteStockItemCategory = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) throw new Error("StockItemCategory id not found")
        const deleted = await StockItemCategory.findByIdAndDelete(id)
        return res.status(200).json({ success: true, message: "StockItemCategory deleted successfully", data: deleted })
    } catch (error) {
        return res.status(406).json({ success: false, message: error.message })
    }
}

