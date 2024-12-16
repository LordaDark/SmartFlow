import axios from 'axios';
import { getAuth } from 'firebase/auth';

// Funzione per recuperare tutte le immagini associate a un utente
const fetchUserImages = async (userId) => {
  const url = `https://api.cloudinary.com/v1_1/bogdan0/resources/image/folder/profile_images/${userId}`;
  
  try {
    const response = await axios.get(url, {
      auth: {
        username: '273281668831141', // Sostituisci con la tua API Key
        password: 'mFw53g3EkcGucGypVKblAE-iGso', // Sostituisci con la tua API Secret
      },
    });

    return response.data.resources.map((resource) => resource.public_id); // Restituisce un array di ID pubblici
  } catch (error) {
    console.error('Errore durante il recupero delle immagini:', error);
    throw error;
  }
};

// Funzione per eliminare un'immagine specifica
const deleteSingleImage = async (publicId) => {
  const url = `https://api.cloudinary.com/v1_1/bogdan0/image/destroy`;

  try {
    const response = await axios.post(url, { public_id: publicId }, {
      auth: {
        username: 'YOUR_API_KEY', // Sostituisci con la tua API Key
        password: 'YOUR_API_SECRET', // Sostituisci con la tua API Secret
      },
    });

    console.log(`Immagine ${publicId} eliminata con successo.`);
    return response.data;
  } catch (error) {
    console.error(`Errore durante l’eliminazione dell’immagine ${publicId}:`, error);
    throw error;
  }
};

// Funzione per eliminare tutte le immagini associate a un utente
const deleteAllUserImages = async (userId) => {
  try {
    // Recupera gli ID pubblici delle immagini dell'utente
    const publicIds = await fetchUserImages(userId);

    // Elimina ogni immagine individualmente
    for (const publicId of publicIds) {
      await deleteSingleImage(publicId);
    }

    console.log(`Tutte le immagini per l'utente ${userId} sono state eliminate.`);
  } catch (error) {
    console.error('Errore durante l’eliminazione di tutte le immagini:', error);
    throw error;
  }
};

export default deleteAllUserImages;
