import React, { createContext, useContext, useState } from 'react';

const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  return (
    <UsuarioContext.Provider value={{ usuarioLogueado, setUsuarioLogueado }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => {
  return useContext(UsuarioContext);
};