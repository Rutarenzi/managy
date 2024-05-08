const { officeLocationModel } = require('../../../models/referenceData/officeLocation');
const { officeLocationSchema } = require('./schema');

module.exports.create = async (req, res) => {
    try {
        const { value, error } = officeLocationSchema.validate(req.body)
        if (error) throw new Error(error.message)

        //check if it exists
        const exists = await officeLocationModel.findOne({ name: value.name })
        if (exists) throw new Error('Office Location already exists')

        const newOfficeLocation = await officeLocationModel.create({
            name: value.name,
            creator: req.user._id
        })

        res.status(200).json({ message: "Office Location created successfully", officeLocation: newOfficeLocation });
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
};

module.exports.getAll = async (req, res) => {
    try {
        const allOfficeLocations = await officeLocationModel.find();
        return res.status(200).json({ data: allOfficeLocations });
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
};

module.exports.getById = async (req, res) => { 
    try {
        const id = req.params.id;
        if(!id) throw new Error("Missing or Invalid ID");

        const officeLocation = await officeLocationModel.findById(id);
        if(!officeLocation) throw new Error("Not found");

        return res.status(200).json({ data: officeLocation });
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
};

module.exports.update = async (req, res) => { 
    try {
        const _id = req.params.id;
        if(!_id) throw new Error("Missing or Invalid ID");

        const { value, error } = officeLocationSchema.validate(req.body);
        if (error) throw new Error(error.message);

        await officeLocationModel.updateOne({_id}, {...value});

        res.status(200).json({ message: "Office Location updated successfully" });

    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
};

module.exports.delete = async (req, res) => { 
    try {
        const _id = req.params.id;
        if(!_id) throw new Error("Missing or Invalid ID");

        await officeLocationModel.findByIdAndDelete(_id)

        res.status(200).json({ message: "Office Location deleted successfully" });
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
};