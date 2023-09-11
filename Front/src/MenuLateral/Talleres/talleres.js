import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './talleres.css';
import pintura from '../../ImagenesDescargadas/tallerPintura.jpg';
import gym from '../../ImagenesDescargadas/gymAdultos.jpg';
import deporte from '../../ImagenesDescargadas/handball.jpg';
import ceramica from '../../ImagenesDescargadas/tallerCeramica.jpg';
import crochet from '../../ImagenesDescargadas/tallerCrochet.jpg';
import escritura from '../../ImagenesDescargadas/tallerEscritura.jpg';
import axios from 'axios';

const Talleres = () => {
  const [textoTaller1, setTextoTaller1] = useState('');
  const [textoTaller2, setTextoTaller2] = useState('');
  const [textoTaller3, setTextoTaller3] = useState('');
  const [textoTaller4, setTextoTaller4] = useState('');
  const [textoTaller5, setTextoTaller5] = useState('');
  const [textoTaller6, setTextoTaller6] = useState('');
  const [textoTelefono, setTextoTelefono] = useState('');

  useEffect(() => {
    const obtenerTextoPorReferencia = async (referencia, setTexto) => {
      try {
        const response = await axios.get(`http://localhost:3000/carga/${referencia}`);
        setTexto(response.data.texto);
      } catch (error) {
        console.error(`Error al obtener el texto con referencia ${referencia}:`, error);
      }
    };

    // Obtener texto por referencia en lugar de por ID
    obtenerTextoPorReferencia('Taller_1', setTextoTaller1);
    obtenerTextoPorReferencia('Taller_2', setTextoTaller2);
    obtenerTextoPorReferencia('Taller_3', setTextoTaller3);
    obtenerTextoPorReferencia('Taller_4', setTextoTaller4);
    obtenerTextoPorReferencia('Taller_5', setTextoTaller5);
    obtenerTextoPorReferencia('Taller_6', setTextoTaller6);
    obtenerTextoPorReferencia('Contacto', setTextoTelefono);
  }, []);

  const titulo = 'Talleres disponibles en nuestras instalaciones';

  return (
    <div>
      <h1 className="text-center mt-5 titulo ">{titulo}</h1>
      <div className="container mt-4 p-5 talleres">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card h-100">
              <img src={pintura} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title text-center">{textoTaller1}</h5>
              </div>
            </div>
          </div>
          <div className="col ">
            <div className="card h-100">
              <img src={gym} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title text-center">{textoTaller2}</h5>
              </div>
            </div>
          </div>
          <div className="col ">
            <div className="card h-100">
              <img src={deporte} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title text-center">{textoTaller3}</h5>
              </div>
            </div>
          </div>
          <div className="col ">
            <div className="card h-100">
              <img src={ceramica} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title text-center">{textoTaller4}</h5>
              </div>
            </div>
          </div>
          <div className="col ">
            <div className="card h-100">
              <img src={crochet} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title text-center">{textoTaller5}</h5>
              </div>
            </div>
          </div>
          <div className="col ">
            <div className="card h-100">
              <img src={escritura} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title text-center">{textoTaller6}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container col-end rectangulo-llamado rounded">
        <p className="llamado-titulo text-center">Inscríbete llamando al: {textoTelefono}</p>
      </div>
    </div>
  );
};

export default Talleres;
