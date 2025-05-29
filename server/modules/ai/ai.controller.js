const openai = require("../../utils/openai");
const { z } = require("zod");

const RewrittenTextSchema = z.object({
  data: z.string(),
});

const generateText = async ({ userText }) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        {
          role: "system",
          content:
            "As a professional resume writer, your task is to rewrite the user's text into a polished and professional resume experience description in a paragraph. Focus on key responsibilities and achievements, ensuring clarity and conciseness. Avoid any additional commentary or suggestions.",
        },
        {
          role: "user",
          content: userText,
        },
      ],
    });
    const rawRewrittenText = completion.choices[0]?.message?.content;
    const parsedResult = RewrittenTextSchema.safeParse({
      data: rawRewrittenText.trim(),
    });
    if (parsedResult.success) {
      return parsedResult.data;
    } else {
      throw new Error("Invalid response from OpenAI");
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { generateText };
