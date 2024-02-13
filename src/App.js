import React, { useState } from 'react';
import './App.css';
import Table from './Table';
import Player from './Player';
import io from 'socket.io-client';
import { useEffect } from 'react';

function App() {

  const [communityCards, setCommunityCards] = useState([]);

  const [players, setPlayers] = useState([]);

  useEffect(() => {

    const onDealFlop = () => {
      setCommunityCards(deck.slice(0, 3));
    };
  
    const onDealTurn = () => {
      setCommunityCards(prevCards => [...prevCards, deck[3]]);
    };
  
    const onDealRiver = () => {
      setCommunityCards(prevCards => [...prevCards, deck[4]]);
    };
  

    const socket = io('http://localhost:7000');
    
    socket.on('connect', () => {
      console.log('Conectado ao servidor');
      // Enviar evento para iniciar o jogo, por exemplo
      socket.emit('iniciarJogo');
    });
    
    socket.on('atualizarJogo', (data) => {
      // Atualizar o estado do jogo com base nos dados recebidos
    });
  
    socket.on('playersList', (players) => {
      setPlayers(players);
    });

    socket.on('dealFlop', onDealFlop);
    socket.on('dealTurn', onDealTurn);
    socket.on('dealRiver', onDealRiver);
  
    
    return () => {
      socket.off('dealFlop', onDealFlop);
      socket.off('dealTurn', onDealTurn);
      socket.off('dealRiver', onDealRiver);
      socket.disconnect();
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
    </div>
  );
}

export default App;
