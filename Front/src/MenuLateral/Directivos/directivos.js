import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './directivos.css';
import directora from '../../ImagenesDescargadas/A.jpg';
import secretaria from '../../ImagenesDescargadas/AA.jpg';
import representante from '../../ImagenesDescargadas/AAAA.jpg';
import axios from 'axios';

const Directivos = () => {
  const [textoDirectora, setTextoDirectora] = useState('');
  const [textoSecretaria, setTextoSecretaria] = useState('');
  const [textoRepresentante, setTextoRepresentante] = useState('');

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
    obtenerTextoPorReferencia('Directora', setTextoDirectora);
    obtenerTextoPorReferencia('Secretaria', setTextoSecretaria);
    obtenerTextoPorReferencia('Representante', setTextoRepresentante);
  }, []);

  return (
    <div className="container component-directivos mt-4">
      <h1>Nuestro equipo de trabajo</h1>
      <div className="row ">
        <div className="col-md-8 ">
          <div className="directivos ">
             <div className="cuadro-imagen ">
                <img src={directora} alt="foto de la directora" />
             </div>
             <h3>{textoDirectora}</h3>
             <h5>Directora de La Instituion</h5>
             <div className="cuadro-imagen">
                <img src={secretaria} alt="foto de la secretaria" />
             </div>
             <h3>{textoSecretaria}</h3>
             <h5>Secretaria de La Instituion</h5>
             <div className="cuadro-imagen">
                <img src={representante} alt="foto del representatnte" />
            </div>   
             <h3>{textoRepresentante}</h3>
             <h5>Representante Legal de La Instituion</h5>
          </div>
         </div> 
     </div>
    </div>
  );
};

export default Directivos;
