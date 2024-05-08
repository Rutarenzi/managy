const Joi = require("joi");

const createUserSchema = Joi.object({
  email: Joi.string().min(2).required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(20).required(),
  role: Joi.string().valid("USER", "ADMIN"),
});

const loginSchema = Joi.object({
  email: Joi.string().min(2).max(20).required(),
  password: Joi.string().min(8).required(),
});

const updateSchema = Joi.object({
  email: Joi.string().min(2).email().max(40),
  password: Joi.string().min(8),
  firstName: Joi.string().min(2).max(20),
  lastName: Joi.string().min(2).max(20),
  role: Joi.string().valid("USER", "ADMIN"),
});

module.exports = {
  createUserSchema,
  loginSchema,
  updateSchema,
};
