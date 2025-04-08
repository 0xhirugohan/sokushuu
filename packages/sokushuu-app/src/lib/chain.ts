import { defineChain } from 'viem';

export const educhainTestnet = defineChain({
    id: 656476,
    name: 'Educhain Testnet',
    nativeCurrency: {
        name: 'Educhain Testnet',
        symbol: 'EDU',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://rpc.open-campus-codex.gelato.digital'],
            webSocket: ['wss://ws.open-campus-codex.gelato.digital'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Educhain Testnet Explorer',
            url: 'https://opencampus-codex.blockscout.com',
        },
    },
    contracts: {
        multicall3: {
            address: '0x8e4fD6E585B055755a8fE6E5083Ed6dddD53a1f2'
        },
    }
});