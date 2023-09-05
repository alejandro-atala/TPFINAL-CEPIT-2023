import React, { useState, useEffect } from 'react';
import { useAuth } from './InicioSesion/tokenContext';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SessionExpiration = () => {
  const [sessionExpired, setSessionExpired] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSessionExpiration = () => {
      if (token) {
        const tokenData = parseToken(token);
        if (tokenData && tokenData.exp) {
          if (tokenData.exp * 1000 < Date.now()) {
            setSessionExpired(true);
            localStorage.removeItem('token');
            setTimeout(() => {
                navigate('/iniciarSesion');
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
  }, [token]); // Agrega [token] como dependencia para que el efecto se ejecute cuando el token cambie

  const parseToken = (token) => {
    if (!token) {
      return null;
    }
  
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return null; // El token no tiene el formato correcto
    }
  
    const payloadBase64 = tokenParts[1];
    try {
      const payloadJson = JSON.parse(atob(payloadBase64));
      return payloadJson;
    } catch (error) {
      return null; // Error al decodificar el payload JSON
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
