const userModel = require("../users/user.model");

const bcrypt = require("../../utils/bcrypt");
const {
  generateOTP,
  signJWT,
  generateRandomToken,
} = require("../../utils/token");
const { mailEvents } = require("../../services/mailer");
const { getRefreshTokenDuration } = require("../../utils/date");

const login = async (payload) => {
  const { email, password } = payload;
  const user = await userModel.findOne({ email });

  if (!user) throw new Error("User is not found");
  if (user?.isBlocked)
    throw Error("User is blocked. Contact Admin for support");

  if (!user?.isEmailVerified) throw Error("User not verified.");
  const isValidPassword = bcrypt.compareHash(password, user?.password);
  if (!isValidPassword) throw Error("Email or password mismatched.");
  const data = {
    name: user?.name,
    email: user?.email,
    roles: user?.roles,
  };

  const rt = await generateRefreshToken(email);
  return {
    access_token: signJWT(data),
    refresh_token: rt,
    data: "User Logged in successfully",
  };
};

const register = async (payload) => {
  const { password, ...rest } = payload;
  const existingUser = await userModel.findOne({ email: rest?.email });
  if (existingUser) {
    throw new Error("Email is already in used");
  }
  rest.otp = generateOTP();
  rest.password = bcrypt.generatedHash(password);
  const newUser = await userModel.create(rest);
  if (newUser) {
    const subject = "Welcome to ProResume AI";
    const message = `Thank you for singing up. Welcome ${rest?.name} \n Please use the code to verify your email
    \n Code: ${rest.otp} `;
    mailEvents.emit("sendMail", rest?.email, subject, message);
  }
};

const verifyEmail = async (payload) => {
  const { email, otp } = payload;
  if (otp.length !== 6) throw new Error("Invalid OTP");
  const user = await userModel.findOne({ email, isEmailVerified: false });
  const isValidOTP = user.otp === String(otp);
  if (!isValidOTP) throw new Error("OTP mismatch");
  const updatedUser = await userModel.updateOne(
    { email },
    { isEmailVerified: true, otp: "" }
  );
  if (updatedUser) {
    const subject = "User verified";
    const message = `Thank you ${user.name} for verifying. Welcome to PRO RESUME AI`;
    mailEvents.emit("sendMail", email, subject, message);
  }
};

const resendOTP = async (payload) => {
  const { email } = payload;
  const otp = generateOTP();
  const usrUpdate = await userModel.findOneAndUpdate({ email }, { otp });
  if (usrUpdate) {
    const subject = "User Verification";
    const message = `Hello ${usrUpdate?.name} \n Your new verification code is ${otp}`;
    mailEvents.emit("sendMail", email, subject, message);
  }
};

const refreshToken = async (payload) => {
  const { email, refresh_token } = payload;
  const user = await userModel.findOne({
    email,
    isEmailVerified: true,
    isBlocked: false,
  });
  const { refresh_token: rt_in_db } = user;
  if (rt_in_db.code !== refresh_token) throw Error("Token mismatch");
  const currentTime = new Date();
  const databaseTime = new Date(rt_in_db.duration);
  if (databaseTime < currentTime) throw new Error("Token Expired");
  const data = {
    name: user?.name,
    email: user?.email,
    roles: user?.roles,
  };
  return {
    access_token: signJWT(data),
    refresh_token: await generateRefreshToken(email),
  };
};

const generateRefreshToken = async (email) => {
  const rt = generateRandomToken();
  const rt_duration = getRefreshTokenDuration();
  const updatedUser = await userModel.updateOne(
    { email },
    { refresh_token: { code: rt, duration: rt_duration } }
  );
  if (!updatedUser) throw Error("Something went wrong");
  return rt;
};

const forgetPassword = async ({ email }) => {
  const fpToken = generateOTP();
  const updatedUser = await userModel.updateOne({ email }, { otp: fpToken });
  if (updatedUser) {
    const subject = "Forget Password";
    const message = `Your reset code to change password is ${fpToken}`;
    mailEvents.emit("sendMail", email, subject, message);
  }
};

const fpResetPassword = async (payload) => {
  const { email, otp, password } = payload;
  const user = await userModel.findOne({
    email,
    isEmailVerified: true,
    isBlocked: false,
  });
  if (user?.otp !== otp) throw new Error("Token mismatch");
  const hashpassword = bcrypt.generatedHash(password);
  const updatedUser = await userModel.updateOne(
    { email },
    { password: hashpassword, otp: "" }
  );
  if (updatedUser) {
    const subject = "Password Changed Successfully.";
    const message =
      "Your password has been changed successfully. Please contact admin for unathorized changed.";
    mailEvents.emit("sendMail", email, subject, message);
  }
};

module.exports = {
  login,
  forgetPassword,
  refreshToken,
  register,
  resendOTP,
  fpResetPassword,
  verifyEmail,
};
