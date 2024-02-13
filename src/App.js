import React, { useState } from 'react';
import './App.css';
import Table from './Table';
import Player from './Player';
import io from 'socket.io-client';
import { useEffect } from 'react';
import Chat from './Chat';

function App() {

  const [communityCards, setCommunityCards] = useState([]);

  const [players, setPlayers] = useState([]);

  const roomID = 'algumaSala123';

  const [socket, setSocket] = useState(null);
  
  const onDealFlop = () => {
    setCommunityCards(deck.slice(0, 3));
  };

  const onDealTurn = () => {
    setCommunityCards(prevCards => [...prevCards, deck[3]]);
  };

  const onDealRiver = () => {
    setCommunityCards(prevCards => [...prevCards, deck[4]]);
  };

  useEffect(() => {
    const newSocket = io('http://localhost:7000');
  
    newSocket.on('connect', () => {
      newSocket.emit('joinGameRoom', { roomID, playerData: {name: "Player " + newSocket.id} });
    
      newSocket.on('atualizarJogo', (data) => {
        // Atualizar o estado do jogo com base nos dados recebidos
      });
    
      newSocket.on('playersList', (players) => {
        setPlayers(players);
      });
  
  
      newSocket.on('dealFlop', onDealFlop);
      newSocket.on('dealTurn', onDealTurn);
      newSocket.on('dealRiver', onDealRiver);
    });
  
    setSocket(newSocket);
  
    return () => {
      newSocket.off('atualizarJogo');
      newSocket.off('playersList');
      newSocket.off('dealFlop');
      newSocket.off('dealTurn');
      newSocket.off('dealRiver');
      newSocket.disconnect();
    };
  }, []);

  const deck = [
    { suit: 'Hearts', value: '10' },
    { suit: 'Diamonds', value: 'J' },
    { suit: 'Clubs', value: 'Q' },
    { suit: 'Spades', value: 'K' },
    { suit: 'Hearts', value: 'A' },
  ]; 

  const tableWidth = 800; 
  const tableHeight = 400; 

  const calculatePosition = (index, total) => {
    const x = index < total / 2 ? (tableWidth / (total / 2)) * index : (tableWidth / (total / 2)) * (index - total / 2);
    const y = index < total / 2 ? 0 : tableHeight;
    return { left: `${x}px`, top: `${y}px` };
  };

  return (
    <div className="App">
      <h1>Poker Texas Hold'em</h1>
      <div className="poker-table">
        <Table cards={communityCards} />
        {players.map((player, index) => (
          <Player key={player.name} name={player.name} position={calculatePosition(index, players.length)} />
        ))}
      </div>
      {socket && <Chat socket={socket} roomID={roomID} /> }
    </div>
  );
}

export default App;
