const StaddMemberSchema = require("./schema");
const StaffMember = require("./model");

module.exports.createStaffMember = async (req, res) => {
  try {
    const { value, error } = StaddMemberSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    const emailExists = await StaffMember.findOne({ email: value.email });
    if (emailExists) throw new Error("email already exists");
    const staffMember = new StaffMember({
      ...value,
      creator: req.user._id
    });
    const savedStaffMember = await staffMember.save();
    return res
      .status(200)
      .json({
        success: true,
        message: "Staff member added successfully",
        data: savedStaffMember,
      });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports.getStaffMember = async (req, res) => {
  try {
    const staffMember = await StaffMember.findById(req.params.id).populate({
      path: "Jobtitle",
      select: "name",
    });
    if (!staffMember) throw new Error("Staff member not found");
    res
      .status(200)
      .json({
        success: true,
        message: "Staff member found",
        data: staffMember,
      });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports.deleteStaffMember = async (req, res) => {
  try {
    const deletedStaffMember = await StaffMember.findByIdAndDelete(
      req.params.id
    );
    if (!deletedStaffMember) throw new Error("Staff member not found");
    res
      .status(200)
      .json({
        success: true,
        message: "Staff member deleted successfully",
        data: deletedStaffMember,
      });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports.updateStaffMember = async (req, res) => {
  const { value, error } = StaddMemberSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  try {
    const updatedStaffMember = await StaffMember.findByIdAndUpdate(
      req.params.id,
      {
        ...value
      },
      { new: true }
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Staff member updated successfully",
        data: updatedStaffMember,
      });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports.getAllStaffMembers = async (req, res) => {
  try {
    const staffMembers = await StaffMember.find().populate('jobTitle').populate('department');
    res
      .status(200)
      .json({
        success: true,
        message: "Staff members found",
        data: staffMembers,
      });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
