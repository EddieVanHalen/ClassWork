import React, { useState, useEffect } from 'react';
import './Loading.css';
import './Button.css';
import { Card } from './Card/Card';

export const CardBox = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    const fetchCharacters = async (pageNum) => {
        setLoading(true);

        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${pageNum}`);
            const data = await response.json();

            setNextPage(data.info.next);
            setPrevPage(data.info.prev);
            setCharacters(data.results);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacters(page);
    }, [page]);

    const handleNextPage = () => {
        if (nextPage) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (prevPage) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    let content;

    if (loading) {
        content = <div className="loader"/>;
    } else {
        content = (
            <>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    {characters.map((person) => (
                        <Card key={person.id} person={person}/>
                    ))}
                </div>

                <div style={{marginTop: '20px'}}>
                    <button
                        onClick={handlePrevPage}
                        disabled={!prevPage}
                        className={!prevPage ? 'not-active' : 'btn'}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={!nextPage}
                        className={!nextPage ? 'not-active' : 'btn'}
                    >
                        Next
                    </button>
                </div>

            </>
        );
    }

    return <div>{content}</div>;
};
