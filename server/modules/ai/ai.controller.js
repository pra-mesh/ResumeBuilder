const openai = require("../../utils/openai");
const { cleanText } = require("../../utils/textUtil");
const generateText = async ({ userText }) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        {
          role: "user",
          content: `Rewrite the following text into a professional resume experience description, focusing on key responsibilities and achievements: 
           ${userText}  - Without any additional commentary or suggestions.`,
        },
      ],
      max_tokens: 200,
    });

    const text = cleanText(completion.choices[0].message.content);
    console.log(text);
    return text;
  } catch (e) {
    next(e);
  }
};

module.exports = { generateText };
