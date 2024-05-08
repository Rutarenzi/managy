const AssetMaintenanceRequest = require("./model")
const assetMaintenanceRequestSchema = require("./schema")

module.exports.createAssetMaintenanceRequest = async (req, res) => {
    try {
        const { value, error } = assetMaintenanceRequestSchema.validate(req.body)
        if (error) throw new Error(error.message)
        const request = new AssetMaintenanceRequest({
            ...value,
            creator: req.user._id
        })
        await request.save()
        res.json({ status: "success", message: "Asset Maintenance Request Created Successfully", data: request })
    } catch (error) {
        res.status(406).json({ status: "error", message: error.message })
    }
}

module.exports.getAllAssetMaintenanceRequests = async (req, res) => {
    try {
        if (req.user.role != "ADMIN") {
            const assetMaintenanceRequests = await AssetMaintenanceRequest.find({ creator: req.user._id})
            res.status(200).json({ status: "success", message: "All Asset Maintenance Requests", data: assetMaintenanceRequests })
        }
        const assetMaintenanceRequests = await AssetMaintenanceRequest.find()
        res.status(200).json({ status: "success", message: "All Asset Maintenance Requests", data: assetMaintenanceRequests })
    } catch (error) {
        res.status(406).json({ status: "error", message: error.message })
    }
}


module.exports.getSingleAssetMaintenanceRequest = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) throw new Error("No id provided")
        const assetMaintenanceRequest = await AssetMaintenanceRequest.findById(id)
        if (!assetMaintenanceRequest) throw new Error("Asset Maintenance Request Not Found")
        res.status(200).json({ success: true, message: "Asset maintenance request found", data: assetMaintenanceRequest })
    } catch (error) {
        res.status(406).json({ success: false, message: error.message })
    }
}


module.exports.updateAssetMaintenanceRequest = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) throw new Error("No id provided")
        const { value, error } = assetMaintenanceRequestSchema.validate(req.body)
        if (error) throw new Error(error.message)
        const Request = await AssetMaintenanceRequest.findByIdAndUpdate(id, {
            ...value
        }, { new: true })
        res.status(200).json({ success: true, message: "Asset Maintenance Request updated successfully.", data: Request })
    } catch (error) {
        res.status(406).json({ success: false, message: error.message })
    }
}

module.exports.deleteAssetMaintenanceRequest = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) throw new Error("No id provided")
        const Request = await AssetMaintenanceRequest.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Asset Maintenance Request deleted successfully.", data: Request })
    } catch (error) {
        res.status(406).json({ success: false, message: error.message })
    }
}