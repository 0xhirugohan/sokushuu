import type React from "react";
import { NavLink } from 'react-router';

type Collection = {
    slug: string;
    name: string;
}

interface ICollection {
    collectionId: string;
    name: string;
    creator: string;
    sellingPrice: number;
}

interface CollectionCardProps {
    collection: Collection;
    collections: ICollection[];
    chatOpen: boolean;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, collections, chatOpen }) => {
    return <div className="w-full flex flex-col gap-y-2">
        <div className="font-semibold">{collection.name}</div>
        <div className={`${chatOpen ? 'max-w-[56vw]' : 'max-w-[82vw]'} overflow-x-scroll`}>
            <div className="w-fit flex gap-x-2 md:gap-x-4 h-20 md:h-40">
                {
                    collections.map((collection) => (
                        <NavLink
                            to={`/collection/${collection.collectionId}`}
                            className="h-full w-[32vw] md:w-[20vw] rounded-lg border-2 border-zinc-500 flex justify-center items-center"
                        >
                            {collection.name}
                        </NavLink>
                    ))
                }
                <NavLink
                    to={`/category/${collection.slug}`}
                    className="h-full w-[32vw] md:w-[20vw] rounded-lg border-2 border-zinc-500 flex justify-center items-center"
                >
                    See more
                </NavLink>
            </div>
        </div>
    </div>
}

export { CollectionCard };