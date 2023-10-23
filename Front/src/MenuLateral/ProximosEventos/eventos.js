import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './eventos.css';
import axios from 'axios';

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
    <div className="container proximos-eventos mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1>{titulo}</h1>
        </div>
      </div>
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title">Actos</h2>
              <div className="evento" dangerouslySetInnerHTML={htmlProcesadoActos}></div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title">Eventos</h2>
              <div className="evento" dangerouslySetInnerHTML={htmlProcesadoEventos}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProximosEventos;
