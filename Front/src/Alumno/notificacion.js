import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAlumno } from './AlumnoContext';
import { useNotificaciones } from './NotificacionesContext';

const AvisosNotificationBadge = () => {
  const { avisosVistos, markAvisoComoLeido, alumnoLogueado } = useAlumno();
  const { unreadAvisosCount, setUnreadAvisosCount, notificaciones } = useNotificaciones();

  useEffect(() => {
    console.log("Avisos Recibidos:", notificaciones);
    fetchUnreadAvisosCount();
  }, [notificaciones]);

  const fetchUnreadAvisosCount = async () => {
    try {
      const avisosSinLeer = avisosVistos.filter((aviso) => !aviso.leido);
      setUnreadAvisosCount(avisosSinLeer.length);
      console.log("avisosSinLeer:", avisosSinLeer);
    } catch (error) {
      console.error('Error al obtener mensajes no leídos:', error);
    }
  };

  const markAvisosComoLeidos = async () => {
    try {
      if (!alumnoLogueado || !alumnoLogueado.idAlumno) {
        console.error('ID de alumno no válido.');
        return;
      }

      const avisosSinLeer = avisosVistos.filter((aviso) => !aviso.leido);
      const promises = avisosSinLeer.map(async (aviso) => {
        const idAviso = aviso.idAviso;
        const idAlumno = alumnoLogueado.idAlumno;

        try {
          const response = await axios.get(`https://app-2361a359-07df-48b8-acfd-5fb4c0536ce2.cleverapps.io/alumno-aviso/existe/${idAviso}/${idAlumno}`);
          const existeAviso = response.data;

          if (!existeAviso) {
            const responseMarcarLeido = await axios.put(`https://app-2361a359-07df-48b8-acfd-5fb4c0536ce2.cleverapps.io/alumno-aviso/marcar-leidos/${idAviso}/${alumnoLogueado.idAlumno}`);
            if (responseMarcarLeido.status === 200) {
              console.log(`Aviso ${idAviso} marcado como leído con éxito`);
              markAvisoComoLeido(idAviso);
            } else {
              console.error('Error al marcar aviso como leído:', responseMarcarLeido.statusText);
            }
          }
        } catch (error) {
          console.error('Error al verificar la existencia de aviso o marcarlo como leído:', error);
        }
      });

      await Promise.all(promises);

      setUnreadAvisosCount(0);
    } catch (error) {
      console.error('Error al marcar avisos como leídos:', error);
    }
  };

  return (
    <Link to="/avisos" className={`campanita-usuario ${unreadAvisosCount > 0 ? 'unread' : ''}`} onClick={markAvisosComoLeidos}>
      <i className="fa fa-bell" aria-hidden="true"></i>
      {unreadAvisosCount > 0 && (
        <span className="contador-avisos">{unreadAvisosCount}</span>
      )}
    </Link>
  );
};

export default AvisosNotificationBadge;
