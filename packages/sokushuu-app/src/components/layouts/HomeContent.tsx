import React, { useState } from "react";

import { CollectionCard } from "@/components/card/CollectionCard";

import PlusIcon from "@/assets/plus.svg";

interface HomeContentProps {
    showCreateCollectionPopup: () => void;
}

const HomeContent: React.FC<HomeContentProps> = ({ showCreateCollectionPopup }: HomeContentProps) => {
    const [hasCreatedCollection, setHasCreatedCollection] = useState(false);
    const [hasViewedCollection, setHasViewedCollection] = useState(false);

    const exploreCollection = {
        slug: "explore",
        name: "Explore"
    }

    const recentlyViewedCollection = {
        slug: "recently-viewed",
        name: "Recently Viewed"
    }

    const recentlyCreatedCollection = {
        slug: "recently-created",
        name: "Recently Created"
    }

    return <>
        <CollectionCard collection={exploreCollection} />
        { hasViewedCollection && <CollectionCard collection={recentlyViewedCollection} /> }
        { hasCreatedCollection ? 
            <CollectionCard collection={recentlyCreatedCollection} />
            : <button onClick={showCreateCollectionPopup} type="button" className="h-20 md:h-40 border-2 border-zinc-500 rounded-lg flex gap-x-6 items-center justify-center cursor-pointer">
                <span className="text-2xl">Create New</span>
                <img className="p-1 w-12 h-12 md:w-16 md:h-16 border-2 border-zinc-500 rounded-full" src={PlusIcon} alt="plus" />
            </button>
        }
    </>
}

export { HomeContent };