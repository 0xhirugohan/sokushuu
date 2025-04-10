import type React from "react";
import { useParams } from "react-router";

import { FlashcardMenu } from "@/components/layouts/FlashcardMenu";

const Category: React.FC = () => {
    const { slug } = useParams();

    if (!slug) {
        return <div>No collection found</div>
    }

    return <FlashcardMenu categoryId={slug} />
}

export { Category };