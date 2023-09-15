import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Contacto = () => {
    const [telefono, setTelefono] = useState('');
    const [facebookURL, setFacebookURL] = useState('');
    const [instagramURL, setInstagramURL] = useState('');

    useEffect(() => {
        const cargarDatosPorReferencia = async (referencia, setDato) => {
            try {
                const response = await axios.get(`http://localhost:3000/carga/${referencia}`);
                setDato(response.data.texto);
            } catch (error) {
                console.error(`Error al cargar los datos de ${referencia}:`, error);
            }
        };

        cargarDatosPorReferencia('Contacto_General', setTelefono);
        cargarDatosPorReferencia('Facebook', setFacebookURL);
        cargarDatosPorReferencia('Instagram', setInstagramURL);
    }, []);

    // Función para abrir una URL en una nueva pestaña
    const abrirURL = (url) => {
        console.log(url);
        window.open(url, '_blank');
    };

    return (
<div className="container mt-4 d-flex flex-column justify-content-center align-items-center" style={{ height: '50vh' }}>
  <div className="card">
    <div className="card-body">
      <h1 className="card-title">¡Contáctanos!</h1>
      <p className="card-text">
        Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
      </p>
      <p className="card-text">Teléfono: {telefono} </p>

      <div className="redes-sociales">
        <button className="btn btn-primary mx-2" onClick={() => abrirURL(facebookURL)}>
          Facebook
        </button>

        <button className="btn btn-primary mx-2" onClick={() => abrirURL(instagramURL)}>
          Instagram
        </button>
      </div>
    </div>
  </div>
</div>
    )}
export default Contacto;
