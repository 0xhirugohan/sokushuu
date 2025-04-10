import type { IChatHistory } from "@/components/layouts/ChatMenu";

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
    const address = document.cookie.split('; ').find(row => row.startsWith('address='))?.split('=')[1] ?? '';
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'X-Address': address,
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

export { login, logout, getChatHistory };