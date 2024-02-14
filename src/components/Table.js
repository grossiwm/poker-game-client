import React from 'react';
import Card from './Card';

function Table({ cards }) {
  return (
    <div className="table">
      <div className="community-cards">
        {cards.map((card, index) => (
          <Card key={index} suit={card.suit} value={card.value} />
        ))}
      </div>
    </div>
  );
}

export default Table;
