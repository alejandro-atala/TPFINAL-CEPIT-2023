// tokenContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loggedInUser, setLoggedInUser] = useState('');

  const setAuthToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    // Limpiar el token y cualquier otro estado relacionado con la sesión al hacer logout
    setToken(null);
    console.log("logout")
    localStorage.removeItem('token');
    setLoggedInUser('');
  };

  return (
    <AuthContext.Provider value={{ token, setToken: setAuthToken, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
