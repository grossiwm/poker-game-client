import React, { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import { useEffect } from 'react';
import Chat from './components/Chat';
import GameTable from './components/GameTable';
import ActionPanel from './components/ActionPanel';

function App() {


  const [players, setPlayers] = useState([]);

  const roomID = 'algumaSala123';

  const [socket, setSocket] = useState(null);

  const [positionTurn, setPositionTurn] = useState(null);

  const isPlayerTurn = (players, positionTurn) => {
    const playersFound = players.filter(p => p.id === socket.id);
    if (playersFound.length > 0) {
      const playerFound = playersFound[0];
      console.log(`position: ${playerFound.position}, positionToPlay: ${positionTurn}`)
      return playerFound.position === positionTurn;
    }
    return false;

  }
  

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

      newSocket.on('positionTurn', ({position}) => {
        console.log('received:' + position)
        setPositionTurn(position);
      });
  

    });
  
    setSocket(newSocket);
  
    return () => {
      newSocket.off('atualizarJogo');
      newSocket.off('playersList');
      newSocket.off('positionTurn');
      newSocket.disconnect();
    };
  }, []);

  

  return (
    <div className="App">
      <h1>Poker Texas Hold'em</h1>
      {socket && <GameTable 
        players={players} 
        socket={socket}
      />}
      {socket && isPlayerTurn(players, positionTurn) && <ActionPanel socket={socket}/>}
      {socket && <Chat socket={socket} /> }
    </div>
  );
}

export default App;
