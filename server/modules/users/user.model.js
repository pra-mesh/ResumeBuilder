const { Schema, model } = require("mongoose");
//NOTES error message can be customize with square brackets
//TOLearn custom validation
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // NOTES add option select: false can be used if you never want to retrieve the data later on
    isBlocked: { type: Boolean, required: true, default: false },
    gender: {
      type: String,
      default: "m",
      validate: [
        {
          validator: (value) => value.length === 1, //function
          message: (props) => `${props.value} invalid gender`,
        },
        {
          validator: (value) => ["m", "f", "o"].includes(value), //function
          message: (props) => `${props.value} invalid gender`,
        },
      ],
    },
    isEmailVerified: { type: Boolean, required: true, default: false },
    otp: { type: String },
    roles: { type: [String], enum: ["admin", "user"], default: "user" },
    refresh_token: { code: { type: String }, duration: { type: Date } },
    profilePic: { type: String },
  },
  { timestamps: true }
);
userSchema.path("email").validate({
  validator: function (value) {
    return /\S+@\S+\.\S+/.test(value); // Simple email regex
  },
  message: (props) => `${props.value} is not a valid email address!`,
});

module.exports = model("User", userSchema);
