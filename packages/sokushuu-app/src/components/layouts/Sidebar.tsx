import SokushuuLogo from '@/assets/sokushuu.svg'
import FlashcardIcon from '@/assets/flashcard.svg'
import MarketIcon from '@/assets/market.svg'
import AiIcon from '@/assets/ai.svg'

const Sidebar = ({ styleName }: { styleName?: string }) => {
    return <div className={styleName + " " + "w-28 h-full border-2 border-zinc-600 rounded-md p-2"}>
        <div className="flex flex-col gap-y-12 justify-center items-center">
            <img className="border-b-2 border-zinc-600" src={SokushuuLogo} alt="Sokushuu Logo" />
            <a href="/">
                <img className="w-8 h-8 hover:opacity-70" src={FlashcardIcon} alt="Flashcard Icon" />
            </a>
            <a href="/market">
                <img className="w-8 h-8 hover:opacity-70" src={MarketIcon} alt="Market Icon" />
            </a>
            <img className="w-8 h-8 hover:opacity-70" src={AiIcon} alt="Ai Icon" />
        </div>
    </div>
};

export { Sidebar };
