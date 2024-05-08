const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../../models/admin/user.model");
const loginSchema = require("./login.schema");
const { generateToken } = require("../../generators/jwt");

module.exports.login = async (req, res) => {
  try {
    const { value, error } = loginSchema.validate(req.body);
    if (error) throw new Error(error.message);
    console.log(req.body)

    const user = await userModel.findOne({ email: value.email });
    if (!user) throw new Error("User not found");
    const isPasswordValid = await bcrypt.compare(value.password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    const token = generateToken(user);
    return res
      .status(200)
      .json({ success: true, message: "User logged in successfully", token });
  } catch (error) {
    return res.status(406).json({ success: false, message: error.message });
  }
};
