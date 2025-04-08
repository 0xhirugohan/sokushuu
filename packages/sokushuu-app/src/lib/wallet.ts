import { createPublicClient, createWalletClient, custom, http, formatEther } from 'viem';

import { educhainTestnet } from './chain';

export const walletClient = createWalletClient({
    chain: educhainTestnet,
    transport: custom(window.ethereum!),
});

export const publicClient = createPublicClient({
    chain: educhainTestnet,
    transport: http(),
});

export const getAddressBalance = async (address: `0x${string}`) => {
    console.log(address);
    const balance = await publicClient.getBalance({ address });
    const balanceInEther = formatEther(balance);
    return balanceInEther;
};
