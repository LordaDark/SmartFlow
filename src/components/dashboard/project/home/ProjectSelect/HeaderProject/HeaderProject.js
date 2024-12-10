// src/components/Home/HeaderProject.js

import React from 'react';
import './HeaderProject.css';

const HeaderProject = ({ isProjectSelected, onDeselectAll, onDeleteSelected }) => {
  return (
    <div className={`header-project ${!isProjectSelected ? 'inactive' : ''}`}>
      <h2>Modifica progetti</h2>
      <div className="header-project-actions">
        {/* Pulsante per deselezionare tutti i progetti */}
        <button
          className="btn-deselect-all"
          onClick={onDeselectAll}
          disabled={!isProjectSelected}
        >
          Deseleziona tutto
        </button>
        
        {/* Pulsante per eliminare i progetti selezionati */}
        <button
          className="btn-delete-selected"
          onClick={onDeleteSelected}
          disabled={!isProjectSelected}
        >
          Elimina progetti selezionati
        </button>
      </div>
    </div>
  );
};

export default HeaderProject;
