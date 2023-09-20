import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AvisosNotificationBadge = () => {
  const [unreadAvisosCount, setUnreadAvisosCount] = useState(0);

  const fetchUnreadAvisosCount = async () => {
    try {
      const response = await fetch('http://localhost:3000/avisos/no-leidos');
      if (response.status === 200) {
        const data = await response.json();
        setUnreadAvisosCount(data.unreadCount);
        console.log('Avisos no leídos obtenidos:', data.unreadCount);
      } else {
        console.error('Error al obtener mensajes no leídos. Respuesta del servidor:', response);
      }
    } catch (error) {
      console.error('Error al obtener mensajes no leídos:', error);
    }
  };

  const markAvisosComoLeidos = async () => {
    try {
      const response = await axios.put('http://localhost:3000/avisos/marcar-leidos', {});
      if (response.status === 200) {
        // Marcar los mensajes como leídos en el servidor tuvo éxito
        console.log('Avisos marcados como leídos con éxito');
        // Actualizar el estado local
        setUnreadAvisosCount(0);
      } else {
        console.error('Error al marcar avisos como leídos:', response.statusText);
      }
    } catch (error) {
      console.error('Error al marcar avisos como leídos:', error);
    }
  };

  useEffect(() => {
    fetchUnreadAvisosCount();

    const intervalId = setInterval(() => {
      fetchUnreadAvisosCount();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Link to="/avisos" className={`campanita-usuario ${unreadAvisosCount > 0 ? 'unread' : ''}`} onClick={markAvisosComoLeidos}>
      <i className="fa fa-bell" aria-hidden="true">
        {unreadAvisosCount > 0 && (
          <span className="contador-avisos">{unreadAvisosCount}</span>
        )}
      </i>
    </Link>
  );
};

export default AvisosNotificationBadge;
