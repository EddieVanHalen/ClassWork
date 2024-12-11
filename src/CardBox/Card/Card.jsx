import React from 'react';

export const Card = ({ person }) => {
    return (
        <div style={{ margin: '20px' , border : '1px solid black' }}>
            <img src={person.image} alt={person.name} />
            <h3>{person.name}</h3>
        </div>
    );
};
