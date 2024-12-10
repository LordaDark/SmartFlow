import React, { useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000); // Chiude la notifica dopo 2 secondi
    return () => clearTimeout(timer); // Pulisce il timer quando il componente viene smontato
  }, [onClose]);

  return (
    <div className={`notification-overlay ${type}`}>
      <div className="notification-box">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Notification;
