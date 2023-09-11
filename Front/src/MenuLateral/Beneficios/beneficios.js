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
    <div className="container componente-beneficios mt-5 contenido">
      <div className="row">
        <div className="">
          <div className="col align-self-center cuadro-beneficios">
            <h2 className="titulo">Beneficios</h2>
            <div>{textoBeneficios}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beneficios;
