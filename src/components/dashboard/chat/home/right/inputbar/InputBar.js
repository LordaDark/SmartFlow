import React from 'react';
import './InputBar.css'; // Stile per la barra di input

const InputBar = ({ newMessage, setNewMessage, sendMessage }) => {
  return (
    <div className="input-container chat-input-container"> {/* Nuova classe unica */}
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Scrivi un messaggio..."
        className="input chat-input" // Classe unica per l'input
      />
      <button onClick={sendMessage} className="button chat-send-button">Invia</button> {/* Classe unica per il bottone */}
    </div>
  );
};

export default InputBar;
