import React from 'react';
import Card from './Card';
import Pot from './Pot';

function Table({ cards, potTotal }) {
  return (
    <div className="table">
      <div className="community-cards">
        {cards.map((card, index) => (
          <Card key={index} suit={card.suit} value={card.value} />
        ))}
      </div>
      <Pot className="pot" totalChips={potTotal} />
    </div>
  );
}

export default Table;
