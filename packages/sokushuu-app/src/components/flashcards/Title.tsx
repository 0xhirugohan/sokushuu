import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

import SearchIcon from "@/assets/search.svg";

const SearchInput = ({ setToggleOff, setSearchQuery, searchQuery, onSubmit }: { setToggleOff: () => void, setSearchQuery: (query: string) => void, searchQuery: string, onSubmit: () => void }) => {
    const setSearchQueryOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    }

    const handleOnBlur = () => {
        setTimeout(() => {
            setToggleOff();
        }, 500);
    }

    return <div className="w-full relative">
        <input
            onBlur={handleOnBlur}
            onChange={setSearchQueryOnChange}
            onKeyUp={handleKeyUp}
            className="w-full p-2 border-2 border-zinc-600 rounded-md"
            type="text"
            placeholder="What do you want to learn today?"
            value={searchQuery}
        />
        <button onClick={onSubmit} type="button" className="absolute inset-y-0 p-1 right-2 h-full cursor-pointer">
            <img className="w-8 h-8 p-1 hover:opacity-70" src={SearchIcon} alt="search" />
        </button>
    </div>
}

interface TitleProps {
    searchQueryProps?: string;
    collectionSlugProps?: string;
    text?: string
}

const Title: React.FC<TitleProps> = ({ searchQueryProps, collectionSlugProps, text }: TitleProps) => {
    const navigate = useNavigate();

    const [toggleSearch, setToggleSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleSearchOn = () => {
        setSearchQuery("");
        setToggleSearch(true);
    }

    const toggleSearchOff = () => {
        setToggleSearch(false);
    }

    const navigateToSearch = () => {
        setToggleSearch(false);
        navigate(`/search?query=${searchQuery}`);
    }

    let titleText = 'What do you want to learn today?';
    if (searchQueryProps) {
        titleText = `Search on '${searchQueryProps}'`;
    }

    if (collectionSlugProps) {
        titleText = collectionSlugProps;
    }

    if (text) {
        titleText = text;
    }

    return <div className="flex justify-between">
        {toggleSearch ? <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} setToggleOff={toggleSearchOff} onSubmit={navigateToSearch} /> : 
        <>
            <div className="text-sm md:text-lg my-auto">
                {titleText}
            </div>
            { !collectionSlugProps && <button onClick={toggleSearchOn} type="button" className="cursor-pointer">
                <img className="p-1 w-8 h-8" src={SearchIcon} alt="search" />
            </button>
            }
        </>
        }
    </div>
}

export { Title };