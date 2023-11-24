import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './reglamento.css';

const Reglamento = () => {
  const [reglamento1, setTextoReglamento] = useState('');
  const [tituloRegalmento1, setTituloReglamento1] = useState('');
  const [tituloRegalmento2, setTituloReglamento2] = useState('');
  const [tituloRegalmento3, setTituloReglamento3] = useState('');
  const [imagenReglamento1, setImagenReglamento1] = useState(null);
  const [imagenReglamento2, setImagenReglamento2] = useState(null);
  const [imagenReglamento3, setImagenReglamento3] = useState(null);
  const [url1, setUrl1] = useState(null);
  const [url2, setUrl2] = useState(null);
  const [url3, setUrl3] = useState(null);

  useEffect(() => {
    const obtenerTextoPorReferencia = async (referencia, setTextoReglamento) => {
      try {
        const responseTexto = await axios.get(`http://localhost:3000/carga/${referencia}`);
        setTextoReglamento(responseTexto.data.texto);
      } catch (error) {
        console.error(`Error al obtener datos de ${referencia}:`, error);
      }
    };

    const  obtenerTituloPorReferencia = async (referencia, setTituloReglamento) => {
      try {
        const responseTexto = await axios.get(`http://localhost:3000/carga/${referencia}`);
        setTituloReglamento(responseTexto.data.texto);
   
      } catch (error) {
        console.error(`Error al obtener datos de ${referencia}:`, error);
      }
    };
   
    const obtenerImagenPorReferencia = async (referencia, setTituloReglamento, setImagenReglamento) => {
      try {


        const responseImagen = await axios.get(`http://localhost:3000/imagenes/nombre/${referencia}`);

        if (responseImagen.data) {
          setImagenReglamento(responseImagen.data.url);
        }
      } catch (error) {
        console.error(`Error al obtener datos de ${referencia}:`, error);
      }
    };
  
      const cargarDatosPorReferencia = async (referencia, setDato) => {
          try {
              const response = await axios.get(`http://localhost:3000/carga/${referencia}`);
              setDato(response.data.texto);
          } catch (error) {
              console.error(`Error al cargar los datos de ${referencia}:`, error);
          }
      };

      cargarDatosPorReferencia('URL_1', setUrl1);
      cargarDatosPorReferencia('URL_2', setUrl2);
      cargarDatosPorReferencia('URL_3', setUrl3);
  
  
    obtenerTextoPorReferencia('Reglamento_1', setTextoReglamento);
    obtenerTituloPorReferencia('Titulo_Reglamento_1', setTituloReglamento1);
    obtenerTituloPorReferencia('Titulo_Reglamento_2', setTituloReglamento2);
    obtenerTituloPorReferencia('Titulo_Reglamento_3', setTituloReglamento3);

    obtenerImagenPorReferencia('imagenReglamento1', setTituloReglamento1, setImagenReglamento1);
    obtenerImagenPorReferencia('imagenReglamento2', setTituloReglamento2, setImagenReglamento2);
    obtenerImagenPorReferencia('imagenReglamento3', setTituloReglamento3, setImagenReglamento3);
  }, []);

  const abrirURL = (url) => {
    window.open(url, '_blank');
};


  return (
    <div className="mt-5  flex-column text-center my-auto box ">
      <div className="card-body ">
        <h1 className="title-reglamento">{reglamento1}</h1>
        <div className="row">
          <div className="col-md-4 card-reglamento mb-3">
            <div className="card-reglamentos">
              {imagenReglamento1 && <img className="img-reglamento mx-auto"  style={{ maxWidth: '300px' }} src={imagenReglamento1} alt="foto del reglamento 1" />}
              <div className="card-body">
                <h3 className="card-title-reglamento">{tituloRegalmento1}</h3>
                <button className="btn-reglamento btn mt-5 mx-2" onClick={() => abrirURL(url1)}>
                            Ver Documento
                        </button>
              </div>
            </div>
          </div>
          <div className="col-md-4 card-reglamento mb-3">
            <div className="card-reglamentos">
              {imagenReglamento2 && <img className="img-reglamento mx-auto"  style={{ maxWidth: '300px' }} src={imagenReglamento2} alt="foto del reglamento 2" />}
              <div className="card-body">
                <h3 className="card-title-reglamento">{tituloRegalmento2}</h3>
                <button className="btn-reglamento btn mt-5 mx-2" onClick={() => abrirURL(url2)}>
                            Ver Documento
                        </button>
              </div>
            </div>
          </div>
          <div className="col-md-4 card-reglamento mb-3">
            <div className="card-reglamentos">
              {imagenReglamento3 && <img className="img-reglamento mx-auto" style={{ maxWidth: '300px' }}  src={imagenReglamento3} alt="foto del reglamento 3" />}
              <div className="card-body">
                <h3 className="card-title-reglamento">{tituloRegalmento3}</h3>
                <button className=" btn btn-reglamento mt-5 mx-2" onClick={() => abrirURL(url3)}>
                            Ver Documento
                        </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reglamento;