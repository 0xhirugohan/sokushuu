import { useEffect, useState } from 'react';
import { useAccountEffect, useAccount } from 'wagmi';

import { FlashcardMenu } from '@/components/layouts/FlashcardMenu'
import { login } from '@/lib/api';

const Home = () => {
    // const [address, setAddress] = useState<`0x${string}` | null>(null);
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

    /*
    useEffect(() => {
        // check if user is logged in
        const cookieAddress = document.cookie.split('; ').find(row => row.startsWith('address='))?.split('=')[1] ?? '';
        if (cookieAddress) {
            setAddress(cookieAddress as `0x${string}`)
        }
    }, [document.cookie]);
    */

    if (!isUserLoggedIn) {
        return <div>Please login to continue</div>;
    }

    return <FlashcardMenu />
};

export { Home };
