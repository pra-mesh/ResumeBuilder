const OpenAI = require("openai");

const openai = new OpenAI({
  baseURL: process.env.AI_URL,
  apiKey: process.env.AI_KEY,
});

module.exports = openai;
