import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reglamento = () => {
  const [reglamento1, setTextoReglamento] = useState('');
  const [imagenesReglamdento, setImagenesReglamento] = useState([]);

  useEffect(() => {
    const obtenerTextoPorReferencia = async (referencia, setTextoReglamento) => {
      try {
        const responseTexto = await axios.get(`http://localhost:3000/carga/${referencia}`);
        setTextoReglamento(responseTexto.data.texto);
      } catch (error) {
        console.error(`Error al obtener datos de ${referencia}:`, error);
      }
    };

    const obtenerImagenesReglamento = async () => {
      try {
        const responseImagenes = await axios.get('http://localhost:3000/imagenes');
        setImagenesReglamento(responseImagenes.data);
      } catch (error) {
        console.error('Error al obtener las imágenes:', error);
      }
    };

    obtenerTextoPorReferencia(reglamento1, setTextoReglamento);
    obtenerImagenesReglamento();
  }, []);

  const descargarDocumento = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="container mt-4 d-flex flex-column justify-content-center align-items-center" style={{ height: '50vh' }}>
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">{reglamento1}</h1>
          <div>
          {imagenesReglamdento.map((imagen, index) => (
            <div key={index}>
              <img src={imagen.url} alt={`Imagen ${index}`} />
              <button onClick={() => descargarDocumento(imagen.documentoUrl)}>Descargar Documento</button>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reglamento;


