import React, { useState, useEffect } from 'react';
import './LoadingNotification.css';

const LoadingNotification = ({ message, type, onClose, progress }) => {
  const [progressBar, setProgressBar] = useState(0);

  // Aggiorna la barra di caricamento in base al progresso
  useEffect(() => {
    if (progress >= 0 && progress <= 100) {
      setProgressBar(progress);
    }
  }, [progress]);

  return (
    <div className={`loading-notification ${type}`}>
      <div className="message">{message}</div>

      <div className="loading-bars">
        <div className="loading-bar" style={{ width: `${progressBar}%` }}></div>
      </div>

      <button className="close-btn" onClick={onClose}>
        X
      </button>
    </div>
  );
};

export default LoadingNotification;
