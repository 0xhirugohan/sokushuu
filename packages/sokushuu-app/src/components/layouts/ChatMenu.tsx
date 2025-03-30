import { ChatInput } from "@/components/chat/ChatInput";
import { ChatHistory } from "@/components/chat/ChatHistory";
const ChatMenu = ({ className }: { className?: string }) => {
    return <div className={`${className} h-full relative`}>
        <div className="h-full">
            <ChatHistory />
        </div>
        <div className="p-4 absolute bottom-0 max-h-60 min-h-28 h-auto w-full">
            <ChatInput />
        </div>
    </div>
}

export { ChatMenu };