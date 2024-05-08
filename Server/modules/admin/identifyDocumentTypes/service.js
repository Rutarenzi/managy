const { identifyDocumentTypeModel } = require('../../../models/referenceData/identifyDocumentType');
const { identifyDocumentTypeSchema } = require('./schema');

module.exports.create = async (req, res) => {
    try {
        const { value, error } = identifyDocumentTypeSchema.validate(req.body)
        if (error) throw new Error(error.message)

        //check if it exists
        const exists = await identifyDocumentTypeModel.findOne({ name: value.name })
        console.log(exists)
        if (exists) throw new Error('Identify Document Type already exists')

        const newIdentifyDocumentType = await identifyDocumentTypeModel.create({
            name: value.name,
            creator: req.user._id
        })

        res.status(200).json({ message: "Identify Document Type created successfully", identifyDocumentType: newIdentifyDocumentType });
    } catch (err) {
        console.log("[error]", err.message)
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports.getAll = async (req, res) => {
    try {
        const allIdentifyDocumentTypes = await identifyDocumentTypeModel.find();
        return res.status(200).json({ data: allIdentifyDocumentTypes });
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
};

module.exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error("Missing or Invalid ID");

        const identifyDocumentType = await identifyDocumentTypeModel.findById(id);
        if (!identifyDocumentType) throw new Error("Not found");

        return res.status(200).json({ data: identifyDocumentType });
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
};

module.exports.update = async (req, res) => {
    try {
        const _id = req.params.id;
        if (!_id) throw new Error("Missing or Invalid ID");

        const { value, error } = identifyDocumentTypeSchema.validate(req.body);
        if (error) throw new Error(error.message);

        await identifyDocumentTypeModel.updateOne({ _id }, { ...value });

        res.status(200).json({ message: "Identify Document Type updated successfully" });

    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
};

module.exports.delete = async (req, res) => {
    try {
        const _id = req.params.id;
        if (!_id) throw new Error("Missing or Invalid ID");

        await identifyDocumentTypeModel.findByIdAndDelete(_id)

        res.status(200).json({ message: "Identify Document Type deleted successfully" });
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
};