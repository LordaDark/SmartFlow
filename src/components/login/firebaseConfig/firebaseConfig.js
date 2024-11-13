import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Importa il modulo Auth di Firebase
import { getFirestore } from "firebase/firestore"; // Importa Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDys2tBCYvQrIX-TPKlsFi2ehluI9rxRMk",
  authDomain: "ia-smartflow.firebaseapp.com",
  projectId: "ia-smartflow",
  storageBucket: "ia-smartflow.firebasestorage.app",
  messagingSenderId: "752707089576",
  appId: "1:752707089576:web:a7f62d57f4ef21ff01fe9d",
  measurementId: "G-BX6VC0WQ07"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Inizializza Firebase Authentication
const db = getFirestore(app); // Inizializza Firestore

export { auth, db }; // Esporta anche il database Firestore
