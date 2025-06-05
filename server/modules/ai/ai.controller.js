const openai = require("../../utils/openai");
const { z } = require("zod");
const { systemPrompt } = require("./ai.prompt");

const RewrittenTextSchema = z.object({
  data: z.string(),
});

const generateText = async ({ query }) => {
  try {
    const completion = await openai.chat.completions.create({
      model: process.env.AI_MODEL,
      messages: [
        systemPrompt,
        {
          role: "user",
          content: query,
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
    throw new Error(e);
  }
};

module.exports = { generateText };
