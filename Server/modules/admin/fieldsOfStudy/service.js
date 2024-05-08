const schema = require("./schema");
const fieldStudyModel = require("./model");

const create = async (req, res) => {
  try {
    const { value, error } = schema.validate(req.body);
    if (error) throw new Error(error.message);
    const fieldStudy = await fieldStudyModel.create(value);
    return res.status(200).json({
      success: true,
      message: "fieldStudy created successfully",
      data: fieldStudy,
    });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const fieldStudy = await fieldStudyModel.find();
    return res.status(200).json({
      success: true,
      message: "All fieldStudy",
      data: fieldStudy,
    });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const fieldStudy = await fieldStudyModel.findById(req.params.id);
    if (!fieldStudy) throw new Error("fieldStudy not found");
    return res.status(200).json({
      success: true,
      message: "fieldStudy found",
      data: fieldStudy,
    });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("fieldStudy id not found");
    const { value, error } = schema.validate(req.body);
    if (error) throw new Error(error.message);
    const updatedBank = await fieldStudyModel.findByIdAndUpdate(id, value, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "fieldStudy updated successfully",
      data: updatedBank,
    });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

const deletebyId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("fieldStudy id not found");
    const deleted = await fieldStudyModel.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "fieldStudy deleted successfully",
      data: deleted,
    });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

module.exports = { create, getAll, getById, update, deletebyId };