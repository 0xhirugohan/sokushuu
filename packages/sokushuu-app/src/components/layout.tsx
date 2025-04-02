import { useState } from "react";
import { ChatMenu } from "./layouts/ChatMenu";
import { Sidebar, Navbar } from "./layouts/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleAIChat = () => {
        if (isChatOpen) {
            setIsChatOpen(false);
        } else {
            setIsChatOpen(true);
        }
    }

    return <div className="h-screen max-h-screen w-screen max-w-screen p-4 bg-zinc-100 flex gap-4 relative">
        <Sidebar toggleAIChat={toggleAIChat} isAIChatOpen={isChatOpen} styleName="flex-none hidden md:block" />
        <Navbar styleName="md:hidden fixed bottom-4 inset-x-2" />
        <div className="flex-2 flex justify-center items-center border-2 border-zinc-600 rounded-md w-full h-[86vh] md:h-full">
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
