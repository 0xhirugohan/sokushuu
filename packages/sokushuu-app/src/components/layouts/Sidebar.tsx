import type React from 'react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { formatEther } from 'viem';

import { logout as apiLogout } from '@/lib/api';

import SokushuuLogo from '@/assets/sokushuu.svg'
import FlashcardIcon from '@/assets/flashcard.svg'
import MarketIcon from '@/assets/market.svg'
import AiIcon from '@/assets/ai.svg'
import AiChatIcon from '@/assets/ai-chat.svg'
import WalletIcon from '@/assets/wallet.svg'
import CopyIcon from '@/assets/copy.svg'

interface WalletPopupProps {
    address: `0x${string}`;
}

const WalletPopup: React.FC<WalletPopupProps> = ({ address }) => {
    const { disconnectAsync } = useDisconnect();
    const { data: balanceData } = useBalance({ address });
    const [balanceState, setBalanceState] = useState("0");

    useEffect(() => {
        if (!balanceData) {
            return;
        }

        setBalanceState(formatEther(balanceData.value));
    }, [balanceData]);

    const copyAddress = () => {
        navigator.clipboard.writeText(address);
    }

    const logout = async () => {
        await disconnectAsync();

        await apiLogout();
    }

    return <div className="bg-zinc-100 absolute bottom-16 w-[28vw] text-sm border-2 border-zinc-600 rounded-md p-2 z-10">
        <div className="flex gap-x-2">
            <span>Address: {address.slice(0, 4)}...{address.slice(-4)}</span>
            <button type="button" onClick={copyAddress} className="bg-transparent border-none hover:bg-transparent active:bg-transparent shadow-none cursor-pointer">
                <img className="w-4 h-4" src={CopyIcon} alt="Copy Icon" />
            </button>
        </div>
        {balanceState && <p>Balance: {balanceState}</p> }
        <button className="mt-4 border-2 border-zinc-600 rounded-md p-2" onClick={logout}>Logout</button>
    </div>
}

interface SidebarProps {
    toggleAIChat: () => void;
    isAIChatOpen: boolean;
    styleName?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleAIChat, isAIChatOpen, styleName }: SidebarProps) => {
    const { connect } = useConnect();
    const { address } = useAccount();

    const [showWalletPopup, setShowWalletPopup] = useState<boolean>(false);

    const connectWallet = async () => {
        connect({ connector: injected() });
    };

    const walletPopupClick = async () => {
        if (!address) return;

        if (showWalletPopup) {
            setShowWalletPopup(false);
            return;
        }

        setShowWalletPopup(true);
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
                {showWalletPopup && <WalletPopup address={address} />}
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
    const { address } = useAccount();
    const { connect } = useConnect();
    const { disconnectAsync } = useDisconnect();

    const connectWallet = async () => {
        connect({ connector: injected() });
    };

    const logout = async () => {
        await disconnectAsync();

        await apiLogout();
    }

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
        {
            address ? 
                <button
                    onClick={logout}
                    type="button"
                    className="bg-transparent border-none hover:bg-transparent active:bg-transparent shadow-none cursor-pointer"
                >
                    <img
                        className="w-6 h-6 rounded-full border-2 border-zinc-600 hover:animate-spin"
                        src={`https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${address}&radius=50&backgroundColor=transparent`}
                        alt="user avatar"
                        />
                </button> : <button onClick={connectWallet} type="button" className="bg-transparent">
                <img className="w-6 h-6 hover:opacity-70" src={WalletIcon} alt="Wallet Icon" />
            </button>
        }
    </div>
}

export { Sidebar, Navbar };
