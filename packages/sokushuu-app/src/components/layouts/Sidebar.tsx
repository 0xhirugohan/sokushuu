import SokushuuLogo from '@/assets/sokushuu.svg'
import FlashcardIcon from '@/assets/flashcard.svg'
import MarketIcon from '@/assets/market.svg'
import AiIcon from '@/assets/ai.svg'
import AiChatIcon from '@/assets/ai-chat.svg'
import WalletIcon from '@/assets/wallet.svg'

const Sidebar = ({ toggleAIChat, isAIChatOpen, styleName }: { toggleAIChat: () => void, isAIChatOpen: boolean, styleName?: string }) => {
    return <div className={`${styleName} w-28 h-full border-2 border-zinc-600 rounded-md p-2`}>
        <div className="h-full flex flex-col gap-y-12 justify-between items-center">
            <div className="flex flex-col gap-y-12 justify-center items-center">
                <img className="border-b-2 border-zinc-600" src={SokushuuLogo} alt="Sokushuu Logo" />
                <a href="/">
                    <img className="w-8 h-8 hover:opacity-70" src={FlashcardIcon} alt="Flashcard Icon" />
                </a>
                <a href="/market">
                    <img className="w-8 h-8 hover:opacity-70" src={MarketIcon} alt="Market Icon" />
                </a>
                <button type="button" onClick={toggleAIChat} className="bg-transparent border-none hover:bg-transparent active:bg-transparent shadow-none cursor-pointer">
                    <img className="w-8 h-8 hover:opacity-70" src={isAIChatOpen ? AiChatIcon : AiIcon} alt="Ai Icon" />
                </button>
            </div>
            <button type="button" className="mb-4 bg-transparent border-none hover:bg-transparent active:bg-transparent shadow-none cursor-pointer">
                <img className="w-8 h-8 hover:opacity-70" src={WalletIcon} alt="Wallet Icon" />
            </button>
        </div>
    </div>
};

const Navbar = ({ styleName }: { styleName?: string }) => {
    return <div className={`${styleName} bg-zinc-100 h-12 border-2 border-zinc-600 rounded-md p-2 flex justify-around items-center`}>
        <a href="/">
            <img className="w-6 h-6 hover:opacity-70" src={FlashcardIcon} alt="Flashcard Icon" />
        </a>
        <a href="/market">
            <img className="w-6 h-6 hover:opacity-70" src={MarketIcon} alt="Market Icon" />
        </a>
        <a className="border-2 border-zinc-600 rounded-full bg-zinc-100" href="/">
            <img className="w-12 h-12 hover:opacity-70 " src={SokushuuLogo} alt="Sokushuu Logo" />
        </a>
        <a href="/ai">
            <img className="w-6 h-6 hover:opacity-70" src={AiIcon} alt="Ai Icon" />
        </a>
        <button type="button" className="bg-transparent">
            <img className="w-6 h-6 hover:opacity-70" src={WalletIcon} alt="Wallet Icon" />
        </button>
    </div>
}

export { Sidebar, Navbar };
