import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './eventos.css';
import axios from 'axios';
import SideMenu from '../sideMenu';

const ProximosEventos = () => {
  const [textoActos, setTextoActos] = useState('');
  const [textoEventos, setTextoEventos] = useState('');

  useEffect(() => {
    const obtenerTextoPorReferencia = async (referencia, setTexto) => {
      try {
        const response = await axios.get(`https://app-2361a359-07df-48b8-acfd-5fb4c0536ce2.cleverapps.io/carga/${referencia}`);
        var textoConSaltosDeLinea = response.data.texto.replace(/\n/g, "<br>");

        setTexto(textoConSaltosDeLinea);
      } catch (error) {
        console.error(`Error al obtener el texto con referencia ${referencia}:`, error);
      }
    };

    // Obtener texto por referencia en lugar de por ID
    obtenerTextoPorReferencia('Actos', setTextoActos);
    obtenerTextoPorReferencia('Eventos', setTextoEventos);
  }, []);

  const procesarDatosActosEventos = (datos) => {
    const lineas = datos.split('\n');
    return lineas.map((dato) => {
      const [fecha, descripcion, ubicacion] = dato.split('<br>');
      return {
        fecha,
        descripcion: `${descripcion}`, // Mantener solo la descripción y ubicación
      };
    });
  };
  
  

  // Llamada a la función para procesar los datos
  const datosProcesados = procesarDatosActosEventos(textoActos);
  const datosProcesados2 = procesarDatosActosEventos(textoEventos);


  const titulo = 'Eventos del Instituto';

  // Crear objetos con el HTML procesado
  const htmlProcesadoActos = { __html: textoActos };
  const htmlProcesadoEventos = { __html: textoEventos };


  const eventosExtraidos = datosProcesados.map((evento) => ({
    fecha: evento.fecha,
    descripcion: evento.descripcion,
    ubicacion: evento.ubicacion,
  }));

  
  const eventosExtraidos2 = datosProcesados2.map((evento) => ({
    fecha2: evento.fecha,
    descripcion2: evento.descripcion,
    ubicacion2: evento.ubicacion,
  }));

  const mesesNombres = {
    '01': 'Enero',
    '02': 'Febrero',
    '03': 'Marzo',
    '04': 'Abril',
    '05': 'Mayo',
    '06': 'Junio',
    '07': 'Julio',
    '08': 'Agosto',
    '09': 'Septiembre',
    '10': 'Octubre',
    '11': 'Noviembre',
    '12': 'Diciembre'
  };
  
  const obtenerDiaYMes = (fecha) => {
    const partesFecha = fecha.split('/'); // Suponiendo que el formato es DD/MM/YY
    const dia = partesFecha[0];
    const mesNumero = partesFecha[1];
    const mesNombre = mesesNombres[mesNumero];
    
    return { dia, mes: mesNombre };
  };



  
        return (
          <div className="row">
            <div className="col-md-3 col-sm-6 col-xs-12">
              <SideMenu />
            </div>
      
            <div className="col-md-6 a-proximos-eventos mt-5 text-center mx-auto">
              {eventosExtraidos.map((evento, index) => {
                const { dia, mes } = obtenerDiaYMes(evento.fecha);
      
                return (
                  <div key={index} className="container">
                    <div className="row row-striped">
                      <div className="col-2 text-right">
                        <h1 className="display-4">
                          <span className="badge badge-secondary ">{dia}</span>
                        </h1>
                        <h2>{mes}</h2>
                      </div>
                      <div className="col-10">
                        <h3 className="text-uppercase"><strong>Actos</strong></h3>
                        <h5>{evento.descripcion}</h5>
                        <p>{evento.ubicacion}</p>
   
                   
                      </div>
                    </div>
                  </div>
                );
              })}


{eventosExtraidos2.map((evento, index) => {
                const { dia, mes } = obtenerDiaYMes(evento.fecha2);
      
                return (
                  <div key={index} className="container">
                    <div className="row row-striped">
                      <div className="col-2 text-right">
                        <h1 className="display-4">
                          <span className="badge badge-secondary">{dia}</span>
                        </h1>
                        <h2>{mes}</h2>
                      </div>
                      <div className="col-10">
                        <h3 className="text-uppercase"><strong>Eventos</strong></h3>
                        <h5>{evento.descripcion2}</h5>
                        <p>{evento.ubicacion2}</p>
   
        
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      };
      
      export default ProximosEventos;