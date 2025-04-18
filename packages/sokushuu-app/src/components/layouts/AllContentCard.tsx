import type React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { useAccount } from "wagmi";

import { buyAndMintNFT, deployNFTContract, registerDeployedNFTContract, checkIfUserHasNFT } from "@/lib/wallet";
import { createFlashcard, updateCollectionSellingPrice } from "@/lib/api";

// import SearchIcon from "@/assets/search.svg";
// import PlayIcon from "@/assets/play.svg";
// import HamburgerIcon from "@/assets/hamburger.svg";
// import GridIcon from "@/assets/grid.svg";
import DollarIcon from "@/assets/dollar.svg";

import { Textarea } from "@/components/ui/textarea";
import type { ICollection } from "@/components/layouts/FlashcardMenu";

interface ContentCardFormProps {
    isOwner: boolean;
    collectionId: number;
    front: string;
    back: string;
    closeForm: () => void;
    onSubmitSuccess: (date: Date) => void;
    className?: string;
}

interface SellCollectionFormProps {
    closeForm: () => void;
    className?: string;
    collectionMetadata: ICollection | null;
}

const SellCollectionForm: React.FC<SellCollectionFormProps> = ({ closeForm, className, collectionMetadata }) => {
    const [isOnSale, setIsOnSale] = useState(collectionMetadata?.address !== null);
    const [sellPrice, setSellPrice] = useState(collectionMetadata?.sellingPrice ?? 0);

    const deployERC721 = async (price: number) => {
        const contractAddress = await deployNFTContract(`Sokushuu Collection - ${collectionMetadata?.name ?? "No Collection"}`, "SCUG", price);
        const hash = await registerDeployedNFTContract(contractAddress);
        return { contractAddress, registerHash: hash };
    }

    const handleSell = async () => {
        if (sellPrice <= 0) {
            alert("Please enter a valid price");
            return;
        }

        try {
            const { contractAddress } = await deployERC721(sellPrice);
            setIsOnSale(true);

            await updateCollectionSellingPrice(collectionMetadata?.collectionId ?? 0, sellPrice, contractAddress);

            closeForm();
        } catch (error) {
            console.error(error);
        }
    }

    const handleCloseForm = (event: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        if ((event instanceof KeyboardEvent && event.key === "Escape") || (event instanceof MouseEvent && event.button === 0)) {
            closeForm();
        }
    }

    return <div className={`${className}`}>
        <div onKeyUp={handleCloseForm} className="bg-zinc-300 absolute inset-0 opacity-40" />
        <div className="bg-zinc-100 border-2 border-zinc-600 rounded-lg absolute inset-x-4 inset-y-64 md:inset-x-20 md:inset-y-72 lg:inset-x-60 shadow-lg p-4 flex flex-col justify-between">
            <input
                type="text"
                className="w-full border-2 border-zinc-600 rounded-lg p-2"
                disabled
                value={collectionMetadata?.name ?? "No Collection"}
            />
            <div className="flex flex-col gap-y-4 relative">
                <input
                    type="number"
                    className="w-full border-2 border-zinc-600 rounded-lg p-2 text-right"
                    placeholder="Price"
                    disabled={isOnSale}
                    value={sellPrice}
                    onChange={(e) => setSellPrice(Number(e.target.value))}
                />
                <img src={DollarIcon} alt="dollar" className="absolute inset-y-0 my-auto left-3 w-6 h-6" />
            </div>
            <div className="flex justify-end gap-x-2">
                <button onClick={closeForm} type="button" className="p-2 w-24 rounded-lg border-2 border-zinc-600 cursor-pointer hover:opacity-70">Cancel</button>
                { !isOnSale && <button onClick={handleSell} type="submit" className="p-2 w-24 rounded-lg border-2 border-zinc-600 cursor-pointer hover:opacity-70">Sell</button> }
            </div>
        </div>
    </div>
}

const ContentCardForm: React.FC<ContentCardFormProps> = ({ isOwner, collectionId, front, back, closeForm: closeFormProp, className, onSubmitSuccess }) => {
    const [frontValue, setFrontValue] = useState(front);
    const [backValue, setBackValue] = useState(back);

    const closeForm = (event: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
        if ((event instanceof KeyboardEvent && event.key === "Escape") || (event instanceof MouseEvent && event.button === 0)) {
            closeFormProp();
        }
    }

    const onSubmit = async () => {
        if (frontValue === '' || backValue === '') {
            alert('Please enter a valid front and back');
            return;
        }

        await createFlashcard(collectionId, frontValue, backValue);

        onSubmitSuccess(new Date());

        closeFormProp();
    }

    return <div className={`${className}`}>
        <div onKeyUp={closeForm} className="bg-zinc-300 absolute inset-0 opacity-40" />
        <div className="bg-zinc-100 border-2 border-zinc-600 rounded-lg absolute inset-x-4 inset-y-12 md:inset-x-20 md:inset-y-28 lg:inset-x-40 lg:inset-y-24 shadow-lg p-4 flex flex-col justify-between">
            <div className="flex flex-col gap-y-4">
                <span className="text-lg">Front</span>
                <Textarea
                    className="w-full min-h-[12vh] border-2 border-zinc-600 rounded-lg p-2"
                    placeholder="Front"
                    value={frontValue}
                    onChange={(e) => setFrontValue(e.target.value)}
                />

                <span className="text-lg">Back</span>
                <Textarea
                    className="w-full min-h-[12vh] border-2 border-zinc-600 rounded-lg p-2"
                    placeholder="Back"
                    value={backValue}
                    onChange={(e) => setBackValue(e.target.value)}
                />
            </div>
            <div className="flex justify-end gap-x-2">
                <button onClick={closeFormProp} type="button" className="p-2 rounded-lg border-2 border-zinc-600 cursor-pointer">Cancel</button>
                { isOwner && collectionId !== 0 && <button onClick={onSubmit} type="submit" className="p-2 rounded-lg border-2 border-zinc-600 cursor-pointer">Save</button> }
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
        <p className="p-1 line-clamp-3 h-full w-full text-wrap wrap-words">{back}</p>
        <button
            type="button"
            className="absolute inset-1 bg-zinc-100 border-none flex justify-center items-center hover:opacity-0 hover:opacity-0 cursor-pointer"
            onClick={onButtonClick}
        >
            {front}
        </button>
    </div>
}

interface IFlashcard {
    flashcardId: number;
    front: string;
    back: string;
}

interface AllContentCardProps { 
    collectionSlug?: string;
    collectionTitle?: string;
    collectionMetadata?: ICollection;
    flashcards?: IFlashcard[];
    setRefreshDate: (date: Date) => void;
}

const AllContentCard: React.FC<AllContentCardProps> = ({ collectionSlug, collectionMetadata, flashcards, setRefreshDate: setRefreshDateProp }) => {
    const { address } = useAccount();
    const [userAddress, setUserAddress] = useState<string | undefined>();
    const [isUserOwned, setIsUserOwned] = useState(false);
    const [isUserPurchased, setIsUserPurchased] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSellFormOpen, setIsSellFormOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<IFlashcard | undefined>();
    const [isOnSale, setIsOnSale] = useState(false);
    const [refreshDate, setRefreshDate] = useState(new Date());

    useEffect(() => {
        setUserAddress(address);
        setIsUserOwned(collectionMetadata?.creator === address);
        setIsOnSale((collectionMetadata?.sellingPrice ?? 0) > 0 && collectionMetadata?.address !== null);

        const checkIfUserHasNFTCall = async () => {
            const hasNFT = await checkIfUserHasNFT(collectionMetadata?.address as `0x${string}` ?? "0x");
            setIsUserPurchased(hasNFT);
        }
        if (collectionMetadata?.address !== null) {
            checkIfUserHasNFTCall();
        }
    }, [collectionMetadata, userAddress, address]);

    useEffect(() => {
        // refresh flashcard
        setRefreshDateProp(refreshDate);
    }, [refreshDate]);

    const handleBuy = async () => {
        const hash = await buyAndMintNFT(collectionMetadata?.address as `0x${string}` ?? "0x", collectionMetadata?.sellingPrice ?? 0);
        console.log(hash)
    }

    const handleFormOpen = (cardIndex: number) => {
        const selectedFc = flashcards?.filter(flashcard => flashcard.flashcardId === cardIndex)[0];
        setSelectedCard(selectedFc);
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

    const handleOnFlashcardSubmitSuccess = (date: Date) => {
        setRefreshDate(date);
    }

    return <>
        { collectionSlug && <div className="flex justify-between">
            { isUserOwned && <div className="flex gap-x-2">
                <button onClick={() => handleFormOpen(0)} type="button" className="border-2 border-zinc-600 px-6 text-sm py-2 rounded-md hover:opacity-70 cursor-pointer">Add</button>
                <button onClick={handleSellFormOpen} type="button" className="border-2 border-zinc-600 px-6 text-sm py-2 rounded-md hover:opacity-70 cursor-pointer">{ isOnSale ? "On Sale" : "Sell" }</button>
            </div>
            }
            { !isUserOwned && !isUserPurchased && <button onClick={handleBuy} type="button" className="border-2 border-zinc-600 px-6 text-sm py-2 rounded-md cursor-pointer">Buy</button> }
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
            {flashcards?.map((flashcard) => (
                <ContentCard openForm={() => handleFormOpen(flashcard?.flashcardId)} key={flashcard.flashcardId} front={flashcard.front} back={flashcard.back} />
            ))}
        </div>
        { isFormOpen && <ContentCardForm onSubmitSuccess={handleOnFlashcardSubmitSuccess} collectionId={collectionMetadata?.collectionId ?? 0} isOwner={isUserOwned} front={selectedCard?.front ?? ''} back={selectedCard?.back ?? ''} closeForm={handleFormClose} /> }
        { isSellFormOpen && <SellCollectionForm closeForm={handleSellFormClose} collectionMetadata={collectionMetadata ?? null} /> }
    </>
}

interface AllCollectionProps {
    collections: ICollection[];
}

const AllCollection: React.FC<AllCollectionProps> = ({ collections }) => {
    return <>
        <div className="w-full grid grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            {collections.map((collection) => (
                <NavLink
                    to={`/collection/${collection.collectionId}`}
                className="h-20 md:h-40 w-[32vw] md:w-[20vw] rounded-lg border-2 border-zinc-500 flex justify-center items-center"
            >
                    {collection.name}
                </NavLink>
            ))}
        </div>
    </>
}

export { AllContentCard, AllCollection };