function ActionPanel({ socket }) {

    const onAction = (action, amount) => {
        socket.emit('playerAction', { action, amount });
    }

    return (
      <div className="action-panel">
        <button onClick={() => onAction('check')}>Check</button>
        <button onClick={() => onAction('bet', 100)}>Bet</button>
        <button onClick={() => onAction('raise', 200)}>Raise</button>
        <button onClick={() => onAction('fold')}>Fold</button>
      </div>
    );
  }
  
  export default ActionPanel;
  