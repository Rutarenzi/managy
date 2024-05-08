const schema = require("./schema");
const  educationLevelsModel = require("./model");

const create = async (req, res) => {
  try {
    const { value, error } = schema.validate(req.body);
    if (error) throw new Error(error.message);
    const educationLevels = await educationLevelsModel.create(value);
    return res.status(200).json({
      success: true,
      message: "educationLevels created successfully",
      data: educationLevels,
    });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const educationLevels = await educationLevelsModel.find();
    return res.status(200).json({
      success: true,
      message: "All educationLevels",
      data: educationLevels,
    });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const educationLevels = await educationLevelsModel.findById(req.params.id);
    if (!educationLevels) throw new Error("educationLevels not found");
    return res.status(200).json({
      success: true,
      message: "educationLevels found",
      data: educationLevels,
    });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("education level id not found");
    const { value, error } = schema.validate(req.body);
    if (error) throw new Error(error.message);
    const updatedLevel = await educationLevelsModel.findByIdAndUpdate(
      id,
      value,
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      message: "education level updated successfully",
      data: updatedLevel,
    });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

const deletebyId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("education level id not found");
    const removedLevel = await educationLevelsModel.findByIdAndRemove(id);
    return res.status(200).json({
      success: true,
      message: "education level removed successfully",
      data: removedLevel,
    });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};


module.exports = {
    create,
    getAll,
    getById,
    update,
    deletebyId,
};