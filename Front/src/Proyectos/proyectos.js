import React, { useEffect, useState } from "react";
import './proyectos.css';
import axios from "axios";

const Proyectos = () => {
    const [textoProyecto, setTextoProyecto] = useState('');
    const [textoProyecto2, setTextoProyecto2] = useState('');
    const [textoDescripcionProyecto1, settextoDescripcionProyecto1] = useState('');
    const [textoDescripcionProyecto2, settextoDescripcionProyecto2] = useState('');
    const [textoDescripcionProyecto3, settextoDescripcionProyecto3] = useState('');
    const [proyectoImages1, setproyectoImages1] = useState(null);
    const [proyectoImages2, setproyectoImages2] = useState(null);
    const [proyectoIMages3, setproyectoImages3] = useState(null);

    useEffect(() => {
        const obtenerTextoEImagenPorReferencia = async (referencia, setTexto, setImagen) => {
            try {
                const responseTexto = await axios.get(`http://localhost:3000/carga/${referencia}`);
                setTexto(responseTexto.data.texto);

                const responseImagen = await axios.get(`http://localhost:3000/imagenes/nombre/${referencia}`);

                if (responseImagen.data) {

                    setImagen(responseImagen.data.url);
                }
            } catch (error) {
                console.error(`Error al obtener datos de ${referencia}:`, error);
            }
        };


        const obtenerTextoPorId = async (id, setTexto) => {
            try {
                const response = await axios.get(`http://localhost:3000/carga/id/${id}`);
                setTexto(response.data.texto);
            } catch (error) {
                console.error(`Error al obtener el texto con ID ${id}:`, error);
            }

        };

        obtenerTextoPorId(1, setTextoProyecto);
        obtenerTextoPorId(2, setTextoProyecto2);

        // Obtener texto e imagen por referencia para cada directivo
        obtenerTextoEImagenPorReferencia('proyectoImagen1', settextoDescripcionProyecto1, setproyectoImages1);
        obtenerTextoEImagenPorReferencia('proyectoImagen2', settextoDescripcionProyecto2, setproyectoImages2);
        obtenerTextoEImagenPorReferencia('proyectoImagen3', settextoDescripcionProyecto3, setproyectoImages3);
    }, []);

    return (
        <div class="container">
            <div class="row">
                <div class="col-md-9">
                    <h1>{textoProyecto}</h1>
                    <p>{textoProyecto2}</p>
                </div>
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-12">
                            <div className="cuadro-imagen">
                                {proyectoImages1 && <img src={proyectoImages1} alt="foto del proyecto 1" />}
                            </div>
                            <h3>{textoDescripcionProyecto1}</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div className="cuadro-imagen">
                                {proyectoImages2 && <img src={proyectoImages2} alt="foto del proyecto 1" />}
                            </div>
                            <h3>{textoDescripcionProyecto2}</h3>
                        </div>
                        <div class="col-md-6">
                            <div className="cuadro-imagen">
                                {proyectoIMages3 && <img src={proyectoIMages3} alt="foto del proyecto 1" />}
                            </div>
                            <h3>{textoDescripcionProyecto3}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Proyectos;
