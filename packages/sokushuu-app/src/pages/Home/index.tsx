import { useEffect, useState } from 'react';
import { FlashcardMenu } from '@/components/layouts/FlashcardMenu'

const Home = () => {
    const [address, setAddress] = useState<`0x${string}` | null>(null);

    useEffect(() => {
        // check if user is logged in
        const cookieAddress = document.cookie.split('; ').find(row => row.startsWith('address='))?.split('=')[1] ?? '';
        if (cookieAddress) {
            setAddress(cookieAddress as `0x${string}`)
        }
    }, [document.cookie]);

    if (!address) {
        return <div>Please login to continue</div>;
    }

    return <FlashcardMenu />
};

export { Home };
