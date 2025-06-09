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
const experienceInfo = {
  company: Joi.string(),
  position: Joi.string(),
  location: Joi.string(),
  startDate: Joi.string(),
  endDate: Joi.string(),
  current: { type: Boolean, default: false },
  description: Joi.string(),
};
const skillsInfo = {
  name: Joi.string(),
};
const projectInfo = {
  title: Joi.string(),
  description: Joi.string(),
  technologies: Joi.array().items(Joi.string()),
  link: Joi.string(),
};
const certificationInfo = {
  name: Joi.string(),
  issuer: Joi.string(),
  date: Joi.date(),
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
