import { useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import SendChatIcon from "@/assets/send-chat.svg";

const ChatInput = ({ className }: { className?: string }) => {
    const [message, setMessage] = useState("");

    const onMessageTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }

    const sendMessage = () => {
        setMessage("");
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    }

    return <div className={`${className} flex`}>
        <Textarea
            onKeyUp={handleKeyUp}
            onChange={onMessageTyping}
            value={message}
            className="w-full min-h-28 max-h-60 resize-none border-2 border-zinc-600"
            placeholder="How can I help you today?"
        />
        <button onClick={sendMessage} type="button" className="p-2 flex items-end justify-end cursor-pointer hover:opacity-60">
            <img src={SendChatIcon} alt="send chat" />
        </button>
    </div>
}

export { ChatInput };