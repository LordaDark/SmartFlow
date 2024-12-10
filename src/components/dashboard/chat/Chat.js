import React from "react";
import Header from "./header/Header.js";
import Home from "./home/HomeChat.js"; 
import './Chat.css';

const Chat = () => {
  return (
    <div className="chat-page" id="chat">
      <Header />
      <Home /> 
    </div>
  );
};

export default Chat;
