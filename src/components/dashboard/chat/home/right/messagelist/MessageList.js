import React, { useState, useEffect } from 'react';
import './MessageList.css';
import { ref, get } from 'firebase/database';
import { database } from '../../../../../login/firebaseConfig/firebaseConfig.js';

const MessageList = ({ messages, currentUserId }) => {
  const [userNames, setUserNames] = useState({}); // Stato per memorizzare i nomi degli utenti

  // Recupera il nome dell'utente dal database Firebase
  useEffect(() => {
    messages.forEach((msg) => {
      if (msg.senderId !== currentUserId) {
        // Se il messaggio è stato inviato da un altro utente, recupera il suo nome
        if (!userNames[msg.senderId]) {
          const userRef = ref(database, `users/${msg.senderId}/name`);
          get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
              setUserNames((prevNames) => ({
                ...prevNames,
                [msg.senderId]: snapshot.val(),
              }));
            }
          });
        }
      }
    });
  }, [messages, currentUserId, userNames]);

  return (
    <div className="message-list">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`message ${msg.senderId === currentUserId ? 'user-message' : 'other-message'}`}
        >
          <div className="message-content">
            <div className="message-header">
              {/* Nome dell'autore */}
              <strong className="author">
                {msg.senderId === currentUserId
                  ? 'Tu'
                  : userNames[msg.senderId] || 'Altro Utente'}
              </strong>
            </div>
            {/* Testo del messaggio */}
            <p className="text">{msg.message}</p>
            {/* Timestamp */}
            <span className="timestamp">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
