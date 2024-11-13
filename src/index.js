import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';  // Importa Router
import App from './App';  // Assicurati che il componente App esista

const root = ReactDOM.createRoot(document.getElementById('root'));

// Usa il Router per avvolgere tutta l'applicazione
root.render(
  <Router>
    <App />
  </Router>
);
