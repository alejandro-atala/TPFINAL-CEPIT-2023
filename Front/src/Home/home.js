import React, { useState, useEffect } from "react";
import './home.css';
import axios from "axios";
import SideMenu from "../MenuLateral/sideMenu";

const HomePage = () => {
  const [textoId1, setTextoId1] = useState('');
  const [textoId2, setTextoId2] = useState('');
  const [homeImages, setHomeImages] = useState([]);
  const [textohome, setTextoHome] = useState('');
  const [titulohome1, setTituloHome] = useState('');
  const [homeImage1, setHomeImagen1] = useState('');
  const [homeImage2, setHomeImagen2] = useState('');
  const [itemHome1, setItemHome1] = useState('');
  const [itemHome2, setItemHome2] = useState('');
  const [itemHome3, setItemHome3] = useState('');
  const [itemHome4, setItemHome4] = useState('');

  useEffect(() => {
    const obtenerTextoPorId = async (id, setTexto) => {
      try {
        const response = await axios.get(`https://app-2361a359-07df-48b8-acfd-5fb4c0536ce2.cleverapps.io/carga/id/${id}`);
        var textoConSaltosDeLinea = response.data.texto.replace(/\n/g, "<br>");

        setTexto(textoConSaltosDeLinea);

      } catch (error) {
        console.error(`Error al obtener el texto con ID ${id}:`, error);
      }
    };

    const obtenerTextoPorReferencia = async (referencia, setTextoHistorial) => {
      try {
        const responseTexto = await axios.get(`https://app-2361a359-07df-48b8-acfd-5fb4c0536ce2.cleverapps.io/carga/${referencia}`);
        var textoConSaltosDeLinea = responseTexto.data.texto.replace(/\n/g, "<br>");

        setTextoHistorial(textoConSaltosDeLinea);
      } catch (error) {
        console.error(`Error al obtener datos de ${referencia}:`, error);
      }
    };

    obtenerTextoPorReferencia('Texto_Home', setTextoHome);
    obtenerTextoPorReferencia('Titulo_home', setTituloHome);
    obtenerTextoPorReferencia('Item_home1', setItemHome1);
    obtenerTextoPorReferencia('Item_home2', setItemHome2);
    obtenerTextoPorReferencia('Item_home3', setItemHome3);
    obtenerTextoPorReferencia('Item_home4', setItemHome4);


    const obtenerImagenesPorNombres = async (nombres) => {
      try {
        const imagePromises = nombres.map(async (nombre) => {
          const response = await axios.get(`https://app-2361a359-07df-48b8-acfd-5fb4c0536ce2.cleverapps.io/imagenes/nombre/${nombre}`);

          return response.data.url;
        });

        const images = await Promise.all(imagePromises);
        setHomeImages(images.filter((image) => image !== null));

      } catch (error) {
        console.error(`Error al obtener las imágenes:`, error);
      }
    };

    const obtenerImagenPorReferencia = async (referencia, setImagen) => {
      try {
        const responseImagen = await axios.get(`https://app-2361a359-07df-48b8-acfd-5fb4c0536ce2.cleverapps.io/imagenes/nombre/${referencia}`);

        if (responseImagen.data) {

          setImagen(responseImagen.data.url);
        }
      } catch (error) {
        console.error(`Error al obtener datos de ${referencia}:`, error);
      }
    };



    // Obtener textos para ID 1 y ID 2
    obtenerTextoPorId(1, setTextoId1);
    obtenerTextoPorId(2, setTextoId2);

    // Obtener imágenes por nombre
    obtenerImagenesPorNombres(['home1', 'home2', 'home3']);
    obtenerImagenPorReferencia('Imagen_home', setHomeImagen1);
    obtenerImagenPorReferencia('Imagen_Home2', setHomeImagen2);
  }, []);

  const htmlProcesado = { __html: textoId2 };
  const htmlProcesado1 = { __html: textohome };

  return (
    <div className="container-home">
    <div className="row">
      <div className="col-md-3 col-sm-6 col-xs-12">
        {/* Utiliza clases de Bootstrap para ocultar en pantallas pequeñas */}
        <div className="d-none d-sm-block">
          <SideMenu />
        </div>
      </div>

        <div className="col-md-9 mt-5 flex-column">
          <h1 className="text-left d-flex flex-column align-items-left titulo-home">{textoId1}</h1>
          <div className="row align-items-start">
            <div className="col-md-6 carousel-item-home">
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
              <div>
                <div classname="col-md-3 extra-home ">
                  <div className="cuadro-imagen-home mt-5">
                    <h3 className="titulo-home2">{titulohome1}</h3>
                    {homeImage1 && <img src={homeImage2} className="imagen-home" style={{ maxWidth: '300px' }} alt="foto home 2" />}
                    {homeImage1 && <img src={homeImage1} className="imagen-home" style={{ maxWidth: '300px' }} alt="foto home 1" />}
                    <h4 className="texto-home-extra" dangerouslySetInnerHTML={htmlProcesado1}></h4>
                    <ul classname="list-group">
                      <li classname="item-home">{itemHome1}</li>
                      <li classname="item-home">{itemHome2}</li>
                      <li classname="item-home">{itemHome3}</li>
                      <li classname="item-home">{itemHome4}</li>
                    </ul>
                  </div>
                </div>
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
