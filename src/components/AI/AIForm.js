import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebaseConfig.js';
import Notification from '../notification/Notification.js'; // Assumendo che hai una componente Notification
import './AIForm.css'; // File CSS per design e animazioni

const AIForm = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setNotification({
        message: 'Devi essere autenticato per aggiungere un progetto.',
        type: 'error',
      });
      return;
    }

    try {
      // Percorso della sottocollezione dell'utente
      const userProjectsRef = collection(db, `projects/${user.uid}/userProjects`);

      // Aggiungi il progetto
      const docRef = await addDoc(userProjectsRef, {
        projectName: projectName,
        description: description,
        createdAt: new Date(),
      });

      setNotification({
        message: 'Progetto aggiunto con successo!',
        type: 'success',
      });

      // Resetta i campi del modulo
      setProjectName('');
      setDescription('');
    } catch (e) {
      console.error('Errore durante l\'aggiunta del progetto: ', e);
      setNotification({
        message: 'Errore durante l\'aggiunta del progetto.',
        type: 'error',
      });
    }
  };

  return (
    <div className="ai-form-container">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)} // Funzione per chiudere la notifica
        />
      )}
      <form className="ai-form" onSubmit={handleSubmit}>
        <h2>Aggiungi un nuovo progetto</h2>

        {/* Campo per il nome del progetto */}
        <div className="form-group">
          <label htmlFor="projectName">Nome del progetto</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Inserisci il nome del progetto"
            required
          />
        </div>

        {/* Campo per la descrizione */}
        <div className="form-group">
          <label htmlFor="description">Descrizione del lavoro</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrivi il lavoro"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Bottone per inviare */}
        <button type="submit" className="submit-button">
          Salva progetto
        </button>
      </form>
    </div>
  );
};

export default AIForm;
