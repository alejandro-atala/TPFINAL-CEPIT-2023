import React, { createContext, useContext, useState } from 'react';

const ProfesorContext = createContext();

export const ProfesorProvider = ({ children }) => {
  const [profesorLogueado, setProfesorLogueado] = useState(null);

  return (
    <ProfesorContext.Provider value={{ profesorLogueado, setProfesorLogueado }}>
      {children}
    </ProfesorContext.Provider>
  );
};

export const useProfesor = () => {
  return useContext(ProfesorContext);
};