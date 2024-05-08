const schema = require("./schema");
const banksModel = require("./model");

const create = async (req, res) => {
  try {
    const { value, error } = schema.validate(req.body);
    if (error) throw new Error(error.message);
    const banks = await banksModel.create(value);
    return res.status(200).json({
      success: true,
      message: "banks created successfully",
      data: banks,
    });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const banks = await banksModel.find();
    return res.status(200).json({
      success: true,
      message: "All banks",
      data: banks,
    });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const banks = await banksModel.findById(req.params.id);
    if (!banks) throw new Error("banks not found");
    return res.status(200).json({
      success: true,
      message: "banks found",
      data: banks,
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
    const updatedBank = await banksModel.findByIdAndUpdate(id, value, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "banks updated successfully",
      data: updatedBank,
    });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

const deletebyId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("banks id not found");
    const deleted = await banksModel.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "banks deleted successfully",
      data: deleted,
    });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

module.exports = { create, getAll, getById, update, deletebyId };
