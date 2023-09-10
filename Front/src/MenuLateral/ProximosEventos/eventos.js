import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './eventos.css';
import axios from 'axios';

const ProximosEventos = () => {
  const [textoId7, setTextoId7] = useState('');
  const [textoId8, setTextoId8] = useState('');

  useEffect(() => {
    const obtenerTextoPorId = async (id, setTexto) => {
      try {
        const response = await axios.get(`http://localhost:3000/carga/id/${id}`);
        setTexto(response.data.texto);
      } catch (error) {
        console.error(`Error al obtener el texto con ID ${id}:`, error);
      }
    };

    obtenerTextoPorId(7, setTextoId7);
    obtenerTextoPorId(8, setTextoId8);
  }, []);

  const titulo = 'Eventos del Instituto';

  return (
    <div className="container proximos-eventos mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1>{titulo}</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title">Actos</h2>
              <div className="evento">
                {textoId7}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title">Eventos</h2>
              <div className="evento">
              <p>  {textoId8}</p>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProximosEventos;
