import type React from "react";
import { useState } from 'react';
import { useAccountEffect, useAccount } from 'wagmi';
import { useParams } from "react-router";

import { Collection as CollectionComponent } from "@/components/flashcards/Collection";

const Collection: React.FC = () => {
    const { address } = useAccount();
    const { slug } = useParams();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(!!address);

    useAccountEffect({
        onConnect() {
            setIsUserLoggedIn(true);
        },
        onDisconnect() {
            setIsUserLoggedIn(false);
        },
    })

    if (!isUserLoggedIn) {
        return <div>Please login to continue</div>;
    }

    if (!slug) {
        return <div>No collection found</div>
    }

    return <CollectionComponent slug={slug} />
}

export { Collection };