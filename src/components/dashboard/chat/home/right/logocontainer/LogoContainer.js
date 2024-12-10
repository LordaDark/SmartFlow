import React from 'react';
import './LogoContainer.css'; // Stile specifico per il logo

const LogoContainer = () => {
  return (
    <div className="logo-container">
      <div className='img-container'>
        <img src="/logo192.png" alt="Logo" className="chat" />
      </div>
      <div className='text-container'>
        <h2>Chat di SmartFlow</h2>
      </div>
    </div>
  );
};

export default LogoContainer;
