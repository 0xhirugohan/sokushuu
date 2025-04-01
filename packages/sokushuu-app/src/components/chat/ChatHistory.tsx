import { IChatHistory } from "@/components/layouts/ChatMenu";

const ChatHistory = ({ className, chatHistories }: { className?: string, chatHistories: IChatHistory[] }) => {
    return <div className={`${className} p-4 flex flex-col gap-y-2 overflow-y-auto h-[calc(100vh-12rem)]`}>
        {chatHistories.map((chatHistory, index) => (
            <div key={index} className={`w-fit max-w-9/10 p-2 border-2 border-zinc-400 rounded-md ${chatHistory.isUser ? "self-end" : "self-start"}`}>
                {chatHistory.message}
            </div>
        ))}
    </div>
}

export { ChatHistory };