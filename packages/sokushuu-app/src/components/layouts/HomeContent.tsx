import type React from "react";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";

import { CollectionCard } from "@/components/card/CollectionCard";

import PlusIcon from "@/assets/plus.svg";

import { getDashboard } from "@/lib/api";

interface ICollection {
    collectionId: string;
    name: string;
    creator: string;
    sellingPrice: number;
}
interface HomeContentProps {
    showCreateCollectionPopup: () => void;
}

interface OutletContext {
    chatOpen: boolean;
}

const HomeContent: React.FC<HomeContentProps> = ({ showCreateCollectionPopup }: HomeContentProps) => {
    const [exploreCollections, setExploreCollections] = useState<ICollection[]>([]);
    const [recentlyCreatedCollections, setRecentlyCreatedCollections] = useState<ICollection[]>([]);

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

    useEffect(() => {
        const fetchDashboard = async () => {
            const dashboard = await getDashboard();
            setExploreCollections(dashboard.exploreCollections);
            setRecentlyCreatedCollections(dashboard.recentlyCreatedCollections);
        }
        fetchDashboard();
    }, []);

    const { chatOpen } = useOutletContext<OutletContext>();

    return <>
        <CollectionCard collection={exploreCollection} collections={exploreCollections} chatOpen={chatOpen} />
        {/* hasViewedCollection && <CollectionCard collection={recentlyViewedCollection} chatOpen={chatOpen} /> */}
        { recentlyCreatedCollections.length > 0 ? 
            <CollectionCard collection={recentlyCreatedCollection} collections={recentlyCreatedCollections} chatOpen={chatOpen} />
            : <button onClick={showCreateCollectionPopup} type="button" className="h-20 md:h-40 border-2 border-zinc-500 rounded-lg flex gap-x-6 items-center justify-center cursor-pointer">
                <span className="text-2xl">Create New</span>
                <img className="p-1 w-12 h-12 md:w-16 md:h-16 border-2 border-zinc-500 rounded-full" src={PlusIcon} alt="plus" />
            </button>
        }
    </>
}

export { HomeContent };