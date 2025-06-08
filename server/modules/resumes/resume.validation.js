const Joi = require("joi");

const baseFields = {
  title: Joi.string().min(3).max(50).required(),
};

const personalInfo = {
  fullName: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string(),
  address: Joi.string(),
  summary: Joi.string(),
  github: Joi.string(),
  linkedin: Joi.string(),
  website: Joi.string(),
};
const educationInfo = {
  institution: Joi.string(),
  degree: Joi.string(),
  startDate: Joi.string(),
  endDate: Joi.string(),
  course: Joi.string(),
};
const ResumeSchema = Joi.object({
  ...baseFields, //NOTES we can also spreed schema as  ...baseFields.describe().keys, we don't need this time because it is plain object
  ...personalInfo,
  educationInfo: Joi.array().items(educationInfo).optional(),
});
