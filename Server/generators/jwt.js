const jwt = require("jsonwebtoken");
const { env } = require("process");

/**
 *
 * @param { _id : string , email : string  role : {'ADMIN' , 'USER'}} user
 * @returns  a jwt valid token
 */

module.exports.generateToken = (user) => {
  if (user.password) delete user.password;

  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_ACCESS_TOKEN,
    {
      expiresIn: "1d",
    }
  );
};

module.exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_TOKEN);
    return decoded;
  } catch (err) {
    throw new Error("Invalid token provided");
  }
};
