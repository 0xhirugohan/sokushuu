import type React from "react";
import { useState } from "react";

// import SearchIcon from "@/assets/search.svg";
import PlayIcon from "@/assets/play.svg";
// import HamburgerIcon from "@/assets/hamburger.svg";
// import GridIcon from "@/assets/grid.svg";
import DollarIcon from "@/assets/dollar.svg";

import { Textarea } from "@/components/ui/textarea";

interface ContentCardFormProps {
    front: string;
    back: string;
    closeForm: () => void;
    className?: string;
}

interface SellCollectionFormProps {
    closeForm: () => void;
    className?: string;
}

const SellCollectionForm: React.FC<SellCollectionFormProps> = ({ closeForm, className }) => {
    const [isOnSale, setIsOnSale] = useState(true);

    const handleCloseForm = (event: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        if ((event instanceof KeyboardEvent && event.key === "Escape") || (event instanceof MouseEvent && event.button === 0)) {
            closeForm();
        }
    }

    return <div className={`${className}`}>
        <div onKeyUp={handleCloseForm} className="bg-zinc-300 absolute inset-0 opacity-40" />
        <div className="bg-zinc-100 border-2 border-zinc-600 rounded-lg absolute inset-x-4 inset-y-64 md:inset-x-20 md:inset-y-72 lg:inset-x-60 shadow-lg p-4 flex flex-col justify-between">
            <div className="flex flex-col gap-y-4 relative">
                <input
                    type="number"
                    className="w-full border-2 border-zinc-600 rounded-lg p-2 text-right"
                    placeholder="Price"
                    disabled={isOnSale}
                />
                <img src={DollarIcon} alt="dollar" className="absolute inset-y-0 my-auto left-3 w-6 h-6" />
            </div>
            <div className="flex justify-end gap-x-2">
                <button onClick={closeForm} type="button" className="p-2 w-24 rounded-lg border-2 border-zinc-600 cursor-pointer hover:opacity-70">Cancel</button>
                { !isOnSale && <button type="submit" className="p-2 w-24 rounded-lg border-2 border-zinc-600 cursor-pointer hover:opacity-70">Sell</button> }
            </div>
        </div>
    </div>
}

const ContentCardForm: React.FC<ContentCardFormProps> = ({ front, back, closeForm: closeFormProp, className }) => {
    const [isOwner, setIsOwner] = useState(false);

    const closeForm = (event: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        if ((event instanceof KeyboardEvent && event.key === "Escape") || (event instanceof MouseEvent && event.button === 0)) {
            closeFormProp();
        }
    }

    return <div className={`${className}`}>
        <div onKeyUp={closeForm} className="bg-zinc-300 absolute inset-0 opacity-40" />
        <div className="bg-zinc-100 border-2 border-zinc-600 rounded-lg absolute inset-x-4 inset-y-12 md:inset-x-20 md:inset-y-28 lg:inset-x-40 lg:inset-y-24 shadow-lg p-4 flex flex-col justify-between">
            <div className="flex flex-col gap-y-4">
                <span className="text-lg">Front</span>
                <Textarea
                    className="w-full min-h-[12vh] border-2 border-zinc-600 rounded-lg p-2"
                    placeholder="Front"
                    value={front}
                />

                <span className="text-lg">Back</span>
                <Textarea
                    className="w-full min-h-[12vh] border-2 border-zinc-600 rounded-lg p-2"
                    placeholder="Back"
                    value={back}
                />
            </div>
            <div className="flex justify-end gap-x-2">
                <button onClick={closeFormProp} type="button" className="p-2 rounded-lg border-2 border-zinc-600 cursor-pointer">Cancel</button>
                { isOwner && <button type="submit" className="p-2 rounded-lg border-2 border-zinc-600 cursor-pointer">Save</button> }
            </div>
        </div>
    </div>
}

interface ContentCardProps {
    front: string;
    back: string;
    openForm: () => void;
    className?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ front, back, openForm, className }) => {
    const onButtonClick = () => {
        openForm();
    }
    return <div className={`${className} h-20 md:h-40 w-[26vw] md:w-[20vw] rounded-lg border-2 border-zinc-500 flex justify-center items-center relative`}>
        <span>{back}</span>
        <button
            type="button"
            className="absolute inset-1 bg-zinc-100 border-none flex justify-center items-center hover:opacity-0 hover:opacity-0 cursor-pointer"
            onClick={onButtonClick}
        >
            {front}
        </button>
    </div>
}

interface AllContentCardProps { 
    collectionSlug?: string;
}

const AllContentCard: React.FC<AllContentCardProps> = ({ collectionSlug }) => {
    const [isUserOwned, setIsUserOwned] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSellFormOpen, setIsSellFormOpen] = useState(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState(0);
    const [isOnSale, setIsOnSale] = useState(false);

    const handleFormOpen = (cardIndex: number) => {
        setSelectedCardIndex(cardIndex);
        setIsFormOpen(true);
    }

    const handleFormClose = () => {
        setIsFormOpen(false);
    }

    const handleSellFormOpen = () => {
        setIsSellFormOpen(true);
    }

    const handleSellFormClose = () => {
        setIsSellFormOpen(false);
    }

    const contentCards = Array.from({ length: 12 }, (_, index) => (
        <ContentCard openForm={() => handleFormOpen(index)} key={new Date().toISOString()} front={`Front ${index + 1}`} back={`Back ${index + 1}`} />
    ));

    return <>
        { collectionSlug && <div className="flex justify-between">
            { isUserOwned && <div className="flex gap-x-2">
                <button type="button" className="border-2 border-zinc-600 px-6 text-sm py-2 rounded-md hover:opacity-70 cursor-pointer">Add</button>
                <button onClick={handleSellFormOpen} type="button" className="border-2 border-zinc-600 px-6 text-sm py-2 rounded-md hover:opacity-70 cursor-pointer">{ isOnSale ? "On Sale" : "Sell" }</button>
            </div>
            }
            { !isUserOwned && <button type="button" className="border-2 border-zinc-600 px-6 text-sm py-2 rounded-md cursor-pointer">Buy</button> }
            <div className="flex gap-x-4">
                {/* For the next upcoming version
                <button type="button" className="cursor-pointer hover:opacity-60">
                    <img className="w-6 h-6 my-auto" src={PlayIcon} alt="play" />
                </button>
                <button type="button" className="cursor-pointer hover:opacity-60">
                    <img className="w-6 h-6 my-auto" src={SearchIcon} alt="search" />
                </button>
                <div className="grid grid-cols-2 border-2 border-zinc-600 rounded-md p-2 divide-x-2 divide-zinc-600">
                    <button type="button" className="cursor-pointer hover:opacity-60">
                        <img className="w-6 h-6 my-auto" src={HamburgerIcon} alt="hamburger" />
                    </button>
                    <button type="button" className="cursor-pointer hover:opacity-60">
                        <img className="w-6 h-6 my-auto" src={GridIcon} alt="grid" />
                    </button>
                </div>
                */}
            </div>
        </div> }
        <div className="w-full grid grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            {contentCards}
        </div>
        { isFormOpen && <ContentCardForm front={contentCards[selectedCardIndex].props.front} back={contentCards[selectedCardIndex].props.back} closeForm={handleFormClose} /> }
        { isSellFormOpen && <SellCollectionForm closeForm={handleSellFormClose} /> }
    </>
}

export { AllContentCard };