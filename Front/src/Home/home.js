import React, { useState, useEffect } from "react";
import './home.css';
import axios from "axios";

const HomePage = () => {
  const [textoId1, setTextoId1] = useState('');
  const [textoId2, setTextoId2] = useState('');
  const [homeImages, setHomeImages] = useState([]); // Almacenar todas las imágenes

  useEffect(() => {
    const obtenerTextoPorId = async (id, setTexto) => {
      try {
        const response = await axios.get(`http://localhost:3000/carga/id/${id}`);
        setTexto(response.data.texto);
      } catch (error) {
        console.error(`Error al obtener el texto con ID ${id}:`, error);
      }
    };

    const obtenerImagenesPorNombres = async (nombres) => {
      try {
        const imagePromises = nombres.map(async (nombre) => {
          const response = await axios.get(`http://localhost:3000/imagenes/nombre/${nombre}`);
          console.log(response.data.url); // Esto debería funcionar ahora
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

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1>{textoId1}</h1>
      <div className="container plan-de-estudios mt-5">
        <div className="row">
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
