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
  const [commands, setCommands] = useState([]); // Stato per i comandi generati
  const [spaCyData, setSpaCyData] = useState(null); // Stato per i dati da spaCy

  // Funzione per inviare il testo a spaCy
  const handleAnalyze = async (text) => {
    try {
      console.log("Invio del testo a spaCy...");

      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("dati spaCy:", result);
        setSpaCyData(result); // Memorizza i dati di spaCy

        // Invio i dati elaborati da spaCy a GPT-Neo
        handleGenerateCommand(result); // Passa tutto l'oggetto risultante a GPT-Neo
      } else {
        const error = await response.json();
        console.error("Errore nell'API spaCy:", error);
      }
    } catch (error) {
      console.error("Errore di connessione con spaCy:", error);
    }
  };

  // Funzione per inviare i dati a GPT-Neo
  const handleGenerateCommand = async (data) => {
    try {
      console.log("Invio dei dati a GPT-Neo...", data);

      const response = await fetch("http://127.0.0.1:5000/generate-command", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Assicurati che i dati siano in formato JSON
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Comandi generati:", responseData.commands);
        setCommands(responseData.commands); // Salva i comandi generati
      } else {
        console.error("Errore nell'API GPT-Neo:", responseData);
      }
    } catch (error) {
      console.error("Errore durante la chiamata API:", error);
    }
  };

  // Funzione per gestire la sottomissione del modulo
  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setNotification({
        message: 'Devi essere autenticato per aggiungere un progetto.',
        type: 'error',
      });
      setTimeout(() => setNotification(null), 5000); // Rimuovi la notifica dopo 5 secondi
      return;
    }

    try {
      // Percorso della sottocollezione dell'utente
      const userProjectsRef = collection(db, `projects/${user.uid}/userProjects`);

      // Aggiungi il progetto
      await addDoc(userProjectsRef, {
        projectName: projectName,
        description: description,
        createdAt: new Date(),
      });

      setNotification({
        message: 'Progetto aggiunto con successo!',
        type: 'success',
      });
      setTimeout(() => setNotification(null), 5000); // Rimuovi la notifica dopo 5 secondi

      // Resetta i campi del modulo
      setProjectName('');
      setDescription('');

      // Invia il testo a spaCy
      handleAnalyze(description); // Usa la descrizione del progetto come input
    } catch (e) {
      console.error('Errore durante l\'aggiunta del progetto: ', e);
      setNotification({
        message: 'Errore durante l\'aggiunta del progetto.',
        type: 'error',
      });
      setTimeout(() => setNotification(null), 5000); // Rimuovi la notifica dopo 5 secondi
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

      {/* Visualizza i dati di spaCy */}
      {spaCyData && (
        <div className="spacy-output">
          <p>Dati elaborati da spaCy: Azioni: {spaCyData.action}, Target: {spaCyData.target}</p>
        </div>
      )}

      {/* Visualizza i comandi generati */}
      {commands.length > 0 && (
        <div className="command-output">
          <h3>Comandi generati:</h3>
          {commands.map((command, index) => (
            <p key={index}>{command}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIForm;
