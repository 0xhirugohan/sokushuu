
import { useState, useEffect } from "react";

import { ChatInput } from "@/components/chat/ChatInput";
import { ChatHistory } from "@/components/chat/ChatHistory";
import { getChatHistory } from "@/lib/api";

interface IChatHistory {
    message: string;
    isUser: boolean;
    timestamp: string;
}

const ChatMenu = ({ className }: { className?: string }) => {
    const [chatHistories, setChatHistories] = useState<IChatHistory[]>([]);

    useEffect(() => {
        const fetchChatHistory = async () => {
            const chatHistory = await getChatHistory();
            setChatHistories(chatHistory);
        }
        fetchChatHistory();
    }, []);

    const handleMessageSent = (messages: IChatHistory[]) => {
        const newChatHistories = [...chatHistories, ...messages];
        setChatHistories(newChatHistories);
    }

    return <div className={`${className} h-full relative`}>
        <div className="h-full">
            <ChatHistory chatHistories={chatHistories} />
        </div>
        <div className="p-4 absolute bottom-0 max-h-60 min-h-28 h-auto w-full">
            <ChatInput onMessageSent={handleMessageSent} />
        </div>
    </div>
}

export { ChatMenu };
export type { IChatHistory };