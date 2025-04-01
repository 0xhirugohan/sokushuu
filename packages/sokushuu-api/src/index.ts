import { Elysia, t } from "elysia";

const llm = new Elysia({ prefix: "/llm" })
  .post("/generate", async ({ body }) => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
              method: "POST",
              body: JSON.stringify({
                  system_instruction: {
                      parts: [{ text: "You are Shu, a helpful assistant of Sokushuu that can answer questions, help people study, and help people create flashcards to study." }]
                  },
                  contents: [{ parts: [{ text: body.content}] }],
              })
          }
      )
      const data = await response.json()
      const { candidates, usageMetadata, modelVersion } = data;
      return { candidates, usageMetadata, modelVersion };
    } catch (error) {
      console.error(error)
      return { error: "Failed to generate content" }
    }
  }, {
    body: t.Object({
      content: t.String({ minLength: 1 }),
    }),
    parse: 'application/json',
  });

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(llm)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
