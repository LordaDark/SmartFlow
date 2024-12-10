import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';  // Importa Router
import App from './App.js';  // Aggiungi l'estensione .js

const root = ReactDOM.createRoot(document.getElementById('root'));

// Usa il Router per avvolgere tutta l'applicazione
root.render(
  <Router>
    <App />
  </Router>
);
