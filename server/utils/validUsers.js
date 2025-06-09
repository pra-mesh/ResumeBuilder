const userModel = require("./user.model");

const hasVerifiedActiveEmail = async (email) => {
  const user = await userModel.findOne({
    email,
    isEmailVerified: true,
    isBlocked: false,
  });
  if (!user) return false;
  return true;
};

const hasUnVerifiedEmail = async (email) => {
  const user = await userModel.findOne({ email, isEmailVerified: false });
  if (!user) return false;
  return true;
};
const isUserVerifiedId = async (currentUser) => {
  const user = await userModel.findOne({
    _id: currentUser,
    isEmailVerified: true,
    isBlocked: false,
  });
  if (!user) return false;
  return true;
  //return !!user; //can be used this way too.
};

module.exports = {
  hasUnVerifiedEmail,
  hasVerifiedActiveEmail,
  isUserVerifiedId,
};
