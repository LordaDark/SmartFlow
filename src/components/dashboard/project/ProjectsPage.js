// src/components/projects/ProjectsPage.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home.js';
import Header from './header/Header.js';

const ProjectsPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEditing = (editingState) => {
    setIsEditing(editingState);
  };

  return (
    <div>
      {/* Passa onToggleEditing a Header e isEditing a Home */}
      <Header onToggleEditing={handleToggleEditing} />
      <Routes>
        <Route path="/" element={<Home isEditing={isEditing} />} />
      </Routes>
    </div>
  );
};

export default ProjectsPage;
