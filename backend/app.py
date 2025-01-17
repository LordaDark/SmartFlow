from flask import Flask, request, jsonify
import spacy
from flask_cors import CORS
import os

# Crea l'app Flask
app = Flask(__name__)
CORS(app)

# Carica il modello spaCy
nlp = spacy.load("it_core_news_sm")

@app.route("/analyze", methods=["POST"])
def analyze_text():
    data = request.json
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "Missing text input"}), 400

    doc = nlp(text)
    action, target = None, None

    # Analizza il testo per trovare azione e target
    for token in doc:
        if token.pos_ == "VERB":
            action = token.text
        elif token.pos_ == "NOUN":
            target = token.text

    if action and target:
        return jsonify({"action": action, "target": target})
    else:
        return jsonify({"error": "Azione o target non riconosciuti"}), 400

@app.route("/generate-command", methods=["POST"])
def generate_command():
    # Stampa i dati ricevuti per il debug
    print("Dati ricevuti da AIForm.js:", request.json)

    data = request.json
    if not data or 'action' not in data or 'target' not in data:
        return jsonify({"error": "Errore nei dati ricevuti. Assicurati di inviare un JSON con 'action' e 'target'."}), 400
    
    action = data['action']
    target = data['target']
    
    # Normalizza il target per evitare problemi con maiuscole/minuscole
    target = target.lower()
    
    commands = []

    # Controllo combinazioni specifiche
    if action.lower() == "avvia":
        if "note" in target:
            commands.append("start notepad.exe")  # Esegui Blocco Note
        if "cmd" in target or "prompt" in target:
            commands.append("start cmd.exe")  # Esegui il prompt dei comandi
        if "browser" in target:
            commands.append("start chrome.exe")  # Esegui il browser Chrome (se installato)
    elif action.lower() == "apri":
        if "blocco" in target:
            commands.append("start notepad")  # Apri Blocco Note

    # Risposta con una lista di comandi
    if commands:
        return jsonify({"commands": commands})
    else:
        return jsonify({"command": f"Comando sconosciuto per azione: {action}, target: {target}"}), 400

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render fornisce la variabile PORT
    print(f"Esecuzione su porta: {port}")  # Log per vedere quale porta è in uso
    app.run(host='0.0.0.0', port=port)  # Ascolta su tutte le interfacce IP disponibili
