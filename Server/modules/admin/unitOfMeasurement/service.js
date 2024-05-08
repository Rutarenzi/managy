const UnitOfMeasurement = require("./model")
const unitSchema = require("./schema")

module.exports.createUnitOfMeasurement = async (req, res) => {
    try {
        const {value, error } = unitSchema.validate(req.body)
        if (error) throw new Error | (error.message)
        const unit = await UnitOfMeasurement.create({
            ...value, 
            creator: req.user
        })
        res.status(201).json({ success: true, message: "Unit of measurement created successfully", data: unit })
    } catch (error) {
        res.status(500).json({ success: true, message: error.message })
    }
}

module.exports.getAllunitOfMeasurement = async (req, res) => {
    try {
        const units = await UnitOfMeasurement.find()
        res.status(200).json({ success: true, message: "All units of measurement", data: units })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


module.exports.deleteUnitOfMeasurement = async (req, res) => {
    try {
        const { id } = req.params
        const unit = await UnitOfMeasurement.findByIdAndDelete(id)
        if (!unit) throw new Error("Unit of measurement not found")
        res.status(200).json({ success: true, message: "Unit of measurement deleted successfully", data: unit })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
module.exports.getSingleUnitOfMeasurement = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) throw new Error("Id is required")
        const unit = await UnitOfMeasurement.findById(id)
        if (!unit) throw new Error("Unit of measurement not found")
        res.status(200).json({ success: true, message: "Unit of measurement found", data: unit })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


module.exports.updateUnitOfMeasurement = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) throw new Error("Id is required")
        const { value, error } = unitSchema.validate(req.body)
        if (error) throw new Error(error.message)
        const unit = await UnitOfMeasurement.findByIdAndUpdate(id, {
            name: value.name,
            prefix: value.prefix
        }, { new: true })
        if (!unit) throw new Error("Unit of measurement not found")
        res.status(200).json({ success: true, message: "Unit of measurement updated successfully", data: unit })
    } catch (error) {
        res.status(406).json({ success: false, message: error.message })
    }
}
