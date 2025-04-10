import { Context } from "hono";
import { env } from "hono/adapter";

interface GenerateChatCompletionResponse {
    candidates: { content: { parts: { text: string }[] } }[];
    usageMetadata: {
        promptTokenCount: number;
        completionTokenCount: number;
    };
    modelVersion: string;
}

const generateChatCompletion = async (c: Context, message: string) => {
    try {
      const { GEMINI_API_KEY: apiKey } = env<{ GEMINI_API_KEY: string }>(c);
      console.log(apiKey);
      const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
              method: "POST",
              body: JSON.stringify({
                  system_instruction: {
                      parts: [{ text: "You are Shu, a helpful assistant of Sokushuu that can answer questions, help people study, and help people create flashcards to study." }]
                  },
                  contents: [{ parts: [{ text: message}] }],
              })
          }
      )
      const data: GenerateChatCompletionResponse = await response.json()
      const { candidates, usageMetadata, modelVersion } = data;
      return { candidates, usageMetadata, modelVersion };
    } catch (error) {
      throw new Error("Failed to generate content")
    }
};

export { generateChatCompletion };
