import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './beneficios.css';
import axios from 'axios';

const Beneficios = () => {
  const [textoBeneficios, setTextoBeneficios] = useState('');

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
    obtenerTextoPorReferencia('Beneficios', setTextoBeneficios);
  }, []);

  return (
    <div className="container text-center componente-beneficios mt-5 contenido">
      <div className="row">
          <div className="col align-self-center cuadro-beneficios">
            <h2 className="tituloBeneficios">Beneficios</h2>
            <h5 className='subtitulo-beneficios'> ¿Por qué estudiar con Nosotros? </h5>
            <div className='lista-beneficios'>
            <div>{textoBeneficios}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beneficios;
