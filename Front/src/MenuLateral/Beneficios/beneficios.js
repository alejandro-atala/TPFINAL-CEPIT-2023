import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './beneficios.css';
import axios from 'axios';
import SideMenu from '../sideMenu';

const Beneficios = () => {
  const [textoBeneficios, setTextoBeneficios] = useState('');

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
    obtenerTextoPorReferencia('Beneficios', setTextoBeneficios);
  }, []);



  const htmlProcesado = { __html: textoBeneficios };

  return (
    <div className="container-beneficios">
    <div className="row">
    <div className="col-md-3 col-sm-6 col-xs-12">
    <SideMenu />
</div>
      <div className="col-md-9 mt-5 d-flex flex-column">   
        <div className="">
          <div className="row">
            <div className="col align-self-center cuadro-beneficios">
              <h2 className="titulo-beneficios">Beneficios</h2>
              <div className='text-center' dangerouslySetInnerHTML={htmlProcesado}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};


export default Beneficios;
