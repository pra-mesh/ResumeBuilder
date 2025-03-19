const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

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
const generateRandomToken = () => uuidv4();
const verifyJWT = () => {};
module.exports = { generateOTP, signJWT, verifyJWT, generateRandomToken };
