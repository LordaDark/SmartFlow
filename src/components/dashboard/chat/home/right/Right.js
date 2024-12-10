import React, { useState, useEffect } from 'react';
import { ref, onValue, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { database } from '../../../../login/firebaseConfig/firebaseConfig.js';
import MessageList from './messagelist/MessageList.js';
import InputBar from './inputbar/InputBar.js';
import LogoContainer from './logocontainer/LogoContainer.js';
import './Right.css'; // Stili generali di Right

const Right = ({ currentChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    setCurrentUserId(userId);
  }, []);

  useEffect(() => {
    if (currentChat && currentUserId) {
      const messagesRef = ref(database, `${currentChat}/messages`);
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const messageList = [];
        for (let id in data) {
          messageList.push({
            id,
            ...data[id],
          });
        }
        setMessages(messageList);
      });
    }
  }, [currentChat, currentUserId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messagesRef = ref(database, `${currentChat}/messages`);
      push(messagesRef, {
        senderId: currentUserId,
        receiverId: 'altroUtenteId',
        message: newMessage,
        timestamp: Date.now(),
      });
      setNewMessage('');
    }
  };

  if (!currentUserId) {
    return <div>Utente non autenticato</div>;
  }

  return (
    <div className="right-container">
      {currentChat ? (
        <>
          <h3>Messaggi della Chat</h3>
          <MessageList messages={messages} currentUserId={currentUserId} />
          <InputBar
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
          />
        </>
      ) : (
        <LogoContainer />
      )}
    </div>
  );
};

export default Right;
