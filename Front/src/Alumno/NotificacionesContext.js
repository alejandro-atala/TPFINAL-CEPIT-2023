// NotificacionesContext.js
import React, { createContext, useState, useContext } from 'react';

export const NotificacionesContext = createContext();

export const NotificacionesProvider = ({ children }) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [unreadAvisosCount, setUnreadAvisosCount] = useState(0);

  // Función para marcar los avisos como leídos
  const markAvisosComoLeidos = (notificacionId) => {
    console.log("notificacionId:", notificacionId);
    // Actualiza la lista de notificaciones marcando la que corresponde como leída
    const notificacionesActualizadas = notificaciones.map((notificacion) => {
      if (notificacion.id === notificacionId) {
        return { ...notificacion, leida: true };
      }
      return notificacion;
    });

    // Actualiza el contador de avisos no leídos
    const unreadCount = notificacionesActualizadas.filter((aviso) => !aviso.leida).length;
    setUnreadAvisosCount(unreadCount);

    // Actualiza la lista de notificaciones
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
