import axios from 'axios';

// Funzione per inviare la descrizione dell'utente all'AI
export const sendToAI = async (description) => {
  try {
    const response = await axios.post('http://localhost:3000/ai-endpoint', { description });
    return response.data; // La risposta dell'AI sarà in `data`
  } catch (error) {
    console.error('Errore nell\'invio della descrizione all\'AI:', error);
    throw error; // Rilancia l'errore per gestirlo più tardi
  }
};
