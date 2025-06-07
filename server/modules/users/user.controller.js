const userModel = require("./user.model");

const { mailEvents } = require("../../services/mailer");
const { generatedHash, compareHash } = require("../../utils/bcrypt");
const { generatePassword } = require("../../utils/textUtil");
const { generateOTP } = require("../../utils/token");

const addUser = async (payload) => {
  const { email, name, roles = [], gender, profilePic } = payload;
  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error("Email is already in used");
  const randomPassword = generatePassword();
  const password = generatedHash(randomPassword);
  const otp = generateOTP();
  const userRoles = roles.length === 0 ? ["user"] : roles;
  const userPayload = {
    name,
    email,
    password,
    gender,
    roles: userRoles,
    otp,
    profilePic,
  };
  const newUser = await userModel.create(userPayload);
  if (newUser) {
    const subject = "Welcome to ProResume AI";
    const message = `Thank you for singing up. Welcome ${name} \n Please use the code to verify your email
      \n Code: ${otp}. Your password is ${randomPassword} please change it after email verification.`;
    mailEvents.emit("sendMail", email, subject, message);
  }
  return { data: "User added successfully" };
};

const blockUser = async (id) => {
  const user = await userModel.findOne({ _id: id });
  if (!user) throw new Error("User not found");
  const result = await userModel.updateOne(
    { _id: id },
    { isBlocked: !user?.isBlocked }
  );
  if (result.acknowledged) {
    return {
      data: `User ${user?.isBlocked ? "unblocked" : "blocked"} successfully`,
    };
  }
};

const changePassword = async (currentUser, payload) => {
  const { oldPassword, password } = payload;
  const user = await userModel.findOne({
    _id: currentUser,
    isEmailVerified: true,
    isBlocked: false,
  });
  if (!user) throw Error("User not found");
  const validPassword = compareHash(oldPassword, user.password);
  if (!validPassword) throw Error("Email or password mismatch");
  const newPassword = generatedHash(password);
  const updatedUser = await userModel.updateOne(
    { _id: currentUser },
    { password: newPassword }
  );
  if (updatedUser) {
    mailEvents.emit(
      "sendMail",
      user?.email,
      "Password has been Reset",
      `Your password has been changed successfully.`
    );
  }
};

const getProfile = async (currentUser) =>
  await userModel
    .findById({ _id: currentUser })
    .select("-_id -password -refresh_token -otp -__v");

const getByID = async (id) =>
  await userModel
    .findById({ _id: id })
    .select("-password -refresh_token -otp -__v");

const list = async ({ page = 1, limit = 10, search }) => {
  const query = [];
  if (search?.email) {
    query.push({
      $match: {
        email: new RegExp(search?.email, "gi"),
      },
    });
  }
  if (search?.gender) {
    query.push({
      $match: {
        gender: search?.gender.toLowerCase(),
      },
    });
  }
  if (search?.name) {
    query.push({
      $match: {
        name: new RegExp(search?.name, "gi"),
      },
    });
  }
  query.push(
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (+page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ],
      },
    },
    {
      $addFields: {
        total: { $arrayElemAt: ["$metadata.total", 0] },
      },
    },
    {
      $project: {
        metadata: 0,
        "data.password": 0,
        "data.__v": 0,
        "data.otp": 0,
        "data.refresh_token": 0,
      },
    }
  );
  const result = await userModel.aggregate(query);
  return result[0] || { data: [], total: 0 };
};

const restPassword = async ({ email }) => {
  const user = await userModel.findOne({
    email,
    isEmailVerified: true,
    isBlocked: false,
  });
  if (!user) throw Error("User not found");
  const password = generatePassword();
  const newPassword = generatedHash(password);
  const updatedUser = await userModel.updateOne(
    { email },
    { password: newPassword }
  );
  if (updatedUser) {
    mailEvents.emit(
      "sendMail",
      email,
      "Password has been Reset",
      `Your password has been changed by admin. Your new password is ${password}`
    );
  }
};
//TODO send total users count use Aggregations
const userReport = async ({ from, to = Date.now() }) => {
  const query = { createdAt: { $lte: to } };
  if (from) {
    query.createdAt.$gte = from;
  }
  const user = await userModel
    .find(query)
    .select("-_id -password -refresh_token -otp -__v");
  return user;
};

const updateProfile = async (currentUser, payload) => {
  const user = await userModel.findOne({
    _id: currentUser,
    isEmailVerified: true,
    isBlocked: false,
  });
  if (!user) throw Error("User not found");
  const newPayload = {
    name: payload?.name,
    gender: payload?.gender.toLowerCase(),
     profilePic: payload?.profilePic,
  };
  const updatedUser = await userModel
    .findOneAndUpdate({ _id: currentUser }, newPayload, { new: true })
    .select("-_id -password -refresh_token -otp -__v -updatedAt");
  if (!updatedUser) throw new Error("Something went wrong");
  return updatedUser;
};

const updateUser = async (id, payload) => {
  const user = await userModel.findOne({
    _id: id,
  });
  if (!user) throw Error("User not found");

  const userRoles = payload.roles.length === 0 ? ["user"] : payload.roles;
  const newPayload = {
    name: payload?.name,
    gender: payload?.gender.toLowerCase(),
    isBlocked: payload?.isBlocked,
    roles: userRoles,
    profilePic: payload?.profilePic,
  };
  const updatedUser = await userModel
    .findOneAndUpdate({ _id: id }, newPayload, { new: true })
    .select("-_id -password -refresh_token -otp -__v");
  if (!updatedUser) throw new Error("Something went wrong");
  return updatedUser;
};

module.exports = {
  addUser,
  blockUser,
  changePassword,
  getProfile,
  getByID,
  list,
  restPassword,
  updateProfile,
  updateUser,
  userReport,
};
