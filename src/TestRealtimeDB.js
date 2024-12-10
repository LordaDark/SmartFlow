import { getDatabase, ref, set } from "firebase/database";
import { database } from './components/login/firebaseConfig/firebaseConfig'; // Assicurati che il percorso sia corretto

const testDatabase = () => {
  const dbRef = ref(database, 'test/');
  set(dbRef, { message: 'Test database connection.' })
    .then(() => {
      console.log('Messaggio scritto nel database!');
    })
    .catch((error) => {
      console.error('Errore nella scrittura del database:', error);
    });
};

testDatabase();
