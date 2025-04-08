import type React from "react";

import { FlashcardMenu } from "@/components/layouts/FlashcardMenu";

interface CollectionProps { 
    slug: string;
}

const Collection: React.FC<CollectionProps> = ({ slug }) => {
    return <FlashcardMenu collectionSlug={slug} />
}

export { Collection };  