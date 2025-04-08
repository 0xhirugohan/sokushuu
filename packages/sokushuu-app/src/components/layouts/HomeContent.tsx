import type React from "react";
import { useState } from "react";
import { useOutletContext } from "react-router";

import { CollectionCard } from "@/components/card/CollectionCard";

import PlusIcon from "@/assets/plus.svg";

interface HomeContentProps {
    showCreateCollectionPopup: () => void;
}

interface OutletContext {
    chatOpen: boolean;
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

    const { chatOpen } = useOutletContext<OutletContext>();

    return <>
        <CollectionCard collection={exploreCollection} chatOpen={chatOpen} />
        { hasViewedCollection && <CollectionCard collection={recentlyViewedCollection} chatOpen={chatOpen} /> }
        { hasCreatedCollection ? 
            <CollectionCard collection={recentlyCreatedCollection} chatOpen={chatOpen} />
            : <button onClick={showCreateCollectionPopup} type="button" className="h-20 md:h-40 border-2 border-zinc-500 rounded-lg flex gap-x-6 items-center justify-center cursor-pointer">
                <span className="text-2xl">Create New</span>
                <img className="p-1 w-12 h-12 md:w-16 md:h-16 border-2 border-zinc-500 rounded-full" src={PlusIcon} alt="plus" />
            </button>
        }
    </>
}

export { HomeContent };