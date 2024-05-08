const staffLevelModel = require('../../../models/referenceData/staffLevel');
const { staffLevelSchema } = require('./schema');

module.exports.create = async (req, res) => {
    try {
        const { value, error } = staffLevelSchema.validate(req.body)
        if (error) throw new Error(error.message)

        //check if it exists
        const exists = await staffLevelModel.findOne({ name: value.name })
        if (exists) throw new Error('Staff Level already exists')


        const newStaffLevel = await staffLevelModel.create({
            name: value.name,
            creator: req.user._id
        })

        res.status(200).json({ success: true, message: "Staff Level created successfully", staffLevel: newStaffLevel });
    } catch (err) {
        res.status(406).json({ success: false, message: err.message });
    }
};

module.exports.getAll = async (req, res) => {
    try {
        const allStaffLevels = await staffLevelModel.find();
        return res.status(200).json({ data: allStaffLevels });
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
};

module.exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error("Missing or Invalid ID");

        const staffLevel = await staffLevelModel.findById(id);
        if (!staffLevel) throw new Error("Not found");

        return res.status(200).json({ data: staffLevel });
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
};

module.exports.update = async (req, res) => {
    try {
        const _id = req.params.id;
        if (!_id) throw new Error("Missing or Invalid ID");

        const { value, error } = staffLevelSchema.validate(req.body);
        if (error) throw new Error(error.message);

        await staffLevelModel.updateOne({ _id }, { ...value });

        res.status(200).json({ message: "Staff Level updated successfully" });

    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
};

module.exports.delete = async (req, res) => {
    try {
        const _id = req.params.id;
        if (!_id) throw new Error("Missing or Invalid ID");

        await staffLevelModel.findByIdAndDelete(_id)

        res.status(200).json({ message: "Staff Level deleted successfully" });
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
};