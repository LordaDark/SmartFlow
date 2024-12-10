import React, { useState } from 'react';
import Left from './left/Left.js';
import Right from './right/Right.js';
import './HomeChat.css';

const HomeChat = () => {
  const [currentChat, setCurrentChat] = useState(null); // Impostiamo null di default

  return (
    <div className="chat-container">
      <div className="chat-left-right">
        <Left setCurrentChat={setCurrentChat} /> {/* Lista delle chat */}
        <Right currentChat={currentChat} /> {/* Messaggi della chat selezionata */}
      </div>
    </div>
  );
};

export default HomeChat;
