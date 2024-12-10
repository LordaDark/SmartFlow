import { v1 as vision } from '@google-cloud/vision';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { VisionClient } from '@google-cloud/vision'; // Per Cloud Vision

// Ottieni il percorso corrente del file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Percorso al file JSON della chiave del servizio
const keyFilePath = path.join(__dirname, 'config', 'ia-smartflow-7538930efb61.json');

// Inizializza il client Vision con la chiave del servizio
const client = new vision.ImageAnnotatorClient({ keyFilename: keyFilePath });

// Funzione per analizzare un'immagine
export const analyzeImage = async (imagePath) => {
  try {
    // Carica l'immagine
    const [result] = await client.labelDetection(imagePath);
    const labels = result.labelAnnotations;

    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
    return labels;
  } catch (error) {
    console.error('Errore nell\'analisi dell\'immagine:', error);
  }
};

const client = new VisionClient();

// Funzione per analizzare la descrizione dell'utente
export const analyzeDescriptionWithAI = async (description) => {
  const [result] = await client.textDetection(description);
  return result; // Risultato dell'analisi
};
