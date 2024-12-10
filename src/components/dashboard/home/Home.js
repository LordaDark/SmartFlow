import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importa Link da react-router-dom
import { auth, db } from '../../login/firebaseConfig/firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';
import './Home.css';
import 'font-awesome/css/font-awesome.min.css'; // Importa Font Awesome
import DataCompletionPrompt from '../DataCompletionPrompt/DataCompletionPrompt.js'; // Importa il componente

function Home() {
  const [showDataPrompt, setShowDataPrompt] = useState(false);

  useEffect(() => {
    const checkUserData = async () => {
      if (auth.currentUser) {
        // Verifica se l'utente è autenticato tramite Google
        const isGoogleLogin = auth.currentUser.providerData.some(
          (provider) => provider.providerId === 'google.com'
        );

        // Se l'utente è autenticato tramite Google, verifica se i dati sono completi
        if (isGoogleLogin) {
          const userRef = doc(db, "users", auth.currentUser.uid);
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            const data = userSnapshot.data();
            // Se i dati sono incompleti (ad esempio, senza nome o telefono), mostra la richiesta
            if (!data.firstName || !data.lastName || !data.phoneNumber) {
              setShowDataPrompt(true);
            }
          } else {
            // Se non ci sono dati nel DB, mostra comunque il prompt
            setShowDataPrompt(true);
          }
        }
      }
    };

    checkUserData();
  }, []);

  const handleClosePrompt = () => {
    setShowDataPrompt(false);
  };

  return (
    <div className="home">
      <h1>Benvenuto nella Dashboard di SmartFlow</h1>
      <div className="button-container">
        <Link to="/chat" className="button">
          <i className="fa fa-comment"></i>Chat
        </Link>
        <Link to="/shop" className="button">
          <i className="fa fa-shopping-cart"></i>Shop
        </Link>
        <Link to="/projects" className="button">
          <i className="fa fa-briefcase"></i>Progetti
        </Link>
      </div>

      {showDataPrompt && (
        <DataCompletionPrompt onClose={handleClosePrompt} />
      )}
    </div>
  );
}

export default Home;
