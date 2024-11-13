import { v2 as cloudinary } from 'cloudinary';

// Configurazione di Cloudinary
cloudinary.config({
  cloud_name: 'bogdan0', // Il tuo cloud_name di Cloudinary
  api_key: '273281668831141', // La tua API key
  api_secret: 'mFw53g3EkcGucGypVKblAE-iGso', // Il tuo API secret
});

// Funzione per caricare l'immagine su Cloudinary
export const uploadImageToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'bogdan0'); // Puoi definirlo nella dashboard di Cloudinary

    const response = await fetch(`https://api.cloudinary.com/v1_1/bogdan0/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.secure_url; // Restituisce l'URL dell'immagine caricate
  } catch (error) {
    console.error('Errore durante il caricamento su Cloudinary:', error);
  }
};

// Funzione per recuperare l'immagine del profilo (se esiste)
export const getProfileImage = (userUid) => {
  // Qui puoi aggiungere la logica per recuperare l'URL dell'immagine dal database Firestore se è stato caricato
  // Ad esempio, supponiamo che l'URL dell'immagine sia salvato come profilePicture
  return `https://res.cloudinary.com/bogdan0/image/upload/v1234567890/profiles/${userUid}.jpg`; // URL dell'immagine di esempio
};
