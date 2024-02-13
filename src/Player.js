import React from 'react';

// O componente Player recebe props para nome e posição, podendo ser expandido para incluir mais informações
function Player({ name, position }) {
  // A posição é aplicada diretamente ao estilo do componente para posicioná-lo ao redor da mesa
  return (
    <div className="player" style={position}>
      <div className="player-name">{name}</div>
      {/* Aqui você pode adicionar mais elementos de UI para representar a pilha de fichas, as ações do jogador, etc. */}
    </div>
  );
}

export default Player;
