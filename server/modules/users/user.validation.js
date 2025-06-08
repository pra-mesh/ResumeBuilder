const Joi = require("joi");
const userModel = require("./user.model");
const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).allow(""),
  email: Joi.string().email.required(),
  password: Joi.string()
    .password()
    .message("Invalid Password")
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/
    )
    .message("Password failed to meet the requirement"),
  gender: Joi.string().valid("m", "f", "o"),
  roles: Joi.array()
    .items(Joi.string().valid("admin", "user"))
    .default("admin"),
  picture: Joi.string(),
});

const userValidationMw = async (req, res, next) => {
  try {
    await userSchema.validateAsync(req.body);
    if (req.body.email) {
      const user = await userModel.findOne({ email: req.body.email });
      if (user) throw new Error("Email Validation is already in use.");
    }
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = { userValidationMw };
