import React from 'react';
import './Home.css';
import 'font-awesome/css/font-awesome.min.css'; // Importa Font Awesome

function Home() {
  return (
    <div className="home">
      <h1>Benvenuto nella Dashboard di SmartFlow</h1>
      <div className="button-container">
        <a href="/chat" className="button">
          <i className="fa fa-comment"></i>Chat
        </a>
        <a href="/shop" className="button">
          <i className="fa fa-shopping-cart"></i>Shop
        </a>
        <a href="/projects" className="button">
          <i className="fa fa-briefcase"></i>Progetti
        </a>
      </div>
    </div>
  );
}

export default Home;
