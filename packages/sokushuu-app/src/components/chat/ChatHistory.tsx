const ChatHistory = ({ className }: { className?: string }) => {
    const chatHistories = [
        { message: "what can I help you today sir?", isUser: false },
        { message: "nothing", isUser: true },
        { message: "understood", isUser: false },
        { message: "this is an example of a long message that will be wrapped in a div with a max-width of 300px and a min-width of 100px and a max-height of 100px and a min-height of 100px", isUser: true },
        { message: "what can I help you today sir?", isUser: false },
        { message: "nothing", isUser: true },
        { message: "understood", isUser: false },
        { message: "this is an example of a long message that will be wrapped in a div with a max-width of 300px and a min-width of 100px and a max-height of 100px and a min-height of 100px", isUser: true },
        { message: "what can I help you today sir?", isUser: false },
        { message: "nothing", isUser: true },
        { message: "understood", isUser: false },
        { message: "this is an example of a long message that will be wrapped in a div with a max-width of 300px and a min-width of 100px and a max-height of 100px and a min-height of 100px", isUser: true },
    ];
    return <div className={`${className} p-4 flex flex-col gap-y-2 overflow-y-auto h-[calc(100vh-12rem)]`}>
        {chatHistories.map((chatHistory, index) => (
            <div key={index} className={`w-fit max-w-9/10 p-2 border-2 border-zinc-400 rounded-md ${chatHistory.isUser ? "self-end" : "self-start"}`}>
                {chatHistory.message}
            </div>
        ))}
    </div>
}

export { ChatHistory };