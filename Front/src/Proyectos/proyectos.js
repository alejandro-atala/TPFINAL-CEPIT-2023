import React, { useEffect, useState } from "react";
import './proyectos.css';
import axios from "axios";


const Proyectos = () => {
    const [textoProyecto, setTextoProyecto] = useState('');
    const [descripcionProyecto, setDescripcionProyecto] = useState('');
    const [tituloProyecto1, setTituloProyecto1] = useState('');
    const [tituloProyecto2, setTituloProyecto2] = useState('');
    const [tituloProyecto3, setTituloProyecto3] = useState('');
    const [textoDescripcionProyecto1, settextoDescripcionProyecto1] = useState('');
    const [textoDescripcionProyecto2, settextoDescripcionProyecto2] = useState('');
    const [textoDescripcionProyecto3, settextoDescripcionProyecto3] = useState('');
    const [proyectoImages1, setproyectoImages1] = useState(null);
    const [proyectoImages2, setproyectoImages2] = useState(null);
    const [proyectoImages3, setproyectoImages3] = useState(null);

    useEffect(() => {
        const obtenerImagenPorReferencia = async (referencia, setImagen) => {
            try {
                const responseImagen = await axios.get(`http://localhost:3000/imagenes/nombre/${referencia}`);

                if (responseImagen.data) {

                    setImagen(responseImagen.data.url);
                }
            } catch (error) {
                console.error(`Error al obtener datos de ${referencia}:`, error);
            }
        };


        const obtenerTextoPorReferencia = async (referencia, setTexto) => {
            try {
                const response = await axios.get(`http://localhost:3000/carga/${referencia}`);
                setTexto(response.data.texto);
            } catch (error) {
                console.error(`Error al obtener el texto con ID ${referencia}:`, error);
            }

        };

        obtenerTextoPorReferencia('Texto_Proyecto', setTextoProyecto);
        obtenerTextoPorReferencia('Descripcion_Proyecto', setDescripcionProyecto);

        obtenerTextoPorReferencia('Titulo_Proyecto_1', setTituloProyecto1);
        obtenerTextoPorReferencia('Titulo_Proyecto_2', setTituloProyecto2);
        obtenerTextoPorReferencia('Titulo_Proyecto_3', setTituloProyecto3);

        obtenerTextoPorReferencia('Texto_Descripcion_Proyecto_1', settextoDescripcionProyecto1);
        obtenerTextoPorReferencia('Texto_Descripcion_Proyecto_2', settextoDescripcionProyecto2);
        obtenerTextoPorReferencia('Texto_Descripcion_Proyecto_3', settextoDescripcionProyecto3);

        // Obtener texto e imagen por referencia para cada directivo
        obtenerImagenPorReferencia('proyectoImagen1', setproyectoImages1);
        obtenerImagenPorReferencia('proyectoImagen2', setproyectoImages2);
        obtenerImagenPorReferencia('proyectoImagen3', setproyectoImages3);
    }, []);

    return (

           
                <div className="row mt-5">
                    <div className="col-md-3">
                    <h1>{textoProyecto}</h1>
                        <p>{descripcionProyecto}</p>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div class="col-md-12">
                                <div className="cuadro-imagen-proyecto">
                                    {proyectoImages1 && <img src={proyectoImages1} alt="foto del proyecto 1" />}
                                </div>
                                <h3>{tituloProyecto1}</h3>
                                <p>{textoDescripcionProyecto1} </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div className="cuadro-imagen-proyecto">
                                    {proyectoImages2 && <img src={proyectoImages2} alt="foto del proyecto 2" />}
                                </div>
                                <h3>{tituloProyecto2}</h3>
                                <p> {textoDescripcionProyecto2}</p>
                            </div>
                            <div class="col-md-6">
                                <div className="cuadro-imagen-proyecto">
                                    {proyectoImages3 && <img src={proyectoImages3} alt="foto del proyecto 3" />}
                                </div>
                                <h3>{tituloProyecto3}</h3>
                                <p> {textoDescripcionProyecto3}</p>
                            </div>
                        </div>
                    </div>
                </div>
   

    );
};

export default Proyectos;
