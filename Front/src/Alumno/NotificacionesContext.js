import React, { createContext, useState, useContext } from 'react';

export const NotificacionesContext = createContext();

export const NotificacionesProvider = ({ children }) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [unreadAvisosCount, setUnreadAvisosCount] = useState(0);

  const markAvisosComoLeidos = (notificacionId) => {
    const notificacionesActualizadas = notificaciones.map((notificacion) => {
      if (notificacion.id === notificacionId) {
        return { ...notificacion, leida: true };
      }
      return notificacion;
    });

    const unreadCount = notificacionesActualizadas.filter((aviso) => !aviso.leida).length;
    setUnreadAvisosCount(unreadCount);
    setNotificaciones(notificacionesActualizadas);
  };

  return (
    <NotificacionesContext.Provider
      value={{
        notificaciones,
        setNotificaciones,
        unreadAvisosCount,
        setUnreadAvisosCount,
        markAvisosComoLeidos,
      }}
    >
      {children}
    </NotificacionesContext.Provider>
  );
};

export const useNotificaciones = () => {
  return useContext(NotificacionesContext);
};
