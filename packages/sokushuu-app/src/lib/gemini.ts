interface UsageMetadata {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
}

interface CandidateContentPart {
    text: string;
}

interface CandidateContent {
    parts: CandidateContentPart[];
    role: string;
}

interface Candidate {
    content: CandidateContent;
    finishReason: string;
    avgLogprobs: number;
}

interface GenerateContentResponse {
    candidates: Candidate[];
    usageMetadata: UsageMetadata;
    modelVersion: string;
}

const generateContent = async (content: string) : Promise<GenerateContentResponse> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    console.log(apiKey)
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
            method: "POST",
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: "You are Shu, a helpful assistant of Sokushuu that can answer questions, help people study, and help people create flashcards to study." }]
                },
                contents: [{ parts: [{ text: content }] }],
            })
        }
    )
    const data = await response.json()
    const { candidates, usageMetadata, modelVersion } = data;
    return { candidates, usageMetadata, modelVersion };
}

export { generateContent };