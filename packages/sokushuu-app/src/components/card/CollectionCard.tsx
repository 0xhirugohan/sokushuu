import React from "react";
import { NavLink } from 'react-router';

type Collection = {
    slug: string;
    name: string;
}

interface CollectionCardProps {
    collection: Collection;
    chatOpen: boolean;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, chatOpen }) => {
    return <div className="w-full flex flex-col gap-y-2">
        <div className="font-semibold">{collection.name}</div>
        <div className={`${chatOpen ? 'max-w-[56vw]' : 'max-w-[82vw]'} overflow-x-scroll`}>
            <div className="w-fit flex gap-x-2 md:gap-x-4 h-20 md:h-40">
                <div className="h-full w-[32vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">square 1</div>
                <div className="h-full w-[32vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">square 2</div>
                <div className="h-full w-[32vw] md:w-[20vw] rounded-lg border-2 border-zinc-500">square 3</div>
                <NavLink
                    to={`/collection/${collection.slug}`}
                    className="h-full w-[32vw] md:w-[20vw] rounded-lg border-2 border-zinc-500 flex justify-center items-center"
                >
                    See more
                </NavLink>
            </div>
        </div>
    </div>
}

export { CollectionCard };