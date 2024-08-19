import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NameContext } from './NameContext';
import '../style/NuevoUsuario.css';

const NuevoUsuario = () => {
  const { setName } = useContext(NameContext);
  const [inputName, setInputName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    setName(inputName);
    navigate('/presentar');
  };

  const handleAtras = () => {
    navigate('/');
  };

  return (
    <div className="context">
      <div className="hijoconte">
        <img src="/images/fondo.svg" alt="Background" className="background-image" />
        <div className="home-container">
          <div className="content">
            <h2 id='pregunta'>¿Cuál es tu nombre?</h2>
            <input 
              type="text" 
              placeholder="Ingresa tu nombre" 
              value={inputName} 
              onChange={(e) => setInputName(e.target.value)} 
              className="name-input" 
            />
            <button onClick={handleStart} className="start-button">INICIAR</button>
            <button onClick={handleAtras} className="atras-button">Atrás</button>          
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoUsuario;
