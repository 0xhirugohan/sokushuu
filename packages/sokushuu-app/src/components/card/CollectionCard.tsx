import React from "react";

interface CollectionCardProps {
    collectionName: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collectionName }) => {
    return <div className="w-full flex flex-col gap-y-2">
        <div className="font-semibold">{collectionName}</div>
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
}

export { CollectionCard };