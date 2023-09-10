import React from 'react';
import './directivos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import directora from '../../ImagenesDescargadas/A.jpg';
import secretaria from '../../ImagenesDescargadas/AA.jpg';
import representante from '../../ImagenesDescargadas/AAAA.jpg';
import {useState, useEffect} from 'react'
import axios from "axios";


const Directivos = () => {

  const [textoId4, setTextoId4] = useState('');
  const [textoId5, setTextoId5] = useState('')
  const [textoId6, setTextoId6] = useState('')


  useEffect(() => {
  const obtenerTextoPorId = async (id, setTexto) => {
    try {
      const response = await axios.get(`http://localhost:3000/carga/id/${id}`);
      setTexto(response.data.texto);
    } catch (error) {
      console.error(`Error al obtener el texto con ID ${id}:`, error);
    }
  };

 
  obtenerTextoPorId(4, setTextoId4);
  obtenerTextoPorId(5, setTextoId5);
  obtenerTextoPorId(6, setTextoId6);
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
             <h3>{textoId4}</h3>
             <h5>Directora de La Instituion</h5>
             <div className="cuadro-imagen">
                <img src={secretaria} alt="foto de la secretaria" />
             </div>
             <h3>{textoId5}</h3>
             <h5>Secretaria de La Instituion</h5>
             <div className="cuadro-imagen">
                <img src={representante} alt="foto del representatnte" />
            </div>   
             <h3>{textoId6}</h3>
             <h5>Representante Legal de La Instituion</h5>
          </div>
         </div> 
     </div>
    </div>
  );
};

export default Directivos;
