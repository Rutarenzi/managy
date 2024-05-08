const AssetCustodyRecord = require("./model")
const assetCustodySchema = require("./schema")

module.exports.createAssetCustodyRecord = async (req, res) => {
    try {
        const { value, error } = assetCustodySchema.validate(req.body)
        if (error) {
            throw new Error(error.message)
        }
        const assetCustodyRecord = new AssetCustodyRecord({
            assetName: value.assetName,
            custodian: value.custodian,
            issuedBy: value.issuedBy,
            issuedOn: value.issuedOn,
            receivedBy: value.receivedBy,
            returnedBy: value.returnedBy,
            returnReceivedBy: value.returnReceivedBy,
            returnedOn: value.returnedOn,
            creator: req.user._id
        })
        await assetCustodyRecord.save()
        res.json({ status: "success", message: "Asset Custody Record Created Successfully", data: assetCustodyRecord })
    } catch (error) {
        res.status(406).json({ status: "error", message: error.message })
    }
}

module.exports.getAllAssetCustodyRecords = async (req, res) => {
    try {
        if (req.user.role != "ADMIN") {
            const assetCustodyRecords = await AssetCustodyRecord.find({creator: req.user._id})
            res.status(200).json({ status: "success", message: "All Asset Custody Records", data: assetCustodyRecords })
        }
        const assetCustodyRecords = await AssetCustodyRecord.find()
        res.status(200).json({ status: "success", message: "All Asset Custody Records", data: assetCustodyRecords })
    } catch (error) {
        res.status(406).json({ status: "error", message: error.message })
    }
}


module.exports.getSingleAssetCustodyRecord = async (req, res) => {
    try {
        const { id } = req.params
        const assetCustodyRecord = await AssetCustodyRecord.findById(id)
        if (!assetCustodyRecord) {
            throw new Error("Asset Custody Record Not Found")
        }
        res.status(200).json({ success: true, message: "Single Asset Custody Record", data: assetCustodyRecord })
    } catch (error) {
        res.status(406).json({ success: false, message: error.message })
    }
}

module.exports.getAssetCustodyRecordByIssuer =  async (req,res) => {
    try {
        const  {  issuerId } = req.body ;
        const records = await AssetCustodyRecord.find({ issuedBy : issuerId})
        if(!records) throw new Error("No record found")
        return res.status(200).json({ success : true , message  : 'records found' , data  : records })
    } catch (error) {
        
    }
}

module.exports.updateAssetCustodyRecord = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) throw new Error("No id provided")
        const { value, error } = assetCustodySchema.validate(req.body)
        if (error) throw new Error(error.message)
        const record = await AssetCustodyRecord.findByIdAndUpdate(id, {
            assetName: value.assetName,
            custodian: value.custodian,
            issuedBy: value.issuedBy,
            issuedOn: value.issuedOn,
            receivedBy: value.receivedBy,
            returnedBy: value.returnedBy,
            returnReceivedBy: value.returnReceivedBy,
            returnedOn: value.returnedOn
        }, { new: true })
        res.status(200).json({ success: true, message: "Asset custody record updated successfully.", data: record })
    } catch (error) {
        res.status(406).json({ success: false, message: error.message })
    }
}

module.exports.deleteAssetCustodyRecord = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) throw new Error("No id provided")
        const record = await AssetCustodyRecord.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Asset custody record deleted successfully.", data: record })
    } catch (error) {
        res.status(406).json({ success: false, message: error.message })
    }
}