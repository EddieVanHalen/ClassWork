import React, { useState, useEffect } from 'react';
import { Card } from './Card/Card';

export const CardBox = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchCharacters = async (pageNum) => {
        setLoading(true);

        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${pageNum}`);
            const data = await response.json();

            if (data.info.next === null) {
                setHasMore(false);
            }

            setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacters(page);
    }, [page]);

    const handleLoadMore = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    let content;

    if (loading) {
        content = <div>Loading</div>;
    } else if (hasMore) {
        content = (
            <>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {characters.map((person) => (
                        <Card key={person.id} person={person}/>
                    ))}
                </div>
                <button onClick={handleLoadMore}>
                    Show More
                </button>
            </>
        );
    } else {
        content = (
            <>
                <div>
                    {characters.map((person) => (
                        <Card key={person.id} person={person} />
                    ))}
                </div>
            </>
        );
    }

    return (
        <div>
            {content}
        </div>
    );
};
