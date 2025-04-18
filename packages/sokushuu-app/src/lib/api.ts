import type { IChatHistory } from "@/components/layouts/ChatMenu";
import { getAccount } from "@wagmi/core";

import { wagmiConfig } from "./wallet";

const login = async (address: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ address }),
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return { data: data.data };
}

const logout = async () => {
    // const address = document.cookie.split('; ').find(row => row.startsWith('address='))?.split('=')[1] ?? '';
    const { address } = getAccount(wagmiConfig);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'X-Address': address as string,
        },  
    });
    return response.json();
}

const getChatHistory = async (): Promise<IChatHistory[]> => {
    const address = document.cookie.split('; ').find(row => row.startsWith('address='))?.split('=')[1] ?? '';
    const response = await fetch(`${import.meta.env.VITE_API_URL}/chat/wallet/history`, {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'X-Address': address,
        },
    });
    const data = await response.json();
    return data.data;
}

interface ICollection {
    collectionId: number;
    name: string;
    creator: string;
    sellingPrice: number;
}

interface IDashboard {
    address: string;
    exploreCollections: ICollection[];
    recentlyCreatedCollections: ICollection[];
}

const getDashboard = async (): Promise<IDashboard> => {
    const { address } = getAccount(wagmiConfig);
    // const address = document.cookie.split('; ').find(row => row.startsWith('address='))?.split('=')[1] ?? '';
    const response = await fetch(`${import.meta.env.VITE_API_URL}/homepage/dashboard`, {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'X-Address': address as string,
        },
    });
    const data = await response.json();
    return data.data;
}

const searchCollections = async (query: string): Promise<ICollection[]> => {
    const address = document.cookie.split('; ').find(row => row.startsWith('address='))?.split('=')[1] ?? '';
    const response = await fetch(`${import.meta.env.VITE_API_URL}/homepage/dashboard/search?query=${query}`, {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'X-Address': address,
        },
    });
    const data = await response.json();
    return data.data.searchResults;
}

const searchCollectionsByCategory = async (categoryId: string): Promise<ICollection[]> => {
    const address = document.cookie.split('; ').find(row => row.startsWith('address='))?.split('=')[1] ?? '';
    const response = await fetch(`${import.meta.env.VITE_API_URL}/homepage/dashboard/category/${categoryId}`, {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'X-Address': address,
        },
    });
    const data = await response.json();
    return data.data.collections;
}

const createCollection = async (name: string) => {
    const address = document.cookie.split('; ').find(row => row.startsWith('address='))?.split('=')[1] ?? '';
    const response = await fetch(`${import.meta.env.VITE_API_URL}/homepage/dashboard/collection`, {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'X-Address': address,
        },
        body: JSON.stringify({ name }),
    });
    const data = await response.json();
    return data.data;
}

const getCollectionDetails = async (collectionId: string) => {
    const address = document.cookie.split('; ').find(row => row.startsWith('address='))?.split('=')[1] ?? '';
    const response = await fetch(`${import.meta.env.VITE_API_URL}/homepage/dashboard/collection/${collectionId}`, {
        method: "GET",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'X-Address': address,
        },
    });
    const data = await response.json();
    return data.data;
}

const createFlashcard = async (collectionId: number, front: string, back: string) => {
    const address = document.cookie.split('; ').find(row => row.startsWith('address='))?.split('=')[1] ?? '';
    const response = await fetch(`${import.meta.env.VITE_API_URL}/homepage/dashboard/collection/flashcard`, {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'X-Address': address,
        },
        body: JSON.stringify({ collectionId, front, back }),
    });
    const data = await response.json();
    return data.data;
}

const updateCollectionSellingPrice = async (collectionId: number, price: number, collectionAddress: `0x${string}`) => {
    const address = document.cookie.split('; ').find(row => row.startsWith('address='))?.split('=')[1] ?? '';
    const response = await fetch(`${import.meta.env.VITE_API_URL}/homepage/dashboard/collection/${collectionId}/sell`, {
        method: "PATCH",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'X-Address': address,
        },
        body: JSON.stringify({ price, collectionAddress }),
    });
    const data = await response.json();
    return data.data;
}

export {
    login,
    logout,
    getChatHistory,
    getDashboard,
    createCollection,
    searchCollections,
    searchCollectionsByCategory,
    getCollectionDetails,
    createFlashcard,
    updateCollectionSellingPrice,
};