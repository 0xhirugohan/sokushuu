import React, { useState } from "react";

import { Title } from "@/components/flashcards/Title";

import { CreateCollectionPopup } from "@/components/form/CreateCollectionPopup";
import { HomeContent } from "@/components/layouts/HomeContent";
import { AllContentCard } from "@/components/layouts/AllContentCard";

const FlashcardMenu = ({ styleName, searchQueryProps }: { styleName?: string, searchQueryProps?: string }) => {
    const [isCreateCollectionPopupOpen, setIsCreateCollectionPopupOpen] = useState(false);

    const showCreateCollectionPopup = () => {
        setIsCreateCollectionPopupOpen(true);
    }

    const closeCreateCollectionPopup = () => {
        setIsCreateCollectionPopupOpen(false);
    }

    return <div className={`${styleName} p-4 w-full h-full flex flex-col gap-y-8 overflow-x-hidden relative`}>
        <Title searchQueryProps={searchQueryProps} />
        { searchQueryProps ? <AllContentCard /> : <HomeContent showCreateCollectionPopup={showCreateCollectionPopup} /> }
        { isCreateCollectionPopupOpen && <CreateCollectionPopup onClose={closeCreateCollectionPopup} /> }
    </div>
}

export { FlashcardMenu };