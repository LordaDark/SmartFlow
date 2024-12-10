import { GPTNeoForCausalLM, GPT2Tokenizer } from '@huggingface/transformers';
import { json } from 'micro';

// Funzione asincrona per inizializzare il modello e il tokenizer
async function initializeModel() {
    const tokenizer = await GPT2Tokenizer.from_pretrained("EleutherAI/gpt-neo-2.7B");
    const model = await GPTNeoForCausalLM.from_pretrained("EleutherAI/gpt-neo-2.7B");
    return { tokenizer, model };
}

// Funzione per generare testo usando GPT-Neo
async function generateText(model, tokenizer, prompt) {
    const inputs = tokenizer.encode(prompt, { return_tensors: 'pt' });
    const outputs = await model.generate(inputs, {
        max_length: 50, // Lunghezza massima del comando generato
        num_return_sequences: 1,
        temperature: 0.7,
    });
    return tokenizer.decode(outputs[0], { skip_special_tokens: true });
}

// Handler per le richieste
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const body = await json(req);
            const { text } = body;

            if (!text) {
                return res.status(400).json({ error: 'Missing "text" in request body.' });
            }

            // Inizializza modello e tokenizer
            const { tokenizer, model } = await initializeModel();

            // Genera il comando
            const generatedCommand = await generateText(model, tokenizer, text);

            // Rispondi con il comando generato
            res.status(200).json({ command: generatedCommand });
        } catch (error) {
            console.error('Errore nella generazione del comando:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Metodo non consentito
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
