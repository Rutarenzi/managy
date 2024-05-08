const { assetServiceStatus } = require("../../../models/referenceData/assetServiceStatus");
const {assetServiceStatusSchema } = require("./schema");

module.exports.create = async(req,res)=>{
    try{
        const {value, error} = assetServiceStatusSchema.validate(req.body)
        if(error) throw new Error(error.message)

        const exists = await assetServiceStatus.findOne({name: value.name})
        if(exists) throw new Error("An Asset service status with that name already exists")
        const newAssetMl = await assetServiceStatus.create({
            ...value,
            creator: req.user._id
        })

        res.status(200).json({status: true, message: "Asset service status created successfully", assetMl: newAssetMl})

    }catch(err){
        res.status(406).json({status: false, message: err.message});
    }
}

module.exports.getAll = async(req,res)=>{
    try {
        const allAssetML = await assetServiceStatus.find()
        return res.status(200).json({status: true, data: allAssetML})
    } catch (error) {
        res.status(500).json({status: false, message: error.message});
    }
}

module.exports.getById = async(req, res)=>{
    try {
        const assetML = await assetServiceStatus.findById(req.params.id)
        if(!assetML) throw new Error("Not found")
        return res.status(200).json({status: true, data: assetML})              
    } catch (error) {
        return res.status(406).json({status: false, message: error.message})
    }
}


module.exports.updateById = async(req,res)=>{
    try {
        const assetMLExists = await assetServiceStatus.findById(req.params.id)
        if(!assetMLExists) throw new Error("Not found")

        const {value, error} = assetServiceStatusSchema.validate(req.body)
        if(error) throw new Error(error.message)
        
        const updatedAssetML = await assetServiceStatus.findByIdAndUpdate(req.params.id, {
            value
        })

        return res.status(200).json({status: true, message: "Asset service status updated successfully", data: updatedAssetML})
    } catch (err) {
        return res.status(406).json({status: false, message: err.message})
    }
}

module.exports.deletebyId = async(req,res)=>{        
    try {
        const deleted = await assetServiceStatus.findByIdAndDelete(req.params.id)
        return res.status(200).json({status: true, message: "Asset service status deleted successfully"})
    } catch (err) {
        return res.status(406).json({status: false, message: err.message || "Not found"})
    }
}

module.exports.getAll = async(req,res)=>{
    try {
        const allAssetML = await assetServiceStatus.find()
        return res.status(200).json({data: allAssetML})
    } catch (err) {
        return res.status(406).json({status: false, message: err.message})
    }
}