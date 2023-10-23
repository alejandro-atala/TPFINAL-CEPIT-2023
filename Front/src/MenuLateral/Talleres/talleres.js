import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './talleres.css';
import axios from 'axios';

const Talleres = () => {
  const [textoTaller1, setTextoTaller1] = useState('');
  const [textoTaller2, setTextoTaller2] = useState('');
  const [textoTaller3, setTextoTaller3] = useState('');
  const [textoTaller4, setTextoTaller4] = useState('');
  const [textoTaller5, setTextoTaller5] = useState('');
  const [textoTaller6, setTextoTaller6] = useState('');
  const [textoTelefono, setTextoTelefono] = useState('');
  const [imagenTaller1, setImagenTaller1] = useState(null);
  const [imagenTaller2, setImagenTaller2] = useState(null);
  const [imagenTaller3, setImagenTaller3] = useState(null);
  const [imagenTaller4, setImagenTaller4] = useState(null);
  const [imagenTaller5, setImagenTaller5] = useState(null);
  const [imagenTaller6, setImagenTaller6] = useState(null);

  useEffect(() => {
    const obtenerTextoEImagenPorReferencia = async (referencia, setTexto, setImagen) => {
      try {
        const responseTexto = await axios.get(`http://localhost:3000/carga/${referencia}`);
        console.log(responseTexto.data.texto)
        setTexto(responseTexto.data.texto);

        const responseImagen = await axios.get(`http://localhost:3000/imagenes/nombre/${referencia}`);
        if (responseImagen.data) {
          setImagen(responseImagen.data.url);
        }
      } catch (error) {
        console.error(`Error al obtener datos de ${referencia}:`, error);
      }
    };

    // Obtener texto e imagen por referencia para cada taller
    obtenerTextoEImagenPorReferencia('taller_1', setTextoTaller1, setImagenTaller1);
    obtenerTextoEImagenPorReferencia('taller_2', setTextoTaller2, setImagenTaller2);
    obtenerTextoEImagenPorReferencia('taller_3', setTextoTaller3, setImagenTaller3);
    obtenerTextoEImagenPorReferencia('taller_4', setTextoTaller4, setImagenTaller4);
    obtenerTextoEImagenPorReferencia('taller_5', setTextoTaller5, setImagenTaller5);
    obtenerTextoEImagenPorReferencia('taller_6', setTextoTaller6, setImagenTaller6);
    obtenerTextoEImagenPorReferencia('Contacto_Talleres', setTextoTelefono);
  }, []);

  const titulo = 'Talleres disponibles en nuestras instalaciones';

  return (
    <div>
      <h1 className="text-center mt-5 titulo ">{titulo}</h1>
      <div className="container mt-4 p-5 talleres">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card h-100">
              {imagenTaller1 && <img src={imagenTaller1} className="card-img-top" alt="..." />}
              <div className="card-body">
                <h5 className="card-title text-center">{textoTaller1}</h5>
              </div>
            </div>
          </div>
          <div className="col ">
            <div className="card h-100">
              {imagenTaller2 && <img src={imagenTaller2} className="card-img-top" alt="..." />}
              <div className="card-body">
                <h5 className="card-title text-center">{textoTaller2}</h5>
              </div>
            </div>
          </div>
          <div className="col ">
            <div className="card h-100">
              {imagenTaller3 && <img src={imagenTaller3} className="card-img-top" alt="..." />}
              <div className="card-body">
                <h5 className="card-title text-center">{textoTaller3}</h5>
              </div>
            </div>
          </div>
          <div className="col ">
            <div className="card h-100">
              {imagenTaller4 && <img src={imagenTaller4} className="card-img-top" alt="..." />}
              <div className="card-body">
                <h5 className="card-title text-center">{textoTaller4}</h5>
              </div>
            </div>
          </div>
          <div className="col ">
            <div className="card h-100">
              {imagenTaller5 && <img src={imagenTaller5} className="card-img-top" alt="..." />}
              <div className="card-body">
                <h5 className="card-title text-center">{textoTaller5}</h5>
              </div>
            </div>
          </div>
          <div className="col ">
            <div className="card h-100">
              {imagenTaller6 && <img src={imagenTaller6} className="card-img-top" alt="..." />}
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
