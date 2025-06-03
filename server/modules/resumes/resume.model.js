const { string, required } = require("joi");
const { Schema, model } = require("mongoose");
const { ObjectID } = Schema.Types;
const schema = new Schema(
  {
    title: { type: String, required: true },
    user: { type: ObjectID },
    personalInfo: {
      fullName: { type: String },
      email: { type: String },
      phone: { type: String },
      address: { type: String },
      summary: { type: String },
      github: { type: String },
      linkedin: { type: String },
      website: { type: String },
    },
    education: [
      {
        institution: { type: String },
        degree: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        course: { type: String },
      },
    ],
    experience: [
      {
        company: { type: String },
        position: { type: String },
        location: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        current: { type: Boolean, default: false },
        description: { type: String },
      },
    ],
    skills: [
      {
        name: { type: String },
      },
    ],
    projects: [
      {
        title: { type: String },
        description: { type: String },
        technologies: [{ type: String }],
        link: { type: String },
      },
    ],
    certification: [
      {
        name: { type: String },
        issuer: { type: String },
        date: { type: Date },
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = model("Resume", schema);
