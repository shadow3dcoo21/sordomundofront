import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NameContext } from './NameContext';
import '../style/NuevoUsuario.css';

const NuevoUsuario = () => {
  const { setName } = useContext(NameContext);
  const [inputName, setInputName] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [sexo, setSexo] = useState('Masculino'); // Valor por defecto
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const verificarNombre = async () => {
    try {
      const response = await fetch('http://localhost:3000/verificar-nombre', { // URL completa
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: inputName }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return data.existe;
    } catch (error) {
      console.error('Error al verificar nombre:', error);
      return false;
    }
  };
  
  const registrarUsuario = async () => {
    try {
      const response = await fetch('http://localhost:3000/registrar-alumno', { // URL completa
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombres: inputName,
          apellidos: apellidos,
          sexo: sexo,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      if (data.success) {
        setMensaje('Usuario registrado con éxito');
        setName(inputName); // Establece el nombre global
        navigate('/presentar'); // Navega a la siguiente página
      } else {
        setMensaje('Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };
  
  const handleStart = async () => {
    if (!inputName || !apellidos) {
      setMensaje('Por favor, ingresa todos los campos');
      return;
    }

    const existeNombre = await verificarNombre();

    if (existeNombre) {
      setMensaje('El nombre ya existe. Por favor, elige otro.');
    } else {
      registrarUsuario();
    }
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
            <input 
              type="text" 
              placeholder="Ingresa tus apellidos" 
              value={apellidos} 
              onChange={(e) => setApellidos(e.target.value)} 
              className="name-input" 
            />
            <select value={sexo} onChange={(e) => setSexo(e.target.value)} className="sexo-select">
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
            {mensaje && <p className="mensaje">{mensaje}</p>}
            <button onClick={handleStart} className="start-button">INICIAR</button>
            <button onClick={handleAtras} className="atras-button">Atrás</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoUsuario;
