import React, { createContext, useContext, useState } from 'react';

const profesorContext = createContext();

export const ProfesorProvider = ({ children }) => {
  const [profesorLogueado, setProfesorLogueado] = useState(null);

  return (
    <profesorContext.Provider value={{ profesorLogueado, setProfesorLogueado }}>
      {children}
    </profesorContext.Provider>
  );
};

export const useProfesor = () => {
  return useContext(ProfesorContext);
};