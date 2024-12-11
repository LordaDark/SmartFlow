import axios from 'axios';

const cloudinaryUpload = async (file) => {
  const CLOUDINARY_URL = process.env.CLOUDINARY_URL;

  if (!CLOUDINARY_URL) {
    throw new Error("Cloudinary URL non configurato nel file .env.");
  }

  const [cloudinaryKey, cloudinarySecret, cloudName] = CLOUDINARY_URL.split(/[:@/]+/).slice(1, 4);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'your_upload_preset'); // Sostituisci con il tuo preset configurato
  formData.append('api_key', cloudinaryKey);
  formData.append('api_secret', cloudinarySecret);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Errore durante l’upload su Cloudinary:", error);
    throw error;
  }
};

export default cloudinaryUpload;
