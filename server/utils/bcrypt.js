const bcryptjs = require("bcryptjs");

const generatedHash = (password) =>
  bcryptjs.hashSync(password, +process.env.SALT_ROUND);

const compareHash = (password, hashPw) =>
  bcryptjs.compareSync(password, hashPw);

module.exports = { generatedHash, compareHash };
