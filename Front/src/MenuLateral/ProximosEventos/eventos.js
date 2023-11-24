import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './eventos.css';
import axios from 'axios';
import SideMenu from '../sideMenu';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es'; // Importar el locale de español para moment.js

// Configurar moment.js para usar el locale en español
moment.locale('es');

const messages = {
  allDay: 'Dia Inteiro',
  previous: '< Mes anterior',
  next: 'Proximo mes >',
  today: 'Hoy',
}

const ProximosEventos = () => {
  const [textoActos, setTextoActos] = useState('');
  const [textoEventos, setTextoEventos] = useState('');
  const [eventos, setEventos] = useState([]);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const obtenerTextoPorReferencia = async (referencia, setTexto) => {
      try {
        const response = await axios.get(`http://localhost:3000/carga/${referencia}`);
        var textoConSaltosDeLinea = response.data.texto.replace(/\n/g, "<br>");

        setTexto(textoConSaltosDeLinea);
      } catch (error) {
        console.error(`Error al obtener el texto con referencia ${referencia}:`, error);
      }
    };

    obtenerTextoPorReferencia('Actos', setTextoActos);
    obtenerTextoPorReferencia('Eventos', setTextoEventos);
  }, []);

  useEffect(() => {
    const procesarDatosActosEventos = (datos) => {
      const lineas = datos.split('\n');
      const eventosProcesados = lineas.map((dato) => {
        const [fechaStr, descripcion] = dato.split('<br>').slice(0, 2);
        const [dia, mes, ano] = fechaStr.split('/').map((parte) => parseInt(parte, 10)); // No sumar 2000

        // Asegurémonos de convertir el año correctamente
        const year = ano < 100 ? ano + 2000 : ano;

        const fecha = new Date(year, mes - 1, dia); // Restar 1 al mes para obtener el valor correcto
        return {
          start: fecha,
          end: fecha,
          title: descripcion,
        };
      });
      return eventosProcesados;
    };

    const eventosActos = procesarDatosActosEventos(textoActos);
    const eventosEventos = procesarDatosActosEventos(textoEventos);
    setEventos([...eventosActos, ...eventosEventos]);
  }, [textoActos, textoEventos]);

  const localizer = momentLocalizer(moment);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleModalClose = () => {
    setShowEventDetails(false);
    setSelectedEvent(null);
  };

  return (
    <div className="row">
      <div className="col-md-3 col-sm-6 col-xs-12">
        <SideMenu />
      </div>
      <div className="col-md-6 a-proximos-eventos mt-5 text-center mx-auto">
        <Calendar
     
              messages={messages}
          localizer={localizer}
          events={eventos}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          style={{ height: 500, position: 'relative', opacity: showEventDetails ? 0.4 : 1 }}
          views={['month']}
          onSelectEvent={handleEventClick}
          formats={{
            dateFormat: 'D',
            dayFormat: (date, culture, localizer) =>
              localizer.format(date, 'dddd', culture), // Nombre del día
            dayHeaderFormat: (date, culture, localizer) =>
              localizer.format(date, 'dddd', culture).substring(0, 3), // Nombre corto del día
            monthHeaderFormat: 'MMMM yyyy', // Nombre del mes y año
          }}
        />

        {showEventDetails && selectedEvent && (
          <div className="event-details" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 999 }}>
            <div className="card">
              <div className="card-body bg-secondary">
                <h5 className="card-title">{selectedEvent.title}</h5>
                <p className="card-text">
                  <strong>Fecha:</strong> {moment(selectedEvent.start).format('LL')}
                </p>
                {/* Agregar más detalles del evento aquí */}
                <button onClick={handleModalClose} className="btn btn-primary">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProximosEventos;
