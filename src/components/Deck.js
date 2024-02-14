import React from 'react';
import Card from './Card';

function Deck() {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  return (
    <div className="deck">
      {suits.map(suit => 
        values.map(value => <Card key={value + suit} suit={suit} value={value} />)
      )}
    </div>
  );
}

export default Deck;
