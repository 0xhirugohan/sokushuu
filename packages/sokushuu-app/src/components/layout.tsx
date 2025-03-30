import { useState } from "react";
import { ChatMenu } from "./layouts/ChatMenu";
import { Sidebar } from "./layouts/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleAIChat = () => {
        if (isChatOpen) {
            setIsChatOpen(false);
        } else {
            setIsChatOpen(true);
        }
    }

    return <div className="h-screen max-h-screen w-screen max-w-screen p-4 bg-zinc-100 flex gap-4">
        <Sidebar toggleAIChat={toggleAIChat} isAIChatOpen={isChatOpen} styleName="flex-none" />
        <div className="flex-2 flex justify-center items-center border-2 border-zinc-600 rounded-md w-full">
            {children}
        </div>
        {isChatOpen && 
            <div className="flex-1 border-2 border-zinc-600 rounded-md">
                <ChatMenu />
            </div>
        }
    </div>;
};

export { Layout };
