import React, { useState, useEffect } from "react";
import './home.css';
import axios from "axios";
import SideMenu from "../MenuLateral/sideMenu";

const HomePage = () => {
  const [textoId1, setTextoId1] = useState('');
  const [textoId2, setTextoId2] = useState('');
  const [homeImages, setHomeImages] = useState([]); // Almacenar todas las imágenes

  useEffect(() => {
    const obtenerTextoPorId = async (id, setTexto) => {
      try {
        const response = await axios.get(`http://localhost:3000/carga/id/${id}`);
        var textoConSaltosDeLinea = response.data.texto.replace(/\n/g, "<br>");

        setTexto(textoConSaltosDeLinea);
       
      } catch (error) {
        console.error(`Error al obtener el texto con ID ${id}:`, error);
      }
    };

    const obtenerImagenesPorNombres = async (nombres) => {
      try {
        const imagePromises = nombres.map(async (nombre) => {
          const response = await axios.get(`http://localhost:3000/imagenes/nombre/${nombre}`);
  
          return response.data.url;
        });

        const images = await Promise.all(imagePromises);
        setHomeImages(images.filter((image) => image !== null));

      } catch (error) {
        console.error(`Error al obtener las imágenes:`, error);
      }
    };



    // Obtener textos para ID 1 y ID 2
    obtenerTextoPorId(1, setTextoId1);
    obtenerTextoPorId(2, setTextoId2);

    // Obtener imágenes por nombre
    obtenerImagenesPorNombres(['home1', 'home2', 'home3']);
  }, []);

  const htmlProcesado = { __html: textoId2 };

  return (
    <div className="container-home">
      <div className="row">
        <div className="col-md-3">
          <SideMenu />
        </div>
        <div className="col-md-9 mt-5 flex-column">
          <h1 className="text-left d-flex flex-column align-items-left titulo-home">{textoId1}</h1>
          <div className="row align-items-start">
            <div className="col-md-6 carousel">
              <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {homeImages.map((image, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                      <img src={image} className="img-fluid d-block w-100" alt={`foto ${index + 1}`} />
                      <div className="carousel-caption d-none d-md-block text-black">
                      </div>
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                  <span className="carousel-control-next-icon" ariahidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className="col-md-6 text-right">
              <h2 className="texto-titulo-home">Estudia en Nuestro Instituto</h2>
              <p className="texto-home text-center" dangerouslySetInnerHTML={htmlProcesado}></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default HomePage;
