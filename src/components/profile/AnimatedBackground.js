import React, { useEffect, useRef, useState } from 'react';
import './AnimatedBackground.css'; // Assicurati di avere lo stile nel CSS

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  
  // Palette di colori chiari e variabili
  const colors = [
    '#A7C7E7', '#F6D1A1', '#F4E1C1', '#D1E7F4', '#F2D1D1', '#D3E2C8', '#F2E8D5', '#A1D8B0',
    '#E1F7D5', '#F9E1D2', '#D1B9F2', '#B6D1F2', '#F2C6D1', '#F1F0A7', '#C1F2E4', '#E4D1F2'
  ];
  
  // Stato dei colori che vengono usati nel gradiente
  const [gradientColors, setGradientColors] = useState([colors[0], colors[1], colors[2]]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Funzione per miscelare due colori casualmente
    const mixColors = (color1, color2) => {
      const c1 = parseInt(color1.slice(1), 16);
      const c2 = parseInt(color2.slice(1), 16);

      const r1 = (c1 >> 16) & 0xff;
      const g1 = (c1 >> 8) & 0xff;
      const b1 = c1 & 0xff;

      const r2 = (c2 >> 16) & 0xff;
      const g2 = (c2 >> 8) & 0xff;
      const b2 = c2 & 0xff;

      // Mischiamo i colori in modo casuale
      const r = Math.floor((r1 + r2) / 2);
      const g = Math.floor((g1 + g2) / 2);
      const b = Math.floor((b1 + b2) / 2);

      // Ritorniamo il nuovo colore miscelato in formato esadecimale
      return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
    };

    // Funzione per generare un gradiente fluido con colori miscelati e nuovi colori
    const createFluidGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

      // Selezioniamo due colori casuali dalla lista di colori esistenti
      const color1 = gradientColors[Math.floor(Math.random() * gradientColors.length)];
      const color2 = gradientColors[Math.floor(Math.random() * gradientColors.length)];

      // Mischiamo i due colori scelti
      const mixedColor = mixColors(color1, color2);

      // Aggiungiamo il colore miscelato alla lista dei colori
      const newColors = [...gradientColors, mixedColor];

      // Creiamo il gradiente con i colori attuali
      gradient.addColorStop(0, gradientColors[0]);
      gradient.addColorStop(0.33, gradientColors[1]);
      gradient.addColorStop(0.66, gradientColors[2]);
      gradient.addColorStop(1, mixedColor);

      // Aggiungiamo il nuovo colore alla lista di colori
      setGradientColors(newColors);

      return gradient;
    };

    // Funzione per disegnare il canvas con gradiente fluido
    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Crea il gradiente fluido
      const gradient = createFluidGradient();

      // Applica il gradiente al canvas
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Incrementa il tempo per il cambiamento continuo
      setTime((prevTime) => prevTime + 0.003); // Rallenta per ottenere un cambiamento più graduale

      // Rende l'animazione continua
      animationFrameId = requestAnimationFrame(draw);
    };

    // Inizializza l'animazione
    draw();

    // Cleanup dell'animazione
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gradientColors]);

  return <canvas ref={canvasRef} className="animated-background" width="128" height="128"></canvas>;
};

export default AnimatedBackground;
