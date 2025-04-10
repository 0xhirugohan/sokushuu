import type React from "react";
import { useState, useEffect } from "react";

import { Title } from "@/components/flashcards/Title";

import { CreateCollectionPopup } from "@/components/form/CreateCollectionPopup";
import { HomeContent } from "@/components/layouts/HomeContent";
import { AllContentCard, AllCollection } from "@/components/layouts/AllContentCard";

import { searchCollections, searchCollectionsByCategory } from "@/lib/api";

interface ICollection {
    collectionId: string;
    name: string;
    creator: string;
    sellingPrice: number;
}
interface FlashcardMenuProps {
    styleName?: string;
    searchQueryProps?: string;
    collectionSlug?: string;
    categoryId?: string;
}

const FlashcardMenu: React.FC<FlashcardMenuProps> = ({ styleName, searchQueryProps, collectionSlug, categoryId }) => {
    const [isCreateCollectionPopupOpen, setIsCreateCollectionPopupOpen] = useState(false);
    const [collections, setCollections] = useState<ICollection[]>([]);

    const showCreateCollectionPopup = () => {
        setIsCreateCollectionPopupOpen(true);
    }

    const closeCreateCollectionPopup = () => {
        setIsCreateCollectionPopupOpen(false);
    }

    useEffect(() => {
        if (!searchQueryProps) {
            return;
        }

        const fetchCollections = async () => {
            const collectionResult = await searchCollections(searchQueryProps);
            setCollections(collectionResult);
        }
        fetchCollections();
    }, [searchQueryProps]);

    useEffect(() => {
        if (!categoryId) {
            return;
        }

        const fetchCollections = async () => {
            const collectionResult = await searchCollectionsByCategory(categoryId);
            setCollections(collectionResult);
        }
        fetchCollections();
    }, [categoryId]);
    
    return <div className={`${styleName} p-4 w-full h-full flex flex-col gap-y-8 overflow-x-hidden relative`}>
        { searchQueryProps && <Title searchQueryProps={searchQueryProps} /> }
        { collectionSlug && <Title collectionSlugProps={collectionSlug} /> }
        { categoryId && <Title collectionSlugProps={categoryId === "explore" ? "Explore" : "Recently Created"} /> }
        { !searchQueryProps && !collectionSlug && !categoryId && <Title /> }

        { (searchQueryProps || categoryId) && <AllCollection collections={collections} /> }
        { collectionSlug && <AllContentCard collectionSlug={collectionSlug} /> }
        { !searchQueryProps && !collectionSlug && !categoryId && <HomeContent showCreateCollectionPopup={showCreateCollectionPopup} /> }
        { isCreateCollectionPopupOpen && <CreateCollectionPopup onClose={closeCreateCollectionPopup} /> }
    </div>
}

export { FlashcardMenu };