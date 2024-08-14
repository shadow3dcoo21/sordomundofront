// src/components/Home.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NameContext } from './NameContext';
import '../style/Home.css'; // Asegúrate de crear este archivo para los estilos

const Home = () => {
  const { setName } = useContext(NameContext);
  const [inputName, setInputName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    setName(inputName);
    navigate('/presentar');
  };

  return (
    <div className="context">
      
    <div className="hijoconte">
        <img src="/images/fondo.svg" alt="Background" className="background-image" />
        <div className="titu">
            <h2>Bienvenido a</h2>
        </div>
        <div className="home-container">
            <div className="content">
                <img src="/images/SORDOMUNDO.svg" alt="SVG Image" className="svg-image" />
                <input 
                    type="text" 
                    placeholder="Ingresa tu nombre" 
                    value={inputName} 
                    onChange={(e) => setInputName(e.target.value)} 
                    className="name-input" 
                />
                <button onClick={handleStart} className="start-button">INICIAR</button>
            </div>
        </div>
    </div>
</div>

    
  );
};

export default Home;
