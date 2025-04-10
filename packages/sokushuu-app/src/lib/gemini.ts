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
    const address = document.cookie.split('; ').find(row => row.startsWith('address='))?.split('=')[1] ?? '';
    const response = await fetch(
        `${apiUrl}/chat/wallet/message`,
        {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'X-Address': address,
            },
            body: JSON.stringify({
                content
            })
        }
    )
    const data = await response.json()
    const { candidates, usageMetadata, modelVersion } = data.data;
    return { candidates, usageMetadata, modelVersion };
}

export { generateContent };