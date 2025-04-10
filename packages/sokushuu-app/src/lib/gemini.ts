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
    const apiUrl = import.meta.env.VITE_API_URL
    const response = await fetch(
        `${apiUrl}/chat/wallet/message`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content
            })
        }
    )
    const data = await response.json()
    const { candidates, usageMetadata, modelVersion } = data.data;
    console.log({ candidates, usageMetadata, modelVersion })
    return { candidates, usageMetadata, modelVersion };
}

export { generateContent };