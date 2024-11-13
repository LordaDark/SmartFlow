// Dashboard.js
import React from 'react';
import Home from './home/Home';
import Header from './header/Header';  // Importa il componente Header

function Dashboard() {
  return (
    <div className="dashboard">
      <Header />  {/* Aggiungi l'header sopra il contenuto */}
      <Home />
      {/* Qui puoi aggiungere altri componenti che comporranno la dashboard */}
    </div>
  );
}

export default Dashboard;
