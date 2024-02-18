import React from 'react';
import Table from './Table';
import Player from './Player';
import ActionPanel from './ActionPanel';
import { useState } from 'react';
import { useEffect } from 'react';

function GameTable({ players, socket }) {


  const deck = [
    { suit: 'Hearts', value: '10' },
    { suit: 'Diamonds', value: 'J' },
    { suit: 'Clubs', value: 'Q' },
    { suit: 'Spades', value: 'K' },
    { suit: 'Hearts', value: 'A' },
  ]; 

  const currentPlayerCards = [
    { suit: 'Hearts', value: '10' },
    { suit: 'Diamonds', value: 'J' }
  ]; 


  const [communityCards, setCommunityCards] = useState([]);
  const [round, setRound] = useState('preflop')


  const onDealPreFlop = () => {
    setCommunityCards([])
  }

  const onDealFlop = () => {
    setCommunityCards(deck.slice(0, 3));
  };

  const onDealTurn = () => {
    setCommunityCards(deck.slice(0, 4));
  };

  const onDealRiver = () => {
    setCommunityCards(deck.slice(0, 5));
  };

  const isCurrentUser = (playerId, currentPlayerId) => {
    return playerId === currentPlayerId;
  }

  const calculatePosition = (index, total) => {
    const x = index < total / 2 ? (tableWidth / (total / 2)) * index : (tableWidth / (total / 2)) * (index - total / 2);
    const y = index < total / 2 ? 0 : tableHeight;
    return { left: `${x}px`, top: `${y}px` };
  };

  const tableWidth = 800; 
  const tableHeight = 400; 

  useEffect(() => {
    if (socket) {
      socket.on('roundSet', ({round}) => {
        console.log('round:' + round)
        setRound(round);
        if (round === 'flop') {
          onDealFlop();
        } else if (round === 'turn') {
          onDealTurn()
        } else if (round === 'river') {
          onDealRiver();
        } else if (round === 'preflop') {
          console.log('esvaziando cartas')
          onDealPreFlop();
        }
      });
      
      return () => {
        socket.off('roundSet');
      };
    }

  }, [socket]);

  return (
    <div className="poker-table">
      <Table cards={communityCards} />
      {players.map((player, index) => (
        <Player key={player.name}
         name={player.name}
          position={calculatePosition(index, players.length)}
           isCurrentUser={isCurrentUser(player.id, socket.id)}
            cards={currentPlayerCards} />
      ))}
    </div>
  );
}

export default GameTable;
