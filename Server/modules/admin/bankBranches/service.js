const model = require("./model");
const schema = require("./schema");

const create = async (req, res) => {
  try {
    const { value, error } = schema.validate(req.body);
    if (error) throw new Error(error.message);
    const bankBracnches = await model.create(value);
    return res.status(200).json({
      success: true,
      message: "bankBracnches created successfully",
      data: bankBracnches,
    });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const bankBracnches = await model.find().populate('bank');
    return res.status(200).json({
      success: true,
      message: "All bankBracnches",
      data: bankBracnches,
    });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const bankBracnches = await model.findById(req.params.id).populate('bank');
    if (!bankBracnches) throw new Error("bankBracnches not found");
    return res.status(200).json({
      success: true,
      message: "bankBracnches found",
      data: bankBracnches,
    });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("banks id not found");
    const { value, error } = schema.validate(req.body);
    if (error) throw new Error(error.message);
    const updatedBankBranches = await model.findByIdAndUpdate(id, value, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "banks updated successfully",
      data: updatedBankBranches,
    });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

const deletebyId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("banks id not found");
    const deletedBankBranches = await model.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "banks deleted successfully",
      data: deletedBankBranches,
    });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

module.exports = { create, getAll, getById, update, deletebyId };