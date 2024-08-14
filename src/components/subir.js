// src/PresentarForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PresentarForm = () => {
  const [imagen, setImagen] = useState(null);
  const [nombre, setNombre] = useState('');
  const [titulos, setTitulos] = useState(['', '', '']);
  const [videos, setVideos] = useState([null, null, null]);

  const handleTituloChange = (index, value) => {
    const newTitulos = [...titulos];
    newTitulos[index] = value;
    setTitulos(newTitulos);
  };

  const handleVideoChange = (index, file) => {
    const newVideos = [...videos];
    newVideos[index] = file;
    setVideos(newVideos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imagen', imagen);
    formData.append('nombre', nombre);
    titulos.forEach((titulo, index) => {
      formData.append('titulos', titulo);
      formData.append('video', videos[index]);
    });

    try {
      const response = await axios.post('http://localhost:3000/presentar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Datos guardados:', response.data);
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Imagen:</label>
        <input type="file" onChange={(e) => setImagen(e.target.files[0])} />
      </div>
      <div>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>
      {titulos.map((titulo, index) => (
        <div key={index}>
          <label>Título {index + 1}:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => handleTituloChange(index, e.target.value)}
          />
          <label>Video {index + 1}:</label>
          <input
            type="file"
            onChange={(e) => handleVideoChange(index, e.target.files[0])}
          />
        </div>
      ))}
      <button type="submit">Enviar</button>
    </form>
  );
};

export default PresentarForm;
