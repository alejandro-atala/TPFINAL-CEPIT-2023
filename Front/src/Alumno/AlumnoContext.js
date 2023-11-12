import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const AlumnoContext = createContext();

export const AlumnoProvider = ({ children }) => {
  const [alumnoLogueado, setAlumnoLogueado] = useState(null);
  const [avisosVistos, setAvisosVistos] = useState([]);

  const markAvisoComoLeido = useCallback(async (idAviso) => {
    try {
      // Hacer una solicitud PUT al servidor para marcar el aviso como leído
      await axios.put(`https://app-9d7fdcc2-2916-41fd-93f1-ef602d6afbcc.cleverapps.io/alumno-aviso/marcar-leidos/${idAviso}/${alumnoLogueado.idAlumno}`);
      
      // Después de que el aviso se marque como leído en el servidor, actualiza el estado local
      setAvisosVistos([...avisosVistos, idAviso]);
    } catch (error) {
      console.error('Error al marcar el aviso como leído:', error);
    }
  }, [avisosVistos]);

  return (
    <AlumnoContext.Provider value={{ alumnoLogueado, setAlumnoLogueado, avisosVistos, markAvisoComoLeido }}>
      {children}
    </AlumnoContext.Provider>
  );
};

export const useAlumno = () => {
  return useContext(AlumnoContext);
};
