// src/components/NameContext.js
import React, { createContext, useState } from 'react';

// Crear el contexto
export const NameContext = createContext();

// Proveedor del contexto
export const NameProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [user, setUser] = useState({ id: '', nombres: '', apellidos: '' }); // Estado para el usuario

  return (
    <NameContext.Provider value={{ name, setName, user, setUser }}>
      {children}
    </NameContext.Provider>
  );
};
