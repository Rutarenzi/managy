
const { assetFunctionalLocation } = require("../../../models/referenceData/assetFunctionalLocations");
const {assetFunctionalLocationSchema } = require("./schema");

module.exports.create = async(req,res)=>{
    try{
        const {value, error} = assetFunctionalLocationSchema.validate(req.body)
        if(error) throw new Error(error.message)

        const exists = await assetFunctionalLocation.findOne({name: value.name})
        if(exists) throw new Error("An Asset Functional Location with that name already exists")
        const newAssetMl = await assetFunctionalLocation.create({
            ...value,
            creator: req.user._id
        })

        res.status(200).json({status: true, message: "Asset Functional Location created successfully", assetMl: newAssetMl})

    }catch(err){
        res.status(406).json({status: false, message: err.message});
    }
}

module.exports.getAll = async(req,res)=>{
    try {
        const allAssetML = await assetFunctionalLocation.find().populate('department').populate('creator');
        return res.status(200).json({status: true, data: allAssetML})
    } catch (error) {
        res.status(500).json({status: false, message: error.message});
    }
}

module.exports.getById = async(req, res)=>{
    try {
        const assetML = await assetFunctionalLocation.findById(req.params.id).populate('department').populate('creator');
        if(!assetML) throw new Error("Not found")
        return res.status(200).json({status: true, data: assetML})              
    } catch (error) {
        return res.status(406).json({status: false, message: error.message})
    }
}


module.exports.updateById = async(req,res)=>{
    try {
        const assetMLExists = await assetFunctionalLocation.findById(req.params.id)
        if(!assetMLExists) throw new Error("Not found")

        const {value, error} = assetFunctionalLocationSchema.validate(req.body)
        if(error) throw new Error(error.message)
        
        const updatedAssetML = await assetFunctionalLocation.findByIdAndUpdate(req.params.id, {
            value
        })

        return res.status(200).json({status: true, message: "Asset Functional Location updated successfully", data: updatedAssetML})
    } catch (err) {
        return res.status(406).json({status: false, message: err.message})
    }
}

module.exports.deletebyId = async(req,res)=>{        
    try {
        const deleted = await assetFunctionalLocation.findByIdAndDelete(req.params.id)

        return res.status(200).json({status: true, message: "Asset Functional Location deleted successfully"})
    } catch (err) {
        return res.status(406).json({status: false, message: err.message || "Not found"})
    }
}
