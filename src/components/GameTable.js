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


  const [communityCards, setCommunityCards] = useState([]);




  const onDealFlop = () => {
    setCommunityCards(deck.slice(0, 3));
  };

  const onDealTurn = () => {
    setCommunityCards(prevCards => [...prevCards, deck[3]]);
  };

  const onDealRiver = () => {
    setCommunityCards(prevCards => [...prevCards, deck[4]]);
  };

  const calculatePosition = (index, total) => {
    const x = index < total / 2 ? (tableWidth / (total / 2)) * index : (tableWidth / (total / 2)) * (index - total / 2);
    const y = index < total / 2 ? 0 : tableHeight;
    return { left: `${x}px`, top: `${y}px` };
  };

  const tableWidth = 800; 
  const tableHeight = 400; 

  useEffect(() => {
    if (socket) {
      socket.on('dealFlop', onDealFlop);
      socket.on('dealTurn', onDealTurn);
      socket.on('dealRiver', onDealRiver);
      
      // Limpeza
      return () => {
        socket.off('dealFlop');
        socket.off('dealTurn');
        socket.off('dealRiver');
        socket.off('yourTurn');
      };
    }
  }, [socket]);

  return (
    <div className="poker-table">
      <Table cards={communityCards} />
      {players.map((player, index) => (
        <Player key={player.name} name={player.name} position={calculatePosition(index, players.length)} />
      ))}
    </div>
  );
}

export default GameTable;
