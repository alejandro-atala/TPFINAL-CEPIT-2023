import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './directivos.css';
import axios from 'axios';

const Directivos = () => {
  const [textoDirectora, setTextoDirectora] = useState('');
  const [textoSecretaria, setTextoSecretaria] = useState('');
  const [textoRepresentante, setTextoRepresentante] = useState('');
  const [imagenDirectora, setImagenDirectora] = useState(null);
  const [imagenSecretaria, setImagenSecretaria] = useState(null);
  const [imagenRepresentante, setImagenRepresentante] = useState(null);

  useEffect(() => {
    const obtenerTextoEImagenPorReferencia = async (referencia, setTexto, setImagen) => {
      try {
        const responseTexto = await axios.get(`http://localhost:3000/carga/${referencia}`);
        setTexto(responseTexto.data.texto);

        const responseImagen = await axios.get(`http://localhost:3000/imagenes/nombre/${referencia}`);

        if (responseImagen.data) {
        
          setImagen(responseImagen.data.url);
        }
      } catch (error) {
        console.error(`Error al obtener datos de ${referencia}:`, error);
      }
    };

    // Obtener texto e imagen por referencia para cada directivo
    obtenerTextoEImagenPorReferencia('directora', setTextoDirectora, setImagenDirectora);
    obtenerTextoEImagenPorReferencia('secretaria', setTextoSecretaria, setImagenSecretaria);
    obtenerTextoEImagenPorReferencia('representante', setTextoRepresentante, setImagenRepresentante);
  }, []);

  return (
    <div className="container component-directivos mt-4">
      <h1>Nuestro equipo de trabajo</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="directivos">
            <div className="cuadro-imagen">
              {imagenDirectora && <img src={imagenDirectora} alt="foto de la directora" />}
            </div>
            <h3>{textoDirectora}</h3>
            <h5>Directora de La Institución</h5>
            <div className="cuadro-imagen">
              {imagenSecretaria && <img src={imagenSecretaria} alt="foto de la secretaria" />}
            </div>
            <h3>{textoSecretaria}</h3>
            <h5>Secretaria de La Institución</h5>
            <div className="cuadro-imagen">
              {imagenRepresentante && <img src={imagenRepresentante} alt="foto del representante" />}
            </div>
            <h3>{textoRepresentante}</h3>
            <h5>Representante Legal de La Institución</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directivos;
