import React from 'react';
import './talleres.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import pintura from '../../ImagenesDescargadas/tallerPintura.jpg';
import escritura from '../../ImagenesDescargadas/tallerEscritura.jpg';
import gym from '../../ImagenesDescargadas/gymAdultos.jpg';
import crochet from '../../ImagenesDescargadas/tallerCrochet.jpg';
import ceramica from '../../ImagenesDescargadas/tallerCeramica.jpg';
import deporte from '../../ImagenesDescargadas/handball.jpg';
import {useState, useEffect} from 'react'
import axios from "axios";

const Talleres = () => {


    const [textoId9, setTextoId9] = useState('');
  const [textoId10, setTextoId10] = useState('');
  const [textoId11, setTextoId11] = useState('');
  const [textoId12, setTextoId12] = useState('');
  const [textoId13, setTextoId13] = useState('');
  const [textoId14, setTextoId14] = useState('');
  const [textoId15, setTextoId15] = useState('');


  useEffect(() => {
    const obtenerTextoPorId = async (id, setTexto) => {
      try {
        const response = await axios.get(`http://localhost:3000/carga/id/${id}`);
        setTexto(response.data.texto);
      } catch (error) {
        console.error(`Error al obtener el texto con ID ${id}:`, error);
      }
    };

    obtenerTextoPorId(9, setTextoId9);
    obtenerTextoPorId(10, setTextoId10);
    obtenerTextoPorId(11, setTextoId11);
    obtenerTextoPorId(12, setTextoId12);
    obtenerTextoPorId(13, setTextoId13);
    obtenerTextoPorId(14, setTextoId14);
    obtenerTextoPorId(15, setTextoId15);
  }, []);


    const titulo = ('Talleres disponibles en nuestras instalaciones');

    return (
        <div>
            <h1 className="text-center mt-5 titulo ">{titulo}</h1>
            <div className="container mt-4 p-5 talleres">

                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <div className="card h-100">
                            <img src={pintura} className="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title text-center">{textoId9}</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col ">
                        <div class="card h-100">
                            <img src={gym} className="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title text-center">{textoId10}</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col ">
                        <div class="card h-100">
                            <img src={deporte} className="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title text-center">{textoId11}</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col ">
                        <div class="card h-100">
                            <img src={ceramica} className="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title text-center">{textoId12}</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col ">
                        <div class="card h-100">
                            <img src={crochet} className="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title text-center">{textoId13}</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col ">
                        <div class="card h-100">
                            <img src={escritura} className="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title text-center">{textoId14}</h5>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="container col-end rectangulo-llamado rounded">
                <p className="llamado-titulo text-center">Inscribete llamando al: {textoId15}</p>
            </div>
        </div>
    );
};

export default Talleres;
