import React, { useState } from "react";

import { Title } from "@/components/flashcards/Title";

import { CreateCollectionPopup } from "@/components/form/CreateCollectionPopup";
import { HomeContent } from "@/components/layouts/HomeContent";
import { AllContentCard } from "@/components/layouts/AllContentCard";

interface FlashcardMenuProps {
    styleName?: string;
    searchQueryProps?: string;
    collectionSlug?: string;
}

const FlashcardMenu: React.FC<FlashcardMenuProps> = ({ styleName, searchQueryProps, collectionSlug }) => {
    const [isCreateCollectionPopupOpen, setIsCreateCollectionPopupOpen] = useState(false);

    const showCreateCollectionPopup = () => {
        setIsCreateCollectionPopupOpen(true);
    }

    const closeCreateCollectionPopup = () => {
        setIsCreateCollectionPopupOpen(false);
    }
    
    return <div className={`${styleName} p-4 w-full h-full flex flex-col gap-y-8 overflow-x-hidden relative`}>
        { searchQueryProps && <Title searchQueryProps={searchQueryProps} /> }
        { collectionSlug && <Title collectionSlugProps={collectionSlug} /> }
        { !searchQueryProps && !collectionSlug && <Title /> }

        { searchQueryProps || collectionSlug ? <AllContentCard collectionSlug={collectionSlug} /> : <HomeContent showCreateCollectionPopup={showCreateCollectionPopup} /> }
        { isCreateCollectionPopupOpen && <CreateCollectionPopup onClose={closeCreateCollectionPopup} /> }
    </div>
}

export { FlashcardMenu };