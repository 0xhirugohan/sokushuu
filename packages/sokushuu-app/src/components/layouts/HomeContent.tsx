import React, { useState } from "react";

import { CollectionCard } from "@/components/card/CollectionCard";

import PlusIcon from "@/assets/plus.svg";

const HomeContent: React.FC = () => {
    const [hasCreatedCollection, setHasCreatedCollection] = useState(false);
    const [hasViewedCollection, setHasViewedCollection] = useState(false);

    return <>
        <CollectionCard collectionName="Explore" />
        { hasViewedCollection && <CollectionCard collectionName="Recently Viewed" /> }
        { hasCreatedCollection ? 
            <CollectionCard collectionName="Recently Created" />
            : <button type="button" className="h-20 md:h-40 border-2 border-zinc-500 rounded-lg flex gap-x-6 items-center justify-center cursor-pointer">
                <span className="text-2xl">Create New</span>
                <img className="p-1 w-12 h-12 md:w-16 md:h-16 border-2 border-zinc-500 rounded-full" src={PlusIcon} alt="plus" />
            </button>
        }
    </>
}

export { HomeContent };