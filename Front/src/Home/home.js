import React from "react";
import escuela1 from '../ImagenesDescargadas/ESCUELA2.jpg';
import escuela2 from '../ImagenesDescargadas/ESCUELA.jpg';
import escuela3 from '../ImagenesDescargadas/ESCUELA3.jpg';
import './home.css';
import axios from "axios";
import {useState, useEffect} from 'react'

const HomePage = () => {


  const [textoId1, setTextoId1] = useState('');
  const [textoId2, setTextoId2] = useState('');

  useEffect(() => {
 
    // Realiza una solicitud GET al servidor para obtener el texto con el ID 1
    axios
      .get('http://localhost:3000/carga/id/1')
      .then((response) => {
        setTextoId1(response.data.texto);
      })
      .catch((error) => {
        console.error('Error al obtener el texto con ID 1:', error);
      });

    // Obtener el texto con ID 2
    axios
      .get('http://localhost:3000/carga/id/2')
      .then((response) => {
        setTextoId2(response.data.texto);
      })
      .catch((error) => {
        console.error('Error al obtener el texto con ID 2:', error);
      });
  }, []);



  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
    <h1>{textoId1}</h1>
    <div className="container plan-de-estudios mt-5">
      <div className="row">
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={escuela1} className="img-fluid d-block w-100" alt="foto de escuela" />
                <div className="carousel-caption d-none d-md-block text-black">
                </div>
              </div>
              <div className="carousel-item">
                <img src={escuela2} className="img-fluid d-block w-100" alt="foto de escuela" />
                <div className="carousel-caption d-none d-md-block">  
                </div>
              </div>
              <div className="carousel-item">
                <img src={escuela3} className="img-fluid d-block w-100" alt="foto de escuela" />
                <div className="carousel-caption d-none d-md-block">
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <h2>Estudia en nuestro Instituto</h2>
          <p>{textoId2}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

