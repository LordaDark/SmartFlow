import spacy

# Carica il modello
nlp = spacy.load("it_core_news_sm")

# Testa con una frase
doc = nlp("Apri il blocco note")

# Stampa i token e il loro POS (parte del discorso)
for token in doc:
    print(f"Token: {token.text}, POS: {token.pos_}")
