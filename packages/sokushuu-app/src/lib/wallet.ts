import {
    createPublicClient,
    createWalletClient,
    custom,
    http,
    formatEther,
    parseEther,
} from 'viem';
import { http as httpWagmi, createConfig } from 'wagmi';

import { educhainTestnet } from './chain';
import { wagmiAbi, wagmiBytecode } from './abi/CollectionOwnershipNFT';
import { SOKUSHUU_MINT_SALE_ADDRESS } from './constant';

export const walletClient = createWalletClient({
    chain: educhainTestnet,
    transport: custom(window.ethereum),
});

export const publicClient = createPublicClient({
    chain: educhainTestnet,
    transport: http(),
});

export const wagmiConfig = createConfig({
    chains: [educhainTestnet],
    transports: {
        [educhainTestnet.id]: httpWagmi(),
    }
});

export const getAddressBalance = async (address: `0x${string}`) => {
    console.log(address);
    const balance = await publicClient.getBalance({ address });
    const balanceInEther = formatEther(balance);
    return balanceInEther;
};

export const getAccount = async () => {
    const accounts = await walletClient.getAddresses();
    return accounts[0];
};

export const deployNFTContract = async (collectionTitle: string, collectionSymbol: string, price: number): Promise<`0x${string}`> => {
    const account = await getAccount();
    const hash = await walletClient.deployContract({
        abi: wagmiAbi,
        account,
        args: [
            collectionTitle,
            collectionSymbol,
            parseEther(`${price}`, "wei"),
            SOKUSHUU_MINT_SALE_ADDRESS,
        ],
        bytecode: wagmiBytecode,
    });

    const receipt = await publicClient.getTransactionReceipt({ hash });
    const contractAddress = receipt.contractAddress;
    return contractAddress ?? "0x0000000000000000000000000000000000000000";
}

export const registerDeployedNFTContract = async (contractAddress: `0x${string}`): Promise<`0x${string}`> => {
    const account = await getAccount();
    const { request } = await publicClient.simulateContract({
        account,
        address: contractAddress,
        abi: wagmiAbi,
        functionName: 'register',
    });
    const hash = await walletClient.writeContract(request);
    return hash;
}

export const buyAndMintNFT = async (contractAddress: `0x${string}`, price: number) => {
    const account = await getAccount();
    const hash = await walletClient.writeContract({
        account,
        address: contractAddress,
        abi: wagmiAbi,
        functionName: 'mint',
        value: parseEther(`${price}`, "wei"),
        args: [account],
    });
    return hash;
}

export const checkIfUserHasNFT = async (contractAddress: `0x${string}`): Promise<boolean> => {
    const account = await getAccount();
    const balance = await publicClient.readContract({
        address: contractAddress,
        abi: wagmiAbi,
        functionName: 'balanceOf',
        args: [account],
    });
    return balance > 0;
}