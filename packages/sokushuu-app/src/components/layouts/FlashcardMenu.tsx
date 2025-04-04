import SearchIcon from "@/assets/search.svg";
import PlusIcon from "@/assets/plus.svg";

const FlashcardMenu = ({ styleName }: { styleName?: string }) => {
    return <div className={`${styleName} p-4 w-full h-full flex flex-col gap-y-4 overflow-x-hidden`}>
        <div className="flex justify-between">
            <div className="text-sm md:text-lg my-auto">What do you want to learn today?</div>
            <button type="button" className="cursor-pointer">
                <img className="p-1 w-8 h-8" src={SearchIcon} alt="search" />
            </button>
        </div>
        <div className="w-full flex flex-col gap-y-2">
            <div className="font-semibold">Explore</div>
            <div className="w-[82vw] overflow-x-scroll">
                <div className="w-fit flex gap-x-2 md:gap-x-4 h-20 md:h-40">
                    <div className="h-full w-[32vw] rounded-lg border-2 border-zinc-500">square 1</div>
                    <div className="h-full w-[32vw] rounded-lg border-2 border-zinc-500">square 2</div>
                    <div className="h-full w-[32vw] rounded-lg border-2 border-zinc-500">See more</div>
                    <div className="h-full w-[32vw] rounded-lg border-2 border-zinc-500">See more</div>
                    <div className="h-full w-[32vw] rounded-lg border-2 border-zinc-500">See more</div>
                </div>
            </div>
        </div>
        <button type="button" className="h-20 md:h-40 border-2 border-zinc-500 rounded-lg flex gap-x-6 items-center justify-center cursor-pointer">
            <span className="text-2xl">Create New</span>
            <img className="p-1 w-12 h-12 md:w-16 md:h-16 border-2 border-zinc-500 rounded-full" src={PlusIcon} alt="plus" />
        </button>
    </div>
}

export { FlashcardMenu };