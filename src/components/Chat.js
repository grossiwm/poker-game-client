import React, { useState, useEffect } from 'react';

function Chat({ socket}) {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const sendMessage = () => {
    if (message) {
      socket.emit('chatMessage', { message });
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('newChatMessage', (data) => {
      setChatMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('newChatMessage');
    };
  }, [socket]);

  return (
    <div>
      <div>
        {chatMessages.map((msg, index) => (
          <p key={index}><strong>{msg.sender}:</strong> {msg.message}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Digite uma mensagem..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}

export default Chat;
