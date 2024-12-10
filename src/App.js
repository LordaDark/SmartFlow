// src/App.js
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home.js'; // Aggiungi .js
import LoginPage from './components/login/LoginPage.js'; // Aggiungi .js
import Dashboard from './components/dashboard/Dashboard.js'; // Aggiungi .js
import Profile from './components/profile/Profile.js'; // Aggiungi .js
import Chat from './components/dashboard/chat/Chat.js'; // Aggiungi .js
import Project from './components/dashboard/project/ProjectsPage.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/projects" element={<Project />} />
      </Routes>
    </div>
  );
}

export default App;
