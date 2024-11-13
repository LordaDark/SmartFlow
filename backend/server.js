// server.js (o app.js)
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

// Carica le variabili di ambiente dal file .env
dotenv.config();

// Configurazione Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

// Middleware per analizzare il corpo delle richieste
app.use(express.json());

// Configura Multer per la gestione dei file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint per il caricamento delle immagini
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Carica l'immagine su Cloudinary
  cloudinary.uploader.upload_stream(
    { resource_type: 'auto' },
    (error, result) => {
      if (error) {
        return res.status(500).send('Error uploading image to Cloudinary');
      }
      // Restituisci l'URL dell'immagine
      res.json({ url: result.secure_url });
    }
  ).end(req.file.buffer); // Trasmetti il file al Cloudinary
});

// Avvia il server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
