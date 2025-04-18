import type React from "react";
import { useState, useEffect } from "react";
import { FlashcardMenu } from "@/components/layouts/FlashcardMenu";
import { getCollectionDetails } from "@/lib/api";
import type { ICollection } from "@/components/layouts/FlashcardMenu";

interface CollectionProps { 
    slug: string;
}

interface IFlashcard {
    flashcardId: number;
    front: string;
    back: string;
}

const Collection: React.FC<CollectionProps> = ({ slug }) => {
    const [collectionMetadata, setCollectionMetadata] = useState<ICollection | undefined>();
    const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
    const [refreshDate, setRefreshDate] = useState(new Date());

    const getCollectionData = async () => {
        const collection = await getCollectionDetails(slug);
        return collection;
    }

    useEffect(() => {
        const fetchCollectionData = async () => {
            const collection = await getCollectionData();
            setCollectionMetadata(collection.meta);
            setFlashcards(collection.flashcards);
        }
        fetchCollectionData();
    }, [refreshDate]);

    return <FlashcardMenu setRefreshDate={setRefreshDate} collectionSlug={slug} collectionMetadata={collectionMetadata} flashcards={flashcards} />
}

export { Collection };  