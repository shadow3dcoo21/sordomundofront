// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Presentacion from './components/Presentacion';
import NuevoUsuario from './components/NuevoUsuario';
import Completar from './components/Completar';
import Navbar from './components/Navbar';
import Textos from './components/textos';
import Diccionario from './components/diccionario';
import Subir from './components/subir';
import Examen from './components/examen';
import { NameProvider } from './components/NameContext';

const App = () => {
  return (
    <NameProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/presentar" element={<Presentacion />} />
            <Route path="/nuevo-usuario" element={<NuevoUsuario />} />
            <Route path="/completar" element={<Completar />} />
            <Route path="/textos" element={<Textos />} />
            <Route path="/diccionario" element={<Diccionario />} />
            <Route path="/subir" element={<Subir />} />
            <Route path="/Examen" element={<Examen />} />
          </Routes>
        </div>
      </Router>
    </NameProvider>
  );
};

export default App;

