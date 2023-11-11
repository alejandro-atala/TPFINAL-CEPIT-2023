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
        const response = await axios.get(`http://localhost:3000/carga/${referencia}`);
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

  const titulo = 'Eventos del Instituto';

  // Crear objetos con el HTML procesado
  const htmlProcesadoActos = { __html: textoActos };
  const htmlProcesadoEventos = { __html: textoEventos };

  return (
   <div>
     <div className="row">
     <div className="col-md-3 col-sm-6 col-xs-12">
    <SideMenu />
</div>
    <div className="col-md-6 flex-column proximos-eventos mt-5 text-center">
      <div className="row justify-content-center w-100">
        <div className="text-center">
          <h1 className='titulo-evento'>{titulo}</h1>
        </div>
      </div>
      <div className="row justify-content-center w-100">
        <div className="col-md-9 col-lg-4 mb-4 eventos">
          <div className="card shadow">
            <div className="card-body-eventos">
              <h2 className="card-title-eventos">ACTOS</h2>
              <div className="evento" dangerouslySetInnerHTML={htmlProcesadoActos}></div>
            </div>
          </div>
        </div>
        <div className="col-md-9 col-lg-4 mb-4 eventos">
          <div className="card shadow">
            <div className="card-body-eventos">
              <h2 className="card-title-eventos">EVENTOS</h2>
              <div className="evento" dangerouslySetInnerHTML={htmlProcesadoEventos}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div> 
  );
};

export default ProximosEventos;
