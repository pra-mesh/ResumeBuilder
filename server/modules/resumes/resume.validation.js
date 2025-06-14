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
  github: Joi.string().optional().allow(""),
  linkedin: Joi.string().optional().allow(""),
  website: Joi.string().optional().allow(""),
};
const educationInfo = {
  institution: Joi.string().allow(""),
  degree: Joi.string().allow(""),
  startDate: Joi.string().allow(""),
  endDate: Joi.string().allow(""),
  course: Joi.string(),
};
const experienceInfo = {
  company: Joi.string().allow(""),
  position: Joi.string().allow(""),
  location: Joi.string().allow(""),
  startDate: Joi.string().allow(""),
  endDate: Joi.string().allow(""),
  current: Joi.boolean().default(false),
  description: Joi.string().allow(""),
};
const skillsInfo = {
  name: Joi.string().allow(""),
};
const projectInfo = {
  title: Joi.string().allow(""),
  description: Joi.string().allow(""),
  technologies: Joi.array().items(Joi.string()).allow(""),
  link: Joi.string().allow(""),
};
const certificationInfo = {
  name: Joi.string().allow(""),
  issuer: Joi.string().allow(""),
  date: Joi.date().allow(""),
};

const ResumeSchema = Joi.object({
  ...baseFields, //NOTES we can also spreed schema as  ...baseFields.describe().keys, we don't need this time because it is plain object
  personalInfo: Joi.object(personalInfo),
  education: Joi.array().items(educationInfo).optional(),
  experience: Joi.array().items(experienceInfo).optional(),
  skills: Joi.array().items(skillsInfo).optional(),
  projects: Joi.array().items(projectInfo).optional(),
  certifications: Joi.array().items(certificationInfo).optional(),
  template: Joi.string()
    .valid("modern", "classic", "minimal")
    .required()
    .default("modern"),
  status: Joi.string().valid("draft", "final").required().default("draft"),
});

const resumeValidator = async (req, _, next) => {
  try {
    await ResumeSchema.validateAsync(req.body);
    next();
  } catch (e) {
    next({ err: e.message, status: 400 });
  }
};
module.exports = { resumeValidator };
