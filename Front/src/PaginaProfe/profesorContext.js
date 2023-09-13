<<<<<<< HEAD
<<<<<<< HEAD
import React, { createContext, useContext, useState } from 'react';

const ProfesorContext = createContext();
=======
=======
>>>>>>> cd1e83b8526b9a3b62b8c85d005b6f36dc14b8b4
// AlumnoContext.js

import React, { createContext, useContext, useState } from 'react';

const profesorContext = createContext();
<<<<<<< HEAD
>>>>>>> cd1e83b (agrego cambio de idUsuario por idProfesor)
=======
>>>>>>> cd1e83b8526b9a3b62b8c85d005b6f36dc14b8b4

export const ProfesorProvider = ({ children }) => {
  const [profesorLogueado, setProfesorLogueado] = useState(null);

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <ProfesorContext.Provider value={{ profesorLogueado, setProfesorLogueado }}>
      {children}
    </ProfesorContext.Provider>
=======
    <profesorContext.Provider value={{ profesorLogueado, setProfesorLogueado }}>
      {children}
    </profesorContext.Provider>
>>>>>>> cd1e83b (agrego cambio de idUsuario por idProfesor)
=======
    <profesorContext.Provider value={{ profesorLogueado, setProfesorLogueado }}>
      {children}
    </profesorContext.Provider>
>>>>>>> cd1e83b8526b9a3b62b8c85d005b6f36dc14b8b4
  );
};

export const useProfesor = () => {
<<<<<<< HEAD
<<<<<<< HEAD
  return useContext(ProfesorContext);
=======
  return useContext(profesorContext);
>>>>>>> cd1e83b (agrego cambio de idUsuario por idProfesor)
=======
  return useContext(profesorContext);
>>>>>>> cd1e83b8526b9a3b62b8c85d005b6f36dc14b8b4
};