import { useState } from 'react';
import { useAccountEffect, useAccount } from 'wagmi';

import { FlashcardMenu } from '@/components/layouts/FlashcardMenu'
import { login } from '@/lib/api';

const Home = () => {
    const { address } = useAccount();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(!!address);

    useAccountEffect({
        onConnect() {
            setIsUserLoggedIn(true);

            login(address as string);
        },
        onDisconnect() {
            setIsUserLoggedIn(false);
        },
    })

    if (!isUserLoggedIn) {
        return <div>Please login to continue</div>;
    }

    return <FlashcardMenu setRefreshDate={() => {}} />
};

export { Home };
