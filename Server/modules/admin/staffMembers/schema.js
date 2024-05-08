const Joi = require("joi");
const StaffMemberSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  Fname: Joi.string().min(2),
  Lname: Joi.string().min(2),
  email: Joi.string(),
  password: Joi.string(),
  department: Joi.string(),
  jobTitle: Joi.string(),
  maritalStatus: Joi.string(),
  active: Joi.boolean(),
});
module.exports = StaffMemberSchema;
