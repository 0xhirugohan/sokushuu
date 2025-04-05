import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router'

import { FlashcardMenu } from '@/components/layouts/FlashcardMenu'

const Search = () => {
    const [searchParams] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')

    useEffect(() => {
        setSearchQuery(searchParams.get('query') || '')
    }, [searchParams])

    return <FlashcardMenu searchQueryProps={searchQuery} />
};

export { Search };
