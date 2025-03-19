const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const generateOTP = () => {
  return crypto.randomInt(100000, 999999);
};

const signJWT = (data) =>
  jwt.sign(
    {
      data,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_DURATION }
  );
const verifyJWT = () => {};
module.exports = { generateOTP, signJWT, verifyJWT };
