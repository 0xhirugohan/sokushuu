import React, { useState } from "react";

// import SearchIcon from "@/assets/search.svg";
import PlayIcon from "@/assets/play.svg";
// import HamburgerIcon from "@/assets/hamburger.svg";
// import GridIcon from "@/assets/grid.svg";

interface AllContentCardProps { 
    collectionSlug?: string;
}

const AllContentCard: React.FC<AllContentCardProps> = ({ collectionSlug }) => {
    const [isUserOwned, setIsUserOwned] = useState(true);

    return <>
        { collectionSlug && isUserOwned && <div className="flex justify-between">
            <button type="button" className="border-2 border-zinc-600 px-6 text-sm py-2 rounded-md cursor-pointer">Add</button>
            <div className="flex gap-x-4">
                <button type="button" className="cursor-pointer hover:opacity-60">
                    <img className="w-6 h-6 my-auto" src={PlayIcon} alt="play" />
                </button>
                {/* For the next upcoming version
                <button type="button" className="cursor-pointer hover:opacity-60">
                    <img className="w-6 h-6 my-auto" src={SearchIcon} alt="search" />
                </button>
                <div className="grid grid-cols-2 border-2 border-zinc-600 rounded-md p-2 divide-x-2 divide-zinc-600">
                    <button type="button" className="cursor-pointer hover:opacity-60">
                        <img className="w-6 h-6 my-auto" src={HamburgerIcon} alt="hamburger" />
                    </button>
                    <button type="button" className="cursor-pointer hover:opacity-60">
                        <img className="w-6 h-6 my-auto" src={GridIcon} alt="grid" />
                    </button>
                </div>
                */}
            </div>
        </div> }
        <div className="w-full grid grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            <div className="h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">square 1</div>
            <div className="h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">square 2</div>
            <div className="h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">See more</div>
            <div className="h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">See more</div>
            <div className="h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500 flex justify-center items-center">See more</div>
            <div className="h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">square 1</div>
            <div className="h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">square 2</div>
            <div className="h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">See more</div>
            <div className="h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">See more</div>
            <div className="h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500 flex justify-center items-center">See more</div>
            <div className="h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">square 1</div>
            <div className="h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">square 2</div>
            <div className="h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">See more</div>
            <div className="h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">See more</div>
            <div className="h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500 flex justify-center items-center">See more</div>
            <div className="h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">square 1</div>
            <div className="h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">square 2</div>
            <div className="h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">See more</div>
            <div className="h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">See more</div>
            <div className="h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500 flex justify-center items-center">See more</div>
        </div>
    </>
}

export { AllContentCard };