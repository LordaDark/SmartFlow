import express from 'express';
import path from 'path';
import multer from 'multer';
import { analyzeImage } from './vision.js'; // Se hai già una funzione per l'analisi
import { fileURLToPath } from 'url';
import { ImageAnnotatorClient } from '@google-cloud/vision';

const app = express();
const port = 3000;

// Percorso per servire i file statici della build React
app.use(express.static(path.join(__dirname, '../build')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura il client della Vision API
const client = new ImageAnnotatorClient();

app.post('/ai-endpoint', async (req, res) => {
  const { description } = req.body;  // Ottieni la descrizione inviata

  try {
    // Qui puoi implementare la logica di invio descrizione a Cloud Vision
    // Se hai bisogno di inviare un'immagine, usa la Vision API per analizzarla.
    // Esempio di chiamata per l'analisi di testo nell'immagine:
    
    const [result] = await client.textDetection(description); // Adatta la chiamata alle tue esigenze
    console.log('Descrizione ricevuta dall\'utente:', description);
    console.log('Risultato:', result);

    res.json({ result: result }); // Rispondi con il risultato dell'AI

  } catch (error) {
    console.error('Errore durante l\'analisi dell\'AI:', error);
    res.status(500).json({ error: 'Errore nell\'analisi dell\'AI' });
  }
});

// Altri endpoint come il caricamento delle immagini (già presente nel tuo server)

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
