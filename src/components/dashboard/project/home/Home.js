import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebaseConfig/firebaseConfig.js';
import ProjectSelect from './ProjectSelect/ProjectSelect.js';
import HeaderProject from './ProjectSelect/HeaderProject/HeaderProject.js';
import './Home.css';

const Home = ({ isEditing }) => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError('Devi essere autenticato per visualizzare i tuoi progetti.');
      return;
    }

    const userProjectsRef = collection(db, `projects/${user.uid}/userProjects`);

    const unsubscribe = onSnapshot(
      userProjectsRef,
      (querySnapshot) => {
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);
        setError(null);
      },
      (error) => {
        console.error('Errore nel recupero dei progetti in tempo reale:', error);
        setError('Errore nel recupero dei progetti. Riprova più tardi.');
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isEditing) {
      setSelectedProjects([]); // Deseleziona tutti i progetti
    }
  }, [isEditing]);

  const toggleProjectSelection = (projectId) => {
    if (isEditing) {
      setSelectedProjects((prevSelected) =>
        prevSelected.includes(projectId)
          ? prevSelected.filter((id) => id !== projectId)
          : [...prevSelected, projectId]
      );
    }
  };

  const deselectAllProjects = () => {
    setSelectedProjects([]); // Deseleziona tutti i progetti
  };

  const deleteSelectedProjects = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    // Verifica se l'utente è autenticato
    if (user && selectedProjects.length > 0) {
      try {
        // Elimina solo i progetti selezionati e appartenenti all'utente
        await Promise.all(
          selectedProjects.map(async (projectId) => {
            // Ottieni il riferimento del progetto specifico dell'utente
            const projectRef = doc(db, `projects/${user.uid}/userProjects`, projectId);
            
            // Elimina il progetto da Firestore
            await deleteDoc(projectRef);
          })
        );
  
        // Dopo aver eliminato i progetti selezionati, resetta la selezione
        setSelectedProjects([]);
      } catch (error) {
        console.error("Errore durante l'eliminazione dei progetti:", error);
      }
    } else {
      console.log("Nessun progetto selezionato o utente non autenticato.");
    }
  };  

  const isProjectSelected = selectedProjects.length > 0;

  return (
    <div className="home-container">
      {isEditing && (
        <HeaderProject
          isProjectSelected={isProjectSelected}
          onDeselectAll={deselectAllProjects}
          onDeleteSelected={deleteSelectedProjects}
        />
      )}
      <div className="project-container">
        {error ? (
          <p className="error-message">{error}</p>
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              style={{ position: 'relative' }}
              onClick={() => {
                if (isEditing) {
                  toggleProjectSelection(project.id);
                } else {
                  navigate(`/project/${project.id}`);
                }
              }}
            >
              {isEditing && (
                <ProjectSelect
                  isSelected={selectedProjects.includes(project.id)}
                  onToggle={() => toggleProjectSelection(project.id)}
                />
              )}
              <div className="project-details">
                <p className="project-title">{project.projectName}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Nessun progetto trovato</p>
        )}
      </div>
    </div>
  );
};

export default Home;
