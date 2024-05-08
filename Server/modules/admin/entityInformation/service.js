const EntityInformation = require("./model");
const entityInformationSchema = require("./schema");

const create = async (req, res) => {
  try {
    const { value, error } = entityInformationSchema.validate(req.body);
    if (error) throw new Error(error.message);

    const newEntityInformation = EntityInformation.create({
      ...value,
      creator: req.user._id,
    });

    return res
      .status(200)
      .json({
        success: true,
        message: "EntityInformation created successfully",
        data: newEntityInformation,
      });
  } catch (error) {
    console.log(error);
    return res.status(406).json({ success: false, message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const entityInformations = await EntityInformation.find();
    return res
      .status(200)
      .json({
        success: true,
        message: "All entityInformations",
        data: entityInformations,
      });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const entityInformation = await EntityInformation.findById(req.params.id);
    if (!entityInformation) throw new Error("EntityInformation not found");
    return res.status(200).json({
      success: true,
      message: "EntityInformation found",
      data: entityInformation,
    });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("EntityInformation id not found");
    const { value, error } = entityInformationSchema.validate(req.body);
    const updated = await EntityInformation.findByIdAndUpdate(
      id,
      {
        ...value
      },
      { new: true }
    );

    return res
      .status(200)
      .json({
        success: true,
        message: "EntityInformation updated successfully",
        data: updated,
      });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};

const deletebyId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("EntityInformation id not found");
    const deleted = await EntityInformation.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "EntityInformation deleted successfully",
      data: deleted,
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
