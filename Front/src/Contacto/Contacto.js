import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Contacto = () => {
    const [telefono, setTelefono] = useState('');
    const [facebookURL, setFacebookURL] = useState('');
    const [instagramURL, setInstagramURL] = useState('');
    console.log(facebookURL)
    useEffect(() => {
        const cargarDatosPorReferencia = async (referencia, setDato) => {
            try {
                const response = await axios.get(`http://localhost:3000/carga/${referencia}`); // Reemplaza URL_DE_TU_API con la URL real de tu API
                setDato(response.data.texto);
                console.log(response.data)
            } catch (error) {
                console.error(`Error al cargar los datos de ${referencia}:`, error);
            }
        };

        // Cargar datos por referencia para el teléfono, Facebook e Instagram
        cargarDatosPorReferencia('Contacto_General', setTelefono);
        cargarDatosPorReferencia('Facebook', setFacebookURL);
        cargarDatosPorReferencia('Instagram', setInstagramURL);
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title">¡Contáctanos!</h1>
                            <p className="card-text">
                                Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
                            </p>
                            <p className="card-text">Teléfono: {telefono} </p>

                            <div className="redes-sociales">
                                <a href={facebookURL} className="btn btn-primary mx-2">
                                    Facebook
                                </a>

                                <a href={instagramURL} className="btn btn-primary mx-2">
                                    Instagram
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacto;
