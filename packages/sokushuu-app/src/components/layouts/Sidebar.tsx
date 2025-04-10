import type React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import type { EIP1193Provider } from 'viem';

import { getAddressBalance, walletClient } from '@/lib/wallet';
import { educhainTestnet } from '@/lib/chain';
import { login, logout as apiLogout } from '@/lib/api';

import SokushuuLogo from '@/assets/sokushuu.svg'
import FlashcardIcon from '@/assets/flashcard.svg'
import MarketIcon from '@/assets/market.svg'
import AiIcon from '@/assets/ai.svg'
import AiChatIcon from '@/assets/ai-chat.svg'
import WalletIcon from '@/assets/wallet.svg'
import CopyIcon from '@/assets/copy.svg'

declare global {
    interface Window {
        ethereum: EIP1193Provider;
    }
}

interface WalletPopupProps {
    address: `0x${string}`;
    balance: string;
}

const WalletPopup: React.FC<WalletPopupProps> = ({ address, balance }) => {
    const copyAddress = () => {
        navigator.clipboard.writeText(address);
    }

    const logout = async () => {
        await apiLogout();
        document.cookie = 'address=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.reload();
    }

    return <div className="bg-zinc-100 absolute bottom-16 w-[28vw] text-sm border-2 border-zinc-600 rounded-md p-2 z-10">
        <div className="flex gap-x-2">
            <span>Address: {address.slice(0, 4)}...{address.slice(-4)}</span>
            <button type="button" onClick={copyAddress} className="bg-transparent border-none hover:bg-transparent active:bg-transparent shadow-none cursor-pointer">
                <img className="w-4 h-4" src={CopyIcon} alt="Copy Icon" />
            </button>
        </div>
        <p>Balance: {balance}</p>
        <button className="mt-4 border-2 border-zinc-600 rounded-md p-2" onClick={logout}>Logout</button>
    </div>
}

interface SidebarProps {
    toggleAIChat: () => void;
    isAIChatOpen: boolean;
    styleName?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleAIChat, isAIChatOpen, styleName }: SidebarProps) => {
    const [address, setAddress] = useState<`0x${string}` | null>(null);
    const [balance, setBalance] = useState<string>('0');
    const [showWalletPopup, setShowWalletPopup] = useState<boolean>(false);

    useEffect(() => {
        const addressInCookie = document.cookie.split('; ').find(row => row.startsWith('address='))?.split('=')[1] ?? '';
        if (addressInCookie) {
            setAddress(addressInCookie as `0x${string}`);
        }
    }, []);

    const connectWallet = async () => {
        const [walletAddress] = await walletClient.requestAddresses();
        setAddress(walletAddress);

        const userChainId = await walletClient.getChainId();
        if (userChainId !== educhainTestnet.id) {
            await walletClient.addChain({ chain: educhainTestnet });
        }

        await login(walletAddress);
    };

    const walletPopupClick = async () => {
        if (!address) return;

        if (showWalletPopup) {
            setShowWalletPopup(false);
            return;
        }

        setShowWalletPopup(true);
        const balance = await getAddressBalance(address);
        setBalance(balance);
    }

    return <div className={`${styleName} w-28 h-full border-2 border-zinc-600 rounded-md p-2`}>
        <div className="h-full flex flex-col gap-y-12 justify-between items-center">
            <div className="flex flex-col gap-y-12 justify-center items-center">
                <img className="border-b-2 border-zinc-600" src={SokushuuLogo} alt="Sokushuu Logo" />
                <NavLink to="/">
                    <img className="w-8 h-8 hover:opacity-70" src={FlashcardIcon} alt="Flashcard Icon" />
                </NavLink>
                <NavLink to="/market">
                    <img className="w-8 h-8 hover:opacity-70" src={MarketIcon} alt="Market Icon" />
                </NavLink>
                <button type="button" onClick={toggleAIChat} className="bg-transparent border-none hover:bg-transparent active:bg-transparent shadow-none cursor-pointer">
                    <img className="w-8 h-8 hover:opacity-70" src={isAIChatOpen ? AiChatIcon : AiIcon} alt="Ai Icon" />
                </button>
            </div>
            {address ? <div className="mb-4 relative">
                <button type="button" onClick={walletPopupClick} className="bg-transparent border-none hover:bg-transparent active:bg-transparent shadow-none cursor-pointer">
                    <img
                        className="w-12 h-12 rounded-full border-2 border-zinc-600 hover:animate-spin"
                        src={`https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${address}&radius=50&backgroundColor=transparent`}
                        alt="user avatar"
                        />
                </button>
                {showWalletPopup && <WalletPopup address={address} balance={balance} />}
            </div> : <button onClick={connectWallet} type="button" className="mb-4 bg-transparent border-none hover:bg-transparent active:bg-transparent shadow-none cursor-pointer">
                <img className="w-8 h-8 hover:opacity-70" src={WalletIcon} alt="Wallet Icon" />
            </button>}
        </div>
    </div>
};

interface NavbarProps {
    styleName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ styleName }: NavbarProps) => {
    return <div className={`${styleName} bg-zinc-100 h-12 border-2 border-zinc-600 rounded-md p-2 flex justify-around items-center`}>
        <NavLink to="/">
            <img className="w-6 h-6 hover:opacity-70" src={FlashcardIcon} alt="Flashcard Icon" />
        </NavLink>
        <NavLink to="/market">
            <img className="w-6 h-6 hover:opacity-70" src={MarketIcon} alt="Market Icon" />
        </NavLink>
        <NavLink to="/">
            <img className="w-12 h-12 hover:opacity-70" src={SokushuuLogo} alt="Sokushuu Logo" />
        </NavLink>
        <NavLink to="/ai">
            <img className="w-6 h-6 hover:opacity-70" src={AiIcon} alt="Ai Icon" />
        </NavLink>
        <button type="button" className="bg-transparent">
            <img className="w-6 h-6 hover:opacity-70" src={WalletIcon} alt="Wallet Icon" />
        </button>
    </div>
}

export { Sidebar, Navbar };
