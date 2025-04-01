import { useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import SendChatIcon from "@/assets/send-chat.svg";
import LoadingIcon from "@/assets/loading.svg";
import { generateContent } from "@/lib/gemini";

import type { IChatHistory } from "@/components/layouts/ChatMenu";

const ChatInput = ({ className, onMessageSent }: { className?: string, onMessageSent: (messages: IChatHistory[]) => void }) => {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onMessageTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }

    const sendMessage = async () => {
        if (isLoading) return;

        setIsLoading(true);
        const newMessages: IChatHistory[] = [{message, isUser: true, timestamp: new Date().toISOString()}];
        const response = await generateContent(message);
        for (const candidate of response.candidates) {
            for (const part of candidate.content.parts) {
                newMessages.push({message: part.text, isUser: false, timestamp: new Date().toISOString()});
            }
        }
        onMessageSent(newMessages);
        setMessage("");
        setIsLoading(false);
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    }

    return <div className={`${className} flex`}>
        <Textarea
            disabled={isLoading}
            onKeyUp={handleKeyUp}
            onChange={onMessageTyping}
            value={message}
            className="w-full min-h-28 max-h-60 resize-none border-2 border-zinc-600"
            placeholder="How can I help you today?"
        />
        <button onClick={sendMessage} type="button" className="p-2 flex items-end justify-end cursor-pointer hover:opacity-60">
            {isLoading ? <img className="animate-spin" src={LoadingIcon} alt="loading" /> : <img src={SendChatIcon} alt="send chat" />}
        </button>
    </div>
}

export { ChatInput };