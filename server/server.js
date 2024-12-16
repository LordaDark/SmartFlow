import express from 'express';
import bodyParser from 'body-parser';
import { v2 as cloudinary } from 'cloudinary';

const app = express();
app.use(bodyParser.json());

// Configura Cloudinary con API Key e Secret
cloudinary.config({
  cloud_name: 'bogdan0',
  api_key: '273281668831141', // Inserisci qui la tua API Key
  api_secret: 'mFw53g3EkcGucGypVKblAE-iGso', // Inserisci qui il tuo API Secret
});

// Endpoint per eliminare immagini
app.post('/delete-image', async (req, res) => {
  const { publicId } = req.body;

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Errore durante la distruzione dell’immagine:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Avvia il server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server proxy in esecuzione su http://localhost:${PORT}`);
});
