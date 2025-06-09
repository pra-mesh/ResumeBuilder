const Joi = require("joi");
const userModel = require("./user.model");
const { isUserVerifiedId } = require("../../utils/validUsers");

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  password: Joi.string()
    .password()
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/
    )
    .message("Password failed to meet the requirement"),
});

const userProfile = {
  name: Joi.string().min(3).max(50).allow("").required(),
  gender: Joi.string().valid("m", "f", "o").default("m"),
  picture: Joi.string().optional(),
};

const updateProfileSchema = Joi.object(userProfile);

const userSchema = {
  ...userProfile,
  email: Joi.string().email.required(),
  roles: Joi.array()
    .items(Joi.string().valid("admin", "user"))
    .default("admin"),
};
const userValidationMw = async (req, res, next) => {
  try {
    await userSchema.validateAsync(req.body);
    const user = await userModel.findOne({ email: req.body.email });
    if (user) throw new Error("Email Validation is already in use.");
    next();
  } catch (e) {
    next({ err: e.message, status: 400 });
  }
};

const userUpdateValidationMw = async (req, _, next) => {
  try {
    await userSchema.validateAsync(req.body);
    const user = await userModel.findOne({
      _id: req.params.id,
    });
    if (!user) throw Error("User not found");
    next();
  } catch (e) {
    next({ err: e.message, status: 400 });
  }
};
const changePasswordMw = async (req, _, next) => {
  try {
    await changePasswordSchema.validateAsync(req.body);
    next();
  } catch (e) {
    next({ err: e.message, status: 400 });
  }
};

const updateProfileMW = async (req, _, next) => {
  try {
    if (!isUserVerifiedId(req.currentUser)) throw new Error("Invalid user");
    await updateProfileSchema.validateAsync(req.body);
    next();
  } catch (e) {
    next({ err: e.message, status: 400 });
  }
};

module.exports = {
  userValidationMw,
  userUpdateValidationMw,
  changePasswordMw,
  updateProfileMW,
};
