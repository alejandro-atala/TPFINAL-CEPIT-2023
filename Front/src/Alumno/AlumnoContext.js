// AlumnoContext.js

import React, { createContext, useContext, useState } from 'react';

const AlumnoContext = createContext();

export const AlumnoProvider = ({ children }) => {
  const [alumnoLogueado, setAlumnoLogueado] = useState(null);

  return (
    <AlumnoContext.Provider value={{ alumnoLogueado, setAlumnoLogueado }}>
      {children}
    </AlumnoContext.Provider>
  );
};

export const useAlumno = () => {
  return useContext(AlumnoContext);
};
