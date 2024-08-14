import React, { useState, useEffect, useRef } from 'react';
import '../style/Diccionario.css';
import axios from 'axios';
import { faFilm, faVideo, faPlayCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Diccionario = () => {
  const [presentaciones, setPresentaciones] = useState([]);
  const [selectedPresentacion, setSelectedPresentacion] = useState(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  


  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const [buttonIcon, setButtonIcon] = useState(faFilm);



  const [finalResults, setFinalResults] = useState(null); 
 

  //nuevo izquierda
  const [abcdario, setabcdario] = useState(null);



  const [nombres, setNombres] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/presentar')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPresentaciones(data);
          // Extraer solo los nombres de las presentaciones
          const nombresTemp = data.map(presentacion => presentacion.nombre);
          setNombres(nombresTemp);

          if (data.length > 0) {
            setSelectedPresentacion(data[0]);
          }
        } else {
          console.error('La respuesta de la API no es un array:', data);
        }
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);




  const handleButtonClick = (index) => {
    setSelectedVideoIndex(index);
  };

  const handleButtonClickcompletar = async (index) => {
    


    const tipo = index === 0 ? 'incompleto1' 
                : index === 1 ? 'incompleto2' 
                : index === 2 ? 'incompletoTotal' 
                : null;
                console.log(tipo);
    if (!tipo) {
      console.error('Tipo no válido para el índice:', index);
      return;
    }
  
    const nombre = selectedPresentacion?.nombre;
  
    if (!nombre) {
      console.error('El nombre de la presentación es undefined o no está definido');
      return;
    }
  
    console.log(`Solicitando datos para nombre: ${nombre}, tipo: ${tipo}`);
  
  };

  
  //izquierda abecedario
  const [abecedarios, setAbecedarios] = useState([]);
  useEffect(() => {
    // Crear un array vacío
    let abecedariosTemp = [];

    // Llenar el array con las letras del alfabeto
    for (let i = 0; i < 26; i++) {
      abecedariosTemp.push(String.fromCharCode(65 + i)); // Letras mayúsculas A-Z
    }
    setAbecedarios(abecedariosTemp);
    console.log(abecedarios)
  }, []);
  
  const [inici, setinici] = useState('P');
  const [mostrarabc,setmostrarabc]=useState('');
  const [separar,setseparar]=useState('');
  const [seleccionadonommbrearray,setseleccionadonommbrearray]= useState([]);
  const mostrardiccioletra = async (index) => {

    setinici(abecedarios[index]);

    console.log(inici)
    console.log(abecedarios);
    const nombre = selectedPresentacion?.nombre;
    console.log(nombres);
    const arraynombres = [];
    for (let a=0;a<nombres.length;a++){
      const espacio = nombres[a].split('');
      if (a===0){
        while (arraynombres.length > 0) {
          arraynombres.pop();
      }
      }
      if (espacio[0]===inici){
        arraynombres.push(nombres[a]);
      }
      else{
        console.log("mal")
      }
      console.log(arraynombres);
      setseparar(nombres[a].split(''));
      console.log(separar);
      console.log(espacio);

      console.log(inici)

    }
    setseleccionadonommbrearray(arraynombres);
   


  };
  useEffect(() => {
    
  }, [selectedPresentacion]);



  useEffect(() => {
    if (selectedPresentacion) {
      handleButtonClickcompletar(0);
    }
  }, [selectedPresentacion]);

  const botonver = () => {
    setIsTitleVisible(!isTitleVisible);
    setButtonIcon(isTitleVisible ? faTimes : faFilm);
  };
// Suponiendo que tienes un estado para almacenar el índice seleccionado
const [selectedPresentacionIndex, setSelectedPresentacionIndex] = useState(-1);
  const handleRandomChange = () => {
    if (presentaciones.length > 0) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * presentaciones.length);
      } while (randomIndex === selectedPresentacionIndex);
  
      setSelectedPresentacion(presentaciones[randomIndex]);
      setSelectedVideoIndex(0);
      setSelectedPresentacionIndex(randomIndex); // Almacena el índice seleccionado
    }
  };

  return (
    <div className='cuerpo_general'>
      <div className='cuerpo_general_interno'>
      {finalResults && (
                    <div className="final-results">
                      <p>{finalResults.finalMessage}</p>
                      <p>Intentos exitosos: {finalResults.successfulAttempts}</p>
                      <p>Intentos fallidos: {finalResults.failedAttempts}</p>
                      <p>Intentos restantes: {finalResults.attempts-1}</p>
                      <button className='botonreini' onClick={resetGame}>Reiniciar juego</button>
                    </div>
                  )}
                  
      <div className='cuerpomediointernogen'>

        {selectedPresentacion ? (
          <div className='padre__'>

            <div className='iconoizqui'>
              <div className='imas'>
                <div className='contenedorteclado'>
                  <button className='botonverm' onClick={() => handleButtonClickcompletar(0)}>
                    <img className='logotecadoi' src="/images/teclado.svg"/>
                  </button>
                </div>
                <div className='contenedorteclado'>
                  <button className='botonverm' onClick={() => handleButtonClickcompletar(1)}>
                    <img className='logotecadoi' src="/images/teclado.svg"/>
                  </button>
                </div>
                <div className='boton_ver'>
                  <button className='botonverm' onClick={() => handleButtonClickcompletar(2)}>
                    <FontAwesomeIcon className='iconowey' icon={buttonIcon} size="3x" />
                  </button>
                </div>
                <div className='boton_ver'>
                  <button className='botonverm' onClick={handleRandomChange}>
                    <img className='logotecadoi' src="/images/teclado.svg"/>
                  </button>
                </div>
              </div>
            </div>

            <div className='contendor_generalcompletar'>
              <div className='contendor_hijo_video'>
                <div className='letrascontainer'>
                  <div className='video_con'>

                   
                  <ul>
                    <li>{}</li>
                      {abecedarios.map((letra, index) => (
                      <button 
                        key={index} 
                        className='botonverm' 
                        onClick={() =>mostrardiccioletra(index)}
                      >
                        <li>{letra}</li>
                        
                          
                        
                       </button>

                      ))}
                  </ul>
                    

                  </div>
                  

                  
                </div>
              </div>
            </div>
            <div className='contendor_generalcompletar'>
              <div className='contendor_hijo_video'>
                <div className='letrascontainer'>
                  <div className='video_con'>
                      
                  <ul>
                    
                      {seleccionadonommbrearray.map((letra, index) => (
                      <button 
                        key={index} 
                        className='botonverm' 
                        onClick={() =>mostrardiccioletra(index)}
                      >
                        <li>{letra}</li>
                        
                          
                        
                       </button>

                      ))}
                  </ul>


                      <p>{presentaciones.map((presentacion, index) => (
                        <option key={index} value={presentacion.nombre}>
                          {presentacion.nombre}
                        </option>
                      ))}</p>
                    
                      

                  </div>
                  

                  
                </div>
              </div>
            </div>
            <div className='contendor_generalvideo'>
                <div className='contendor_hijo_video'>
                  <div className='button-container'>
                  {selectedPresentacion.titulos.map((titulo, index) => (
                    <button
                      key={index}
                      onClick={() => handleButtonClick(index)}
                      className={`video-button ${selectedVideoIndex === index ? 'active' : ''}`}
                    >
                      {index === 0 && (
                        <svg className={`iconovideo ${selectedVideoIndex === index ? 'active-icon' : ''}`} width="13" height="12" viewBox="0 0 13 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_4_20)">
                          <path d="M6.5 6.75C8.51855 6.75 10.1562 5.23828 10.1562 3.375C10.1562 1.51172 8.51855 0 6.5 0C4.48145 0 2.84375 1.51172 2.84375 3.375C2.84375 5.23828 4.48145 6.75 6.5 6.75ZM9.75 7.5H8.35098C7.7873 7.73906 7.16016 7.875 6.5 7.875C5.83984 7.875 5.21523 7.73906 4.64902 7.5H3.25C1.45488 7.5 0 8.84297 0 10.5V10.875C0 11.4961 0.545898 12 1.21875 12H11.7812C12.4541 12 13 11.4961 13 10.875V10.5C13 8.84297 11.5451 7.5 9.75 7.5Z"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_4_20">
                            <rect width="13" height="12" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                      )}
                      {index === 1 && (
                        <svg className={`iconovideo ${selectedVideoIndex === index ? 'active-icon' : ''}`} width="13" height="12" viewBox="0 0 13 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.862 3.00017C11.2112 2.99011 10.6786 3.43032 10.6786 3.95602V6H10.4465V1.87008C10.4465 1.34438 9.9138 0.904176 9.26307 0.914231C8.63248 0.923981 8.12502 1.3399 8.12502 1.85157V6H7.89288V0.95602C7.89288 0.430317 7.36022 -0.00988577 6.7095 0.000168909C6.07891 0.00991891 5.57144 0.425841 5.57144 0.937505V6H5.3393V1.89352C5.3393 1.36782 4.80664 0.927614 4.15592 0.937669C3.52533 0.947419 3.01786 1.36334 3.01786 1.875V7.40607L2.09951 6.38609C1.72248 5.96735 0.996563 5.87475 0.478071 6.1793C-0.0403339 6.48385 -0.154955 7.07016 0.222075 7.48892L3.86675 11.5367C3.99597 11.6802 4.16538 11.797 4.36116 11.8775C4.55693 11.958 4.77351 12 4.9932 12H10.7269C11.3732 12 11.9346 11.6408 12.0827 11.1327L12.8519 8.49221C12.9503 8.15441 13 7.80856 13 7.46154V3.9375C13 3.42584 12.4926 3.00992 11.862 3.00017Z" />
                      </svg>
                      )}
                      {index === 2 && (
                        <svg className={`iconovideo ${selectedVideoIndex === index ? 'active-icon' : ''}`} width="13" height="12" viewBox="0 0 13 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8333 10.2857V10.7143C10.8333 11.4244 10.3483 12 9.75 12H1.08333C0.485017 12 0 11.4244 0 10.7143V3.85714C0 3.14705 0.485017 2.57143 1.08333 2.57143H1.44444V8.14286C1.44444 9.32443 2.25442 10.2857 3.25 10.2857H10.8333ZM13 8.14286V1.28571C13 0.575625 12.515 0 11.9167 0H3.25C2.65168 0 2.16667 0.575625 2.16667 1.28571V8.14286C2.16667 8.85295 2.65168 9.42857 3.25 9.42857H11.9167C12.515 9.42857 13 8.85295 13 8.14286ZM5.77778 2.57143C5.77778 3.28152 5.29276 3.85714 4.69444 3.85714C4.09613 3.85714 3.61111 3.28152 3.61111 2.57143C3.61111 1.86134 4.09613 1.28571 4.69444 1.28571C5.29276 1.28571 5.77778 1.86134 5.77778 2.57143ZM3.61111 6.42857L4.86405 4.94156C4.96981 4.81604 5.1413 4.81604 5.24708 4.94156L6.13889 6L9.19739 2.37013C9.30315 2.24462 9.47463 2.24462 9.58041 2.37013L11.5556 4.71429V7.71429H3.61111V6.42857Z"/>
                      </svg>
                      )}
                    </button>
                  ))}


                  </div>
                  <div className='video-container'>
                  <div className='video_con'>
                    {/*<h3>{selectedPresentacion.titulos[selectedVideoIndex].titulo}</h3>*/}
                    <img 
                      className='custom-video'
                      key={`${selectedPresentacion.nombre}-${selectedVideoIndex}`} 
                      src={`http://localhost:3000/public/${selectedPresentacion.titulos[selectedVideoIndex].video}`} 
                      alt={selectedPresentacion.titulos[selectedVideoIndex].titulo} 
                    />
                  </div>
                  </div>
                </div>
              </div>      


          </div>
        ) : (
          <div className='contenedore__'>
            <div className='loader__p'></div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default Diccionario;