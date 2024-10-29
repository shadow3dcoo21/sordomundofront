import React, { useState } from 'react';
import '../style/Completar.css';
function GifReset() {
  const gifUrl = "http://localhost:3000/datos/Abajo.gif";
  const [gifSrc, setGifSrc] = useState(gifUrl);

  const resetGif = () => {
    // Cambia la URL temporalmente para forzar el reinicio
    setGifSrc('');
    setTimeout(() => setGifSrc(gifUrl), 0);
  };

  return (
    <div>
      <img className='gif' src={gifSrc} alt="Mi GIF" />
      <button onClick={resetGif}>Reiniciar GIF</button>
    </div>
  );
}

export default GifReset;
