// Dashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home.js';
import Header from './header/Header.js';  // Importa il componente Header

function Dashboard() {
  return (
    <div className="dashboard">
      <Header /> 
      <Home />
    </div>
  );
}

export default Dashboard;
