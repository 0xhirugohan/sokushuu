import {
    createPublicClient,
    createWalletClient,
    custom,
    http,
    parseEther,
    getContract,
} from 'viem';
import { http as httpWagmi, createConfig } from 'wagmi';
import {
    getAccount as wagmiGetAccount,
    getClient,
    deployContract,
    simulateContract,
    writeContract,
} from '@wagmi/core';

import { educhainTestnet } from './chain';
import { wagmiAbi, wagmiBytecode } from './abi/CollectionOwnershipNFT';
import { SOKUSHUU_MINT_SALE_ADDRESS } from './constant';

// TODO: change to wagmi
export const wagmiConfig = createConfig({
    chains: [educhainTestnet],
    transports: {
        [educhainTestnet.id]: httpWagmi(),
    }
});

export const walletClient = createWalletClient({
    chain: educhainTestnet,
    transport: custom(window.ethereum),
});

export const publicClient = createPublicClient({
    chain: educhainTestnet,
    transport: http(),
});
export const wagmiPublicClient = getClient(wagmiConfig);


export const deployNFTContract = async (collectionTitle: string, collectionSymbol: string, price: number): Promise<`0x${string}`> => {
    const { address: account } = await wagmiGetAccount(wagmiConfig);

    const hash = await deployContract(wagmiConfig, {
        abi: wagmiAbi,
        account,
        args: [
            collectionTitle,
            collectionSymbol,
            parseEther(`${price}`, "wei"),
            SOKUSHUU_MINT_SALE_ADDRESS,
        ],
        bytecode: wagmiBytecode,
    })

    const receipt = await publicClient.getTransactionReceipt({ hash });
    const contractAddress = receipt.contractAddress;
    return contractAddress ?? "0x0000000000000000000000000000000000000000";
}

export const registerDeployedNFTContract = async (contractAddress: `0x${string}`): Promise<`0x${string}`> => {
    const { address: account } = await wagmiGetAccount(wagmiConfig);

    const { request } = await simulateContract(wagmiConfig, {
        account,
        address: contractAddress,
        abi: wagmiAbi,
        functionName: 'register',
    });
    const hash = await writeContract(wagmiConfig, request);
    return hash;
}

export const buyAndMintNFT = async (contractAddress: `0x${string}`, price: number) => {
    const { address: account } = await wagmiGetAccount(wagmiConfig);
    if (!account) return;

    const { request } = await simulateContract(wagmiConfig, {
        account,
        address: contractAddress,
        abi: wagmiAbi,
        functionName: 'mint',
        value: parseEther(`${price}`, 'wei'),
        args: [account],
    });
    const hash = await writeContract(wagmiConfig, request);
    return hash;
}

export const checkIfUserHasNFT = async (contractAddress: `0x${string}`): Promise<boolean> => {
    const { address: account } = await wagmiGetAccount(wagmiConfig);

    const contract = getContract({
        address: contractAddress,
        abi: wagmiAbi,
        client: publicClient,
    })

    const balance = await contract.read.balanceOf([account as `0x${string}`]);
    return balance > 0;
}