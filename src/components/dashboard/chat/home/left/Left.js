import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../../../login/firebaseConfig/firebaseConfig.js'; // Importa il database
import './Left.css';

const Left = ({ setCurrentChat }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Riferimento al nodo globalChat per ottenere tutte le chat
    const chatsRef = ref(database, 'globalChat');
    onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      const chatList = [];
      for (let id in data) {
        if (data[id].message) { // Assicurati che sia una chat con un messaggio
          chatList.push({
            id,
            author: data[id].author, // Aggiungi il nome dell'autore
            message: data[id].message, // Aggiungi il messaggio
          });
        }
      }
      setChats(chatList);
    });
  }, []);

  return (
    <div className="chat-left">
      <h3>Chat di SmartFlow</h3>
      {/* Chat Mondiale come bottone */}
      <div
        className="chat-list-item chat-button"
        onClick={() => setCurrentChat("globalChat")} // Seleziona la chat mondiale
      >
        🌍 Chat Mondiale
      </div>

      {/* Altre chat */}
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="chat-list-item"
          onClick={() => setCurrentChat(chat.id)} // Seleziona una chat
        >
          <strong>{chat.author}</strong>: {chat.message.substring(0, 30)}...
        </div>
      ))}
    </div>
  );
};

export default Left;
