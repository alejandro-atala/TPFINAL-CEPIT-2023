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
    obtenerTextoPorReferencia(textoHistorial, setTextoHistorial);
  }, []);
    
    return (
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h1>SOBRE NUESTRA INSTITUCIÓN</h1>
                    <p>{textoHistorial}</p>
                </div>
            </div>
        </div>
    );
};   

export default Historial;
