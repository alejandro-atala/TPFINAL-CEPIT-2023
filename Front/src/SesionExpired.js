import React, { useState, useEffect } from 'react';
import { useAuth } from './InicioSesion/tokenContext';
import { Alert } from 'react-bootstrap';
import { useAlumno } from './Alumno/AlumnoContext';


const SessionExpiration = () => {
  const [sessionExpired, setSessionExpired] = useState(false);
  const { token, handleLogout } = useAuth();
  const { setAlumnoLogueado } = useAlumno();

  useEffect(() => {
    const checkSessionExpiration = () => {
      if (token) {
        const tokenData = parseToken(token);
        if (tokenData && tokenData.exp) {
          if (tokenData.exp * 1000 < Date.now()) {
            setSessionExpired(true);
            localStorage.removeItem('token');
            handleLogout();

            // Limpia el nombre del alumno
            setAlumnoLogueado(null);

            setTimeout(() => {
              window.location.href = '/iniciarSesion';
            }, 3000);
           
          }
        }
      }
    };

    // Configurar el intervalo una vez al cargar el componente
    const intervalId = setInterval(() => {
      checkSessionExpiration();
    }, 1000);

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, [token]);

  const parseToken = (token) => {
    if (!token) {
      return null;
    }

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return null;
    }

    const payloadBase64 = tokenParts[1];
    try {
      const payloadJson = JSON.parse(atob(payloadBase64));
      return payloadJson;
    } catch (error) {
      return null;
    }
  };

  return (
    <div>
      {sessionExpired && (
        <Alert className="alert-danger">
          Tu sesión ha expirado. Por favor, inicia sesión nuevamente. Redirigiendo...
        </Alert>
      )}
    </div>
  );
};

export default SessionExpiration;
