import '../style/Examen.css';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Examen = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [processing, setProcessing] = useState(false);
    const [cameraActive, setCameraActive] = useState(false); // Estado para controlar la activación de la cámara
    const [showMessage, setShowMessage] = useState(false); // Estado para mostrar el mensaje de alerta

    // Función para activar la cámara al presionar el botón
    const activateCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraActive(true); // Marcar la cámara como activa
        setShowMessage(true); // Mostrar el mensaje de alerta
      } catch (err) {
        console.error('Error accessing webcam:', err);
      }
    };

    // Función para detener la cámara y ocultar el mensaje
    const closeMessage = () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
      setShowMessage(false);
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
      <div className='Padre_general'>
        <div className='Padre_general_interno'>
          <div className='Padre_general_interno_ultimo'>
            <div className='otro_p'>
              <div className='Texto_General'>
                <p className='letra__'>¡Hola chicos y chicas!</p>
                <p className='letra__'>¡Vamos a tener un divertido examen! Aparecerá una palabra en la pantalla y tendrán que traer el objeto o mostrar la imagen de la cartilla que coincida.</p>
                <p className='letra__'>¡Prepárense para un día lleno de aprendizaje y diversión! 🚀</p>
              </div>
              <div className='Boton_General'>
                <div className='boton_'>
                  {!cameraActive && (
                    <button className='botonsi' onClick={activateCamera}>Activar Cámara</button>
                  )}
                  
                </div>
                  
                
              </div>
            </div>
          </div>
        </div>
            <div className='ga' style={{ display: cameraActive ? 'block' : 'none' }}>
                    <div className='videopex'>
                        <div className='messageBox'>
                        <button className='closeButton' onClick={closeMessage}>X</button>
                        <p>¡El examen ha comenzado!</p>
                        </div>
                        <div>
                        <video ref={videoRef}></video>
                        <canvas ref={canvasRef} width="640" height="480" style={{ position: 'absolute', top: 0, left: 0, opacity: 0 }}></canvas>
                        </div>
                    </div>
            </div>
        {showMessage && (
          <div>
            
        
          </div>
        )}
      </div>
    );
}

export default Examen;
