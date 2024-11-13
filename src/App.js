// src/App.js
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import LoginPage from './components/login/LoginPage';
import Dashboard from './components/dashboard/Dashboard'; // Importa il componente Dashboard
import Profile from './components/profile/Profile'; // Importa il componente Profile

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Aggiungi la rotta per la Dashboard */}
        <Route path="/profile" element={<Profile />} /> {/* Aggiungi la rotta per il Profilo */}
      </Routes>
    </div>
  );
}

export default App;
