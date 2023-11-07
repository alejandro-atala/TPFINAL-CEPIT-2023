import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../InicioSesion/tokenContext';

const ProtectedRoute = ({ path, element }) => {
  const { token } = useAuth();

  if (token) {
    // El usuario está autenticado, permite el acceso a la ruta
    return <Route path={path} element={element} />;
  } else {
    // El usuario no está autenticado, redirige a la página de inicio de sesión
    return <Navigate to="/iniciarSesion" />;
  }
};

export default ProtectedRoute;
