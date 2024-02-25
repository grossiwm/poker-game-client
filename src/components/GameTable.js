import React from 'react';
import Table from './Table';
import Player from './Player';
import ActionPanel from './ActionPanel';
import { useState } from 'react';
import { useEffect } from 'react';

function GameTable({ players, socket }) {

  const [communityCards, setCommunityCards] = useState([]);
  const [round, setRound] = useState('preflop')
  const [currentPlayerCards, setCurrentPlayerCards] = useState([]);
  const [potTotal, setPotTotal] = useState([]);


  const onDealPreFlop = () => {
    setCommunityCards([])
  }

  const onDealFlop = (cards) => {
    setCommunityCards(cards);
  };

  const onDealTurn = (cards) => {
    setCommunityCards(cards);
  };

  const onDealRiver = (cards) => {
    setCommunityCards(cards);
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
      socket.on('roundSet', ({round, cards}) => {
        setRound(round);
        if (round === 'flop') {
          onDealFlop(cards);
        } else if (round === 'turn') {
          onDealTurn(cards)
        } else if (round === 'river') {
          onDealRiver(cards);
        } else if (round === 'preflop') {
          onDealPreFlop();
        }
      });

      socket.on('potTotal', ({pot}) => {
        setPotTotal(pot);
      })

      socket.on('setPlayerCards', (cards) => {
        setCurrentPlayerCards(cards);
      })
      
      return () => {
        socket.off('roundSet');
      };
    }

  }, [socket]);

  return (
    <div className="poker-table">
      <Table cards={communityCards} potTotal={potTotal}/>
      {players.map((player, index) => (
        <Player key={player.name}
         name={player.name}
          position={calculatePosition(index, players.length)}
           isCurrentUser={isCurrentUser(player.id, socket.id)}
           chips={player.chips}
            cards={currentPlayerCards} />
      ))}
    </div>
  );
}

export default GameTable;
