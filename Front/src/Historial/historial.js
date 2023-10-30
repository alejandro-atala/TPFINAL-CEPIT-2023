import React, {useEffect, useState} from "react";
import axios from 'axios';

const Historial = () => {

    const [textoHistorial, setTextoHistorial] = useState('');
    
  useEffect(() => {
    const obtenerTextoPorReferencia = async (referencia, setTextoHistorial) => {
      try {
        const responseTexto = await axios.get(`http://localhost:3000/carga/${referencia}`);
        setTextoHistorial(responseTexto.data.texto);
      } catch (error) {
        console.error(`Error al obtener datos de ${referencia}:`, error);
      }
    };
    obtenerTextoPorReferencia('Texto_Historial', setTextoHistorial);
  }, []);
    
  return (
    <div className="mt-5 d-flex justify-content-center align-items-center ">
      <div className="col-md-6 text-center">
        <h1>SOBRE NUESTRA INSTITUCIÓN</h1>
        <p className=" text-center">{textoHistorial}</p>
      </div>
    </div>
  );
  }  
export default Historial;