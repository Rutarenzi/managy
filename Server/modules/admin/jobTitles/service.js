const { jobTitleModel } = require('../../../models/referenceData/jobTitle');
const  jobTitleSchema  = require('./schema');

module.exports.create = async (req, res) => {
    try {
        const { value, error } = jobTitleSchema.validate(req.body)
        if (error) throw new Error(error.message)
        //check if it exists
        const exists = await jobTitleModel.findOne({ name: value.name })
        if (exists) throw new Error('Job Title already exists')

        const newJobTitle = await JobTitle.create({
            ...value,
            creator: req.user._id
        })

        res.status(200).json({ success: true, message: "Job Title created successfully", jobTitle: newJobTitle });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports.getAll = async (req, res) => {
    try {
        const allJobTitles = await jobTitleModel.find().populate('staffLevel')
        return res.status(200).json({ data: allJobTitles });
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
};

module.exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error("Missing or Invalid ID");

        const jobTitle = await jobTitleModel.findById(id).populate('staffLevel')
        if(!jobTitle) throw new Error("Not found");

        return res.status(200).json({ data: jobTitle });
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
};

module.exports.update = async (req, res) => {
    try {
        const _id = req.params.id;
        if (!_id) throw new Error("Missing or Invalid ID");

        const { value, error } = jobTitleSchema.validate(req.body);
        if (error) throw new Error(error.message);

        await jobTitleModel.updateOne({ _id }, { ...value });

        res.status(200).json({ message: "Job Title updated successfully" });

    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
};

module.exports.delete = async (req, res) => {
    try {
        const _id = req.params.id;
        if (!_id) throw new Error("Missing or Invalid ID");

        await jobTitleModel.findByIdAndDelete(_id)

        res.status(200).json({ message: "Job Title deleted successfully" });
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
};