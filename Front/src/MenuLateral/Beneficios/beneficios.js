import React from 'react';
import './beneficios.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react'
import axios from "axios";

const Beneficios = () => {

 
  const [textoId3, setTextoId3] = useState('');



    useEffect(() => {
    const obtenerTextoPorId = async (id, setTexto) => {
      try {
        const response = await axios.get(`http://localhost:3000/carga/id/${id}`);
        setTexto(response.data.texto);
      } catch (error) {
        console.error(`Error al obtener el texto con ID ${id}:`, error);
      }
    };

   
    obtenerTextoPorId(3, setTextoId3);

  }, []);


  return (
    <div className="container componente-beneficios mt-5 contenido">
        <div className="row">
            <div className="">
            <div className="col align-self-center cuadro-beneficios">
                <h2 className="titulo">Beneficios</h2>
                <div>
                {textoId3}
          
                </div>
            </div>
            </div>
        </div>
    </div>
  );
};

export default Beneficios;
