import type React from "react";
import { useParams } from "react-router";

import { Collection as CollectionComponent } from "@/components/flashcards/Collection";

const Collection: React.FC = () => {
    const { slug } = useParams();

    if (!slug) {
        return <div>No collection found</div>
    }

    return <CollectionComponent slug={slug} />
}

export { Collection };