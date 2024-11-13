import React from 'react';
import './About.css';

function About() {
  return (
    <section className="chi-siamo" id="about">
      <h2>Chi Siamo</h2>
      <div className="nuvolette-container">
        {/* Prima descrizione: nuvoletta */}
        <div className="nuvoletta">
          <p>SmartFlow ti aiuta a gestire progetti e dati con semplicità e precisione.</p>
        </div>

        {/* Box quadrati con sfondo */}
        <div className="nuvolette-container-row">
          <div className="box-sfondo">
            <p>Offriamo strumenti avanzati per organizzare e monitorare le attività, con notifiche in tempo reale e collaborazione integrata.</p>
          </div>
          <div className="box-sfondo">
            <p>La sicurezza dei dati è la nostra priorità: ogni operazione è protetta e affidabile.</p>
          </div>
          <div className="box-sfondo">
            <p>Il nostro team di esperti è pronto a garantirti un’esperienza fluida e personalizzata.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
