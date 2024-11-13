import React from 'react';
import './Service.css';
import { FaTools, FaLaptopCode, FaHeadset } from 'react-icons/fa';

function Service() {
  return (
    <section className="servizi" id="service">
        <h2>I Nostri Servizi</h2>
        <div className="service-grid">
            <div className="service">
                <FaTools size={40} color="#23395d" />
                <h3>Consulenza</h3>
                <p>Offriamo consulenze tecnologiche su misura.</p>
                <div className="service-desc">
                    I nostri esperti ti aiuteranno a scegliere la soluzione migliore per le tue esigenze.
                </div>
            </div>
            <div className="service">
                <FaLaptopCode size={40} color="#23395d" />
                <h3>Sviluppo Software</h3>
                <p>Creiamo soluzioni software innovative.</p>
                <div className="service-desc">
                    Soluzioni software su misura per il tuo business e la tua azienda.
                </div>
            </div>
            <div className="service">
                <FaHeadset size={40} color="#23395d" />
                <h3>Assistenza Tecnica</h3>
                <p>Supporto tecnico continuo per i tuoi progetti.</p>
                <div className="service-desc">
                    Siamo sempre disponibili per garantire che i tuoi progetti non si fermino mai.
                </div>
            </div>
        </div>
    </section>
  );
}

export default Service;
