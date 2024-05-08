const { assetMovements } = require("./model")
const { assetMovementSchema } = require("./schema")

module.exports.create = async(req,res)=>{
    try{
        const {value, error} = assetMovementSchema.validate(req.body)
        if(error) throw new Error(error.message)

        const assetMovement = await assetMovements.create({
            ...value,
            creator: req.user._id
        })

        res.status(200).json({status: true, message: "Asset movement created successfully", data: assetMovement})

    }catch(err){
        res.status(406).json({status: false, message: err.message});
    }
}

module.exports.getByCreator = async(req,res)=>{
    try {
        const data = await assetMovements.find({creator: req.user._id})
        return res.status(200).json({status: true, data})
    } catch (error) {
        res.status(500).json({status: false, message: error.message});
    }
}

module.exports.getById = async(req, res)=>{
    try {
        const assetMovement = await assetMovements.findOne({_id: req.params.id, creator: req.user._id})
        if(!asset) throw new Error("Not found")
        return res.status(200).json({status: true, data: assetMovement})              
    } catch (error) {
        return res.status(406).json({status: false, message: error.message})
    }
}


module.exports.updateById = async(req,res)=>{
    try {
        const assetMovement = await assetMovements.findOne({_id: req.params.id, creator: req.user._id})
        if(!assetMovement) throw new Error("Not found")

        const {value, error} = assetMovementSchema.validate(req.body)
        if(error) throw new Error(error.message)
        
        const updatedAssetMovement = await assetMovements.findOneAndUpdate({_id: req.params.id, creator: req.user._id}, {
           ...value
        })

        return res.status(200).json({status: true, message: "Asset movement updated successfully", data: updatedAssetMovement})
    } catch (err) {
        return res.status(406).json({status: false, message: err.message})
    }
}

module.exports.deletebyId = async(req,res)=>{        
    try {
        const deleted = await assetMovements.findOneAndDelete({_id: req.params.id, creator: req.user._id})

        return res.status(200).json({status: true, message: "Asset deleted successfully"})
    } catch (err) {
        return res.status(406).json({status: false, message: err.message})
    }
}

module.exports.getAll = async(req,res)=>{
    try {
        if(req.user.role != "ADMIN"){
            const allAssetMovements = await assetMovements.find({creator: req.user._id})
            return res.status(200).json({data: allAssetMovements})
        }
        const allAssetMovements = await assetMovements.find()
        return res.status(200).json({data: allAssetMovements})
    } catch (err) {
        return res.status(406).json({status: false, message: err.message})
    }
}