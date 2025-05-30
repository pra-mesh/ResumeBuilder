const { string, boolean, required } = require("joi");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // and option select: false can be used if you never want to retrive the data later on
    isBlocked: { type: Boolean, required: true, default: false },
    gender: { type: String, default: "m" },
    isEmailVerified: { type: Boolean, required: true, default: false },
    otp: { type: String },
    roles: { type: [String], enum: ["admin", "user"], default: "user" },
    refresh_token: { code: { type: String }, duration: { type: Date } },
    profilePic: { type: String },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
