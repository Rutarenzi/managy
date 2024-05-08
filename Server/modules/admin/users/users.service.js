const { hashPassword } = require("../../../generators/hashPassword");
const { generateToken } = require("../../../generators/jwt");
const { userModel } = require("../../../models/admin/user.model");
const { createUserSchema, loginSchema, updateSchema } = require("./user.schema");
const { compare } = require("bcrypt");

module.exports.createNewUser = async (req, res) => {
  try {
    const { value, error } = createUserSchema.validate(req.body);
    if (error) throw new Error(error.message);
    const hash = hashPassword(value.password);
    const user = await userModel.create({
      email: value.email,
      password: hash,
      firstName: value.firstName,
      lastName: value.lastName,
      role: value.role,
    });

    user.password = value.password;
    return res
      .status(200)
      .json({ success: true, message: "User created successfully", data: { user } });
  } catch (error) {
    console.log(error);
    return res.status(406).json({ success: false, message: error.message });
  }
};
module.exports.loginUser = async (req, res) => {
  try {
    const { value, error } = loginSchema.validate(req.body);
    if (error) throw new Error(error.message);
    const user = await userModel.findOne({ email: value.email });
    const passwordMatches = await compare(value.password, user.password);
    if (!passwordMatches) throw new Error("Invalid user credentials");
    const token = generateToken({
      _id: user._id,
      email: user.email,
      role: user.role,
    });
    return res
      .status(200)
      .json({ success: true, message: "Login successful", data: { token } });
  } catch (error) {
    console.log(error);
    return res.status(406).json({ success: false, message: error.message });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({_id: {$ne: req.user._id}});
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: { users },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message ?? "Something went wrong",
    });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await userModel.findById(id);
    const isAdmin = user.role === "ADMIN";
    const isHimself = String(user._id) === req.user._id;
    console.log(isAdmin, isHimself)
    if (isAdmin && !isHimself) {
      throw new Error("You can't delete an admin");
    }
    await userModel.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message ?? "Something went wrong",
    });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { value, error } = updateSchema.validate(req.body);
    if (error) throw new Error(error.message);
    const { id } = req.params;
    const user = await userModel.findByIdAndUpdate(id, {
      email: value.email,
      firstName: value.firstName,
      lastName: value.lastName,
      role: value.role,
    });
    const uodatedUser = await userModel.findById(id);
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: { user: uodatedUser },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message ?? "Something went wrong",
    });
  }
};
