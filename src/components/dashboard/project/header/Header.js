import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileCircle from '../../../profile/ProfileCircle.js';
import AIForm from '../../../AI/AIForm.js';
import './Header.css';

function Header({ onToggleEditing }) {
  const navigate = useNavigate();
  const [showAIForm, setShowAIForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Stato per la modalità di modifica

  const handleNewProjectClick = () => {
    setShowAIForm(true); // Mostra la pagina AIForm
  };

  const closeAIForm = () => {
    setShowAIForm(false); // Chiudi la pagina AIForm
  };

  const toggleEditingMode = () => {
    const newEditingState = !isEditing;
    setIsEditing(newEditingState);
    onToggleEditing(newEditingState); // Notifica al componente genitore
  };

  return (
    <>
      <header className="header">
        <div className="left">
          <Link to="/" className="logo-link">
            <div className="logo">SmartFlow</div>
          </Link>
        </div>
        <div className="right" id="right">
          <button 
            className={`edit-mode-btn ${isEditing ? 'active' : ''}`} 
            onClick={toggleEditingMode}
          >
            {isEditing ? 'Chiudi Modifica' : 'Modalità Modifica'}
          </button>
          <button className="new-project-btn" onClick={handleNewProjectClick}>
            +
          </button>
          <Link to="/dashboard" className="dashboard-button">
            Vai alla Dashboard
          </Link>
          <ProfileCircle />
        </div>
      </header>
      {showAIForm && (
        <div className="ai-form-overlay">
          <div className="form-container">
            <AIForm />
            {/* Bottone per chiudere il form */}
            <button className="close-btn" onClick={closeAIForm}>
              Chiudi
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
