<<<<<<< HEAD
import React, { createContext, useContext, useState } from 'react';

const ProfesorContext = createContext();
=======
// AlumnoContext.js

import React, { createContext, useContext, useState } from 'react';

const profesorContext = createContext();
>>>>>>> cd1e83b (agrego cambio de idUsuario por idProfesor)

export const ProfesorProvider = ({ children }) => {
  const [profesorLogueado, setProfesorLogueado] = useState(null);

  return (
<<<<<<< HEAD
    <ProfesorContext.Provider value={{ profesorLogueado, setProfesorLogueado }}>
      {children}
    </ProfesorContext.Provider>
=======
    <profesorContext.Provider value={{ profesorLogueado, setProfesorLogueado }}>
      {children}
    </profesorContext.Provider>
>>>>>>> cd1e83b (agrego cambio de idUsuario por idProfesor)
  );
};

export const useProfesor = () => {
<<<<<<< HEAD
  return useContext(ProfesorContext);
=======
  return useContext(profesorContext);
>>>>>>> cd1e83b (agrego cambio de idUsuario por idProfesor)
};