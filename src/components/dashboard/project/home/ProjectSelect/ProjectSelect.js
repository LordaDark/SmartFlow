import React from 'react';
import './ProjectSelect.css';

const ProjectSelect = ({ isSelected, onToggle }) => {
  return (
    <div
      className={`project-select-circle ${isSelected ? 'selected' : ''}`}
      onClick={(e) => {
        e.stopPropagation(); // Previene il clic sulla card
        onToggle();
      }}
    >
      {isSelected && <span className="checkmark">✔</span>}
    </div>
  );
};

export default ProjectSelect;
