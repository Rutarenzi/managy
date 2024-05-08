const { assetCategory } = require("../../../models/referenceData/assetCategory");
const { assetCategorySchema } = require("./schema");

module.exports.create = async(req,res)=>{
    try{
        const {value, error} = assetCategorySchema.validate(req.body)
        if(error) throw new Error(error.message)

        const exists = await assetCategory.findOne({name: value.name})
        if(exists) throw new Error("An assetcategory with that name already exists")
        const newAssetMl = await assetCategory.create({
            ...value,
            creator: req.user._id
        })

        res.status(200).json({status: true, message: "Asset category created successfully", assetMl: newAssetMl})

    }catch(err){
        res.status(406).json({status: false, message: err.message});
    }
}

module.exports.getAll = async(req,res)=>{
    try {
        const allAssetML = await assetCategory.find()
        return res.status(200).json({status: true, data: allAssetML})
    } catch (error) {
        res.status(500).json({status: false, message: error.message});
    }
}

module.exports.getById = async(req, res)=>{
    try {
        const assetML = await assetCategory.findById(req.params.id)
        if(!assetML) throw new Error("Not found")
        return res.status(200).json({status: true, data: assetML})              
    } catch (error) {
        return res.status(406).json({status: false, message: error.message})
    }
}


module.exports.updateById = async(req,res)=>{
    try {
        const assetMLExists = await assetCategory.findById(req.params.id)
        if(!assetMLExists) throw new Error("Not found")

        const {value, error} = assetCategorySchema.validate(req.body)
        if(error) throw new Error(error.message)
        
        const updatedAssetML = await assetCategory.findByIdAndUpdate(req.params.id, {
            ...value
        })

        return res.status(200).json({status: true, message: "Asset Category updated successfully", data: updatedAssetML})
    } catch (err) {
        return res.status(406).json({status: false, message: err.message})
    }
}

module.exports.deletebyId = async(req,res)=>{        
    try {
        const deleted = await assetCategory.findByIdAndDelete(req.params.id)

        return res.status(200).json({status: true, message: "Asset Category deleted successfully"})
    } catch (err) {
        return res.status(406).json({status: false, message: err.message || "Not found"})
    }
}

module.exports.getAll = async(req,res)=>{
    try {
        const allAssetML = await assetCategory.find()
        return res.status(200).json({data: allAssetML})
    } catch (err) {
        return res.status(406).json({status: false, message: err.message})
    }
}