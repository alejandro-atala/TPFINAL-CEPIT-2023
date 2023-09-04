import React, { createContext, useContext, useState } from 'react';

// Crea el contexto
const AuthContext = createContext();

// Crea un proveedor para envolver tu aplicación
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Exporta un gancho personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);
