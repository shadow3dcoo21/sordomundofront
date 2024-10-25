import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NameContext } from './NameContext';
import '../style/Home.css';

const Home = () => {
  const { setName, setUser } = useContext(NameContext); // Agregamos setUser
  const [inputName, setInputName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleStart = async () => {
    try {
      const response = await fetch('http://localhost:3000/verificar-nombre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombres: inputName }),
      });

      const data = await response.json();

      if (data.existe) {
        setName(inputName);
        setUser({ id: data.usuario._id, nombres: data.usuario.nombres, apellidos: data.usuario.apellidos }); // Guardar el usuario en el contexto
        navigate('/presentar');
      } else {
        setError('El nombre no se encontró. Por favor, regístrate como nuevo usuario.');
      }
    } catch (error) {
      console.error('Error al verificar nombre:', error);
      setError('Ocurrió un error al verificar el nombre.');
    }
  };

  const handleNewUser = () => {
    navigate('/nuevo-usuario');
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
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleStart} className="start-button">INICIAR</button>
            <button onClick={handleNewUser} className="new-user-button">Nuevo Usuario</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
