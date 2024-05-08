const { Asset } = require('./model')
const { assetSchema } = require('./schema')

module.exports.create = async (req, res) => {
    try {
        const { value, error } = assetSchema.validate(req.body)
        if (error) throw new Error(error.message)

        const newAsset = await Asset.create({
            ...value,
            creator: req.user._id
        })

        res.status(200).json({ status: true, message: "Asset created successfully", data: newAsset })

    } catch (err) {
        res.status(406).json({ status: false, message: err.message });
    }
}

module.exports.getByCreator = async (req, res) => {
    try {
        const assets = await Asset.find({ creator: req.user._id })
        return res.status(200).json({ status: true, data: assets })
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

module.exports.getById = async (req, res) => {
    try {
        const asset = await Asset.findOne({ _id: req.params.id, creator: req.user._id })
        if (!asset) throw new Error("Not found")
        return res.status(200).json({ status: true, data: asset })
    } catch (error) {
        return res.status(406).json({ status: false, message: error.message })
    }
}



module.exports.updateById = async (req, res) => {
    try {
        const asset = await Asset.findOne({ _id: req.params.id, creator: req.user._id })
        if (!asset) throw new Error("Not found")

        const { value, error } = assetSchema.validate(req.body)
        if (error) throw new Error(error.message)

        const updatedAsset = await Asset.findOneAndUpdate({ _id: req.params.id, creator: req.user._id }, {
            ...value
        })

        return res.status(200).json({ status: true, message: "Asset updated successfully", data: updatedAsset })
    } catch (err) {
        return res.status(406).json({ status: false, message: err.message })
    }
}

module.exports.deletebyId = async (req, res) => {
    try {
        const deleted = await Asset.findOneAndDelete({ _id: req.params.id, creator: req.user._id })
        return res.status(200).json({ status: true, message: "Asset deleted successfully" })
    } catch (err) {
        return res.status(406).json({ status: false, message: err.message })
    }
}

module.exports.getAll = async (req, res) => {
    try {

        if (req.user.role != "ADMIN") {
            const allAssets = await Asset.find({ creator: req.user._id })
            return res.status(200).json({ status: true, data: allAssets })
        }

        const allAssets = await Asset.find()
        return res.status(200).json({ status: true, data: allAssets })

    } catch (err) {
        return res.status(406).json({ status: false, message: err.message })
    }
}