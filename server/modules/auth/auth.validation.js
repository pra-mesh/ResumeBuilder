/* eslint-disable quotes */
//TODO validation
const Joi = require("joi");
const userModel = require("../users/user.model");

const baseFields = {
  email: Joi.string().email().required().messages({
    "string.base": '"email" should be type of text',
    "string.email": '"email" should be type of email',
    "any.required": "email is required",
  }),
};

const emailSchema = Joi.object(baseFields).unknown(false);

const fpResetPasswordSchema = Joi.object({
  ...baseFields,
  password: Joi.string().required(),
  otp: Joi.string().required().length(6),
});

const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).allow(""),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-_])[A-Za-z\d@$!%*?&-_]{8,30}$/
    )
    .message("Password failed to meet the requirement"),
  gender: Joi.string().valid("m", "f", "o"),
  roles: Joi.array()
    .items(Joi.string().valid("admin", "user"))
    .default("admin"),
  picture: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).unknown(false);

const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().required().length(6),
}).unknown(false);

const refresh_tokenSchema = Joi.object({
  email: Joi.string().email().required(),
  refresh_token: Joi.string().required(),
}).unknown(false);

const forgetPasswordMW = async (req, _, next) => {
  try {
    await emailSchema.validateAsync(req.body);
    if (!(await hasVerifiedActiveEmail(req.body.email)))
      throw new Error("User not found");
    next();
  } catch (e) {
    next({ err: e.message, status: 400 });
  }
};

const fpResetPasswordMW = async (req, _, next) => {
  try {
    await fpResetPasswordSchema.validateAsync(req.body);
    if (!(await hasVerifiedActiveEmail(req.bod.email)))
      throw new Error("User not found");
    next();
  } catch (e) {
    next({ err: e.message, status: 400 });
  }
};

const loginValidationMw = async (req, _, next) => {
  try {
    await loginSchema.validateAsync(req.body);
    next();
  } catch (e) {
    next({ err: e.message, status: 400 });
  }
};

const resendOtpMW = async (req, _, next) => {
  try {
    await emailSchema.validateAsync(req.body);
    if (!(await hasUnVerifiedEmail(req.body.email)))
      throw new Error("User not found");
    next();
  } catch (e) {
    next({ err: e.message, status: 400 });
  }
};
const refresh_tokenMW = async (req, _, next) => {
  try {
    await refresh_tokenSchema.validateAsync(req.body);
    if (!(await hasVerifiedActiveEmail(req.body.email)))
      throw new Error("User not found");
    next();
  } catch (e) {
    next({ err: e.message, status: 400 });
  }
};

const userValidationMw = async (req, _, next) => {
  try {
    await userSchema.validateAsync(req.body);
    if (req.body.email) {
      const user = await userModel.findOne({ email: req.body.email });
      if (user) throw new Error("Email is already in use.");
    }
    next();
  } catch (e) {
    next({ err: e.message, status: 400 });
  }
};

const verifyEmailMw = async (req, _, next) => {
  try {
    await verifyEmailSchema.validateAsync(req.body);
    if (!(await hasUnVerifiedEmail(req.body.email)))
      throw new Error("User not found");
    next();
  } catch (e) {
    next({ err: e.message, status: 400 });
  }
};

const hasUnVerifiedEmail = async (email) => {
  const user = await userModel.findOne({ email, isEmailVerified: false });
  if (!user) return false;
  return true;
};

const hasVerifiedActiveEmail = async (email) => {
  const user = await userModel.findOne({
    email,
    isEmailVerified: true,
    isBlocked: false,
  });
  if (!user) return false;
  return true;
};

module.exports = {
  forgetPasswordMW,
  fpResetPasswordMW,
  loginValidationMw,
  userValidationMw,
  resendOtpMW,
  refresh_tokenMW,
  verifyEmailMw,
};
