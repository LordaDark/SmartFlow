import axios from 'axios';
import { getAuth } from 'firebase/auth'; // Importa Firebase Auth per ottenere l'ID dell'utente

const cloudinaryUpload = async (file, oldImagePublicId = null) => {
  const auth = getAuth();
  const user = auth.currentUser; // Ottieni l'utente autenticato
  if (!user) throw new Error('Utente non autenticato');
  const userId = user.uid; // Ottieni l'ID dell'utente

  const url = `https://api.cloudinary.com/v1_1/bogdan0/image/upload`;
  const formData = new FormData();

  formData.append('file', file);
  formData.append('upload_preset', 'bogdan0');
  formData.append('folder', `profile_images/${userId}`); // Crea una cartella specifica per l'utente

  try {

    const response = await axios.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data.secure_url; // URL dell'immagine caricata
  } catch (error) {
    console.error('Errore durante l’upload su Cloudinary:', error);
    console.error('Errore dettagliato:', error.response?.data || error.message);
    throw error;
  }
};

export default cloudinaryUpload;
