const { assetMaintenanceLevel } = require("../../../models/referenceData/assetMaintenanceLevel");
const { assetML } = require("./schema");

module.exports.create = async(req,res)=>{
    try{
        const {value, error} = assetML.validate(req.body)
        if(error) throw new Error(error.message)

        const exists = await assetMaintenanceLevel.findOne({name: value.name})
        if(exists) throw new Error("An asset maintenance level with that name already exists")
        const newAssetMl = await assetMaintenanceLevel.create({
            name: value.name,
            description: value.description,
            creator: req.user._id
        })

        res.status(200).json({status: true, message: "Asset Maintenance Level created successfully", assetMl: newAssetMl})

    }catch(err){
        res.status(500).json({status: false, message: err.message});
    }
}

module.exports.getAll = async(req,res)=>{
    try {
        const allAssetML = await assetMaintenanceLevel.find()
        return res.status(200).json({status: true, data: allAssetML})
    } catch (error) {
        res.status(500).json({status: false, message: error.message});
    }
}

module.exports.getById = async(req, res)=>{
    try {
        const assetML = await assetMaintenanceLevel.findById(req.params.id)
        if(!assetML) throw new Error("Not found")
        return res.status(200).json({status: true, data: assetML})              
    } catch (error) {
        return res.status(406).json({status: false, message: error.message})
    }
}


module.exports.updateById = async(req,res)=>{
    try {
        const assetMLExists = await assetMaintenanceLevel.findById(req.params.id)
        if(!assetMLExists) throw new Error("Not found")

        const {value, error} = assetML.validate(req.body)
        if(error) throw new Error(error.message)
        
        const updatedAssetML = await assetMaintenanceLevel.findByIdAndUpdate(req.params.id, {
            name: value.name,
            description: value.description
        })

        return res.status(200).json({status: true, message: "Asset Maintenance Level updated successfully", data: updatedAssetML})
    } catch (err) {
        return res.status(406).json({status: false, message: err.message})
    }
}

module.exports.deletebyId = async(req,res)=>{        
    try {
        const assetMLExists = await assetMaintenanceLevel.findById(req.params.id)
        if(!assetMLExists) throw new Error("Not found")

        const deletedAssetML = await assetMaintenanceLevel.findByIdAndDelete(req.params.id)
        return res.status(200).json({status: true, message: "Asset Maintenance Level deleted successfully"})
    } catch (err) {
        return res.status(406).json({status: false, message: err.message || "Not found"})
    }
}

module.exports.getAll = async(req,res)=>{
    try {
        const allAssetML = await assetMaintenanceLevel.find()
        return res.status(200).json({data: allAssetML})
    } catch (err) {
        return res.status(406).json({status: false, message: err.message})
    }
}