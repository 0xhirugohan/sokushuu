import PlusIcon from "@/assets/plus.svg";

const HomeContent = () => {
    return <>
        <div className="w-full flex flex-col gap-y-2">
            <div className="font-semibold">Explore</div>
            <div className="w-[82vw] overflow-x-scroll">
                <div className="w-fit flex gap-x-2 md:gap-x-4 h-20 md:h-40">
                    <div className="h-full w-[32vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">square 1</div>
                    <div className="h-full w-[32vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">square 2</div>
                    <div className="h-full w-[32vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">See more</div>
                    <div className="h-full w-[32vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">See more</div>
                    <div className="h-full w-[32vw] md:w-[20vw] rounded-lg border-2 border-zinc-500 flex justify-center items-center">See more</div>
                </div>
            </div>
        </div>
        <button type="button" className="h-20 md:h-40 border-2 border-zinc-500 rounded-lg flex gap-x-6 items-center justify-center cursor-pointer">
            <span className="text-2xl">Create New</span>
            <img className="p-1 w-12 h-12 md:w-16 md:h-16 border-2 border-zinc-500 rounded-full" src={PlusIcon} alt="plus" />
        </button>
    </>
}

export { HomeContent };