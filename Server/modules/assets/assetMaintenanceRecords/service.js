const AssetMaintenanceRecord = require("./model")
const assetMaintenanceRecordSchema = require("./schema")

module.exports.createAssetMaintenanceRecord = async (req, res) => {
    try {
        const { value, error } = assetMaintenanceRecordSchema.validate(req.body)
        if (error) throw new Error(error.message)
        const record = new AssetMaintenanceRecord({
            ...value,
            creator: req.user._id
        })
        await record.save()
        res.json({ status: "success", message: "Asset Maintenance Record Created Successfully", data: record })
    } catch (error) {
        res.status(406).json({ status: "error", message: error.message })
    }
}

module.exports.getAllAssetMaintenanceRecords = async (req, res) => {
    try {
        if (req.user.role != "ADMIN") {
            const assetMaintenanceRecords = await AssetMaintenanceRecord.find({ creator: req.user._id })
            res.status(200).json({ status: "success", message: "All Asset Maintenance Records", data: assetMaintenanceRecords })
        }
        const assetMaintenanceRecords = await AssetMaintenanceRecord.find()
        res.status(200).json({ status: "success", message: "All Asset Maintenance Records", data: assetMaintenanceRecords })
    } catch (error) {
        res.status(406).json({ status: "error", message: error.message })
    }
}


module.exports.getAllAssetMaintenanceRecordsByCreator = async (req, res) => {
    try {
        const assetMaintenanceRecords = await AssetMaintenanceRecord.find({ creator: req.user._id })
        return res.status(200).json({ success: true, message: 'Request OK', data: assetMaintenanceRecords })
    } catch (error) {
        res.status(406).json({ status: "error", message: error.message })
    }
}
module.exports.getSingleAssetMaintenanceRecord = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) throw new Error("No id provided")
        const assetMaintenanceRecord = await AssetMaintenanceRecord.findById(id)
        if (!assetMaintenanceRecord) throw new Error("Asset Maintenance Record Not Found")
        res.status(200).json({ success: true, message: "Single Asset Maintenance Record", data: assetMaintenanceRecord })
    } catch (error) {
        res.status(406).json({ success: false, message: error.message })
    }
}


module.exports.updateAssetMaintenanceRecord = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) throw new Error("No id provided")
        const { value, error } = assetMaintenanceRecordSchema.validate(req.body)
        if (error) throw new Error(error.message)
        if ((await AssetMaintenanceRecord.findById(id)).creator != req.user._id) {
            throw new Error('You are not allowed to modify this record');
        }
        let record = await AssetMaintenanceRecord.findByIdAndUpdate(id, {
            ...value
        }, { new: true })
        res.status(200).json({ success: true, message: "Asset Maintenance record updated successfully.", data: record })
    } catch (error) {
        res.status(406).json({ success: false, message: error.message })
    }
}

module.exports.deleteAssetMaintenanceRecord = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) throw new Error("No id provided")
        if ((await AssetMaintenanceRecord.findById(id)).creator != req.user._id) {
            throw new Error('You are not allowed to delete this record');
        }
        const record = await AssetMaintenanceRecord.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Asset Maintenance record deleted successfully.", data: record })
    } catch (error) {
        res.status(406).json({ success: false, message: error.message })
    }
}
