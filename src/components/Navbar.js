// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/Navbar.css';
const Navbar = () => {
  const location = useLocation();

  // No mostrar el navbar en la página de inicio
  if (location.pathname === '/') {
    return null;
  }
  if (location.pathname === '/nuevo-usuario') {
    return null;
  }

  
  return (
    <nav>
      <ul className="navbar">
        
        <li className="dropdown dropdown2">
          <span>Palabras</span>
          <ul className="dropdown-menu">
            <li className="dropdownn">
              <Link to="/presentar">Presentar</Link>
            </li>
            <li className="dropdownn">
              <Link to="/completar">Completar</Link>
            </li>
          </ul>
        </li>
        
        <li className="dropdown">
          <Link to="/textos">Textos</Link>
        </li>
        <li className="dropdown">
          <Link to="/diccionario">Diccionario</Link>
        </li>
        <li className="dropdown">
          <Link to="/Examen">Examen</Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
