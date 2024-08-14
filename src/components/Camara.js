import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Diccionario = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [processing, setProcessing] = useState(false);
  const [cameraActive, setCameraActive] = useState(false); // Estado para controlar la activación de la cámara

  // Función para activar la cámara al presionar el botón
  const activateCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setCameraActive(true); // Marcar la cámara como activa
    } catch (err) {
      console.error('Error accessing webcam:', err);
    }
  };

  const processFrame = async () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL('image/jpeg');
      const blob = await (await fetch(imageData)).blob();
      const formData = new FormData();
      formData.append('image', blob, 'frame.jpg');

      try {
        setProcessing(true);
        const response = await axios.post('http://localhost:5000/detect', formData, {
          responseType: 'blob',
        });

        const resultImage = await response.data;

        const resultURL = URL.createObjectURL(resultImage);
        const img = new Image();
        img.onload = () => {
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          URL.revokeObjectURL(resultURL);
        };
        img.src = resultURL;
      } catch (err) {
        console.error('Error processing frame:', err);
      } finally {
        setProcessing(false);
      }
    }
  };

  useEffect(() => {
    if (cameraActive) {
      const interval = setInterval(() => {
        if (!processing) {
          processFrame();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [processing, cameraActive]);

  return (
    <div>
      <h2>Diccionario</h2>
      <p>Bienvenido a diccionario</p>
      {!cameraActive && ( // Mostrar el botón solo si la cámara no está activa
        <button onClick={activateCamera}>Activar Cámara</button>
      )}
      <video ref={videoRef} style={{ display: cameraActive ? 'block' : 'none' }}></video>
      <canvas ref={canvasRef} width="640" height="480" style={{ display: cameraActive ? 'block' : 'none' }}></canvas>
    </div>
  );
};

export default Diccionario;
