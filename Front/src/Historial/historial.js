import React, {useEffect, useState} from "react";
import axios from 'axios';
import './historial.css';

const Historial = () => {

    const [textoHistorial, setTextoHistorial] = useState('');
    
  useEffect(() => {
    const obtenerTextoPorReferencia = async (referencia, setTextoHistorial) => {
      try {
        const responseTexto = await axios.get(`https://app-2361a359-07df-48b8-acfd-5fb4c0536ce2.cleverapps.io/carga/${referencia}`);
        var textoConSaltosDeLinea = responseTexto.data.texto.replace(/\n/g, "<br>");

        setTextoHistorial(textoConSaltosDeLinea);
      } catch (error) {
        console.error(`Error al obtener datos de ${referencia}:`, error);
      }
    };
    obtenerTextoPorReferencia('Texto_Historial', setTextoHistorial);
  }, []);

  const htmlProcesado = { __html: textoHistorial };
    
  return (
    <div className=" d-flex justify-content-center align-items-center box ">
      <div className="col-md-6 text-center">
        <h1 className="titulo-historial">SOBRE NUESTRA INSTITUCIÓN</h1>
        <p className="texto-historial text-center" dangerouslySetInnerHTML={htmlProcesado}></p>
      </div>
    </div>
  );
  }  
export default Historial;