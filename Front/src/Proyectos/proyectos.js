import React, { useEffect, useState } from "react";
import './proyectos.css';
import axios from "axios";


const Proyectos = () => {
    const [textoProyecto, setTextoProyecto] = useState('');
    const [descripcionProyecto, setDescripcionProyecto] = useState('');
    const [tituloProyecto1, setTituloProyecto1] = useState('');
    const [tituloProyecto2, setTituloProyecto2] = useState('');
    const [tituloProyecto3, setTituloProyecto3] = useState('');
    const [tituloProyecto4, setTituloProyecto4] = useState('');
    const [textoDescripcionProyecto1, settextoDescripcionProyecto1] = useState('');
    const [textoDescripcionProyecto2, settextoDescripcionProyecto2] = useState('');
    const [textoDescripcionProyecto3, settextoDescripcionProyecto3] = useState('');
    const [textoDescripcionProyecto4, settextoDescripcionProyecto4] = useState('');
    const [proyectoImages1, setproyectoImages1] = useState(null);
    const [proyectoImages2, setproyectoImages2] = useState(null);
    const [proyectoImages3, setproyectoImages3] = useState(null);
    const [proyectoImages4, setproyectoImages4] = useState(null);


    useEffect(() => {
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


        const obtenerTextoPorReferencia = async (referencia, setTexto) => {
            try {
                const response = await axios.get(`https://app-2361a359-07df-48b8-acfd-5fb4c0536ce2.cleverapps.io/carga/${referencia}`);
                var textoConSaltosDeLinea = response.data.texto.replace(/\n/g, "<br>");

                setTexto(textoConSaltosDeLinea);
            } catch (error) {
                console.error(`Error al obtener el texto con ID ${referencia}:`, error);
            }

        };

        obtenerTextoPorReferencia('Texto_Proyecto', setTextoProyecto);
        obtenerTextoPorReferencia('Descripcion_Proyecto', setDescripcionProyecto);

        obtenerTextoPorReferencia('Titulo_Proyecto_1', setTituloProyecto1);
        obtenerTextoPorReferencia('Titulo_Proyecto_2', setTituloProyecto2);
        obtenerTextoPorReferencia('Titulo_Proyecto_3', setTituloProyecto3);
        obtenerTextoPorReferencia('Titulo_Proyecto_4', setTituloProyecto4);

        obtenerTextoPorReferencia('Texto_Descripcion_Proyecto_1', settextoDescripcionProyecto1);
        obtenerTextoPorReferencia('Texto_Descripcion_Proyecto_2', settextoDescripcionProyecto2);
        obtenerTextoPorReferencia('Texto_Descripcion_Proyecto_3', settextoDescripcionProyecto3);
        obtenerTextoPorReferencia('Texto_Descripcion_Proyecto_4', settextoDescripcionProyecto4);

        // Obtener texto e imagen por referencia para cada directivo
        obtenerImagenPorReferencia('proyectoImagen1', setproyectoImages1);
        obtenerImagenPorReferencia('proyectoImagen2', setproyectoImages2);
        obtenerImagenPorReferencia('proyectoImagen3', setproyectoImages3);
        obtenerImagenPorReferencia('proyectoImagen4', setproyectoImages4);
    }, []);

    const htmlProcesado = { __html: descripcionProyecto };
    const htmlProcesado1 = { __html: textoDescripcionProyecto1 };
    const htmlProcesado2 = { __html: textoDescripcionProyecto2 };
    const htmlProcesado3 = { __html: textoDescripcionProyecto3 };
    const htmlProcesado4 = { __html: textoDescripcionProyecto4 };

    return (
        <div className="">

            <div class="container  ">
                <h2>Nuestros proyectos</h2>
                <p className="text-center" dangerouslySetInnerHTML={htmlProcesado}></p>
                <div class="row">
                    <div class="col-md-12">
                        <div class="main-timeline4">
                            <div class="timeline">
                                <a href="#" class="timeline-content">
                                    <span class="year" >{proyectoImages1 && (
                                        <img src={proyectoImages1} className="imagen-proyecto"
                                         style={{  marginTop: '-11px', maxWidth: '90px', height: '90px', borderRadius: '50%' }}
                                          alt="Foto del proyecto 1" />
                                    )}</span>
                                    <div class="inner-content">
                                        <h3 class="title">{tituloProyecto1}</h3>
                                        <p class="description" dangerouslySetInnerHTML={htmlProcesado1}>

                                        </p>
                                    </div>
                                </a>
                            </div>
                            <div class="timeline">
                                <a href="#" class="timeline-content">
                                    <span class="year">{proyectoImages2 && (
                                        <img src={proyectoImages2} className="imagen-proyecto" style={{ marginTop: '-11px', maxWidth: '90px', height: '90px', borderRadius: '50%' }} alt="Foto del proyecto 1" />
                                    )}</span>
                                    <div class="inner-content">
                                        <h3 class="title">{tituloProyecto2}</h3>
                                        <p class="description" dangerouslySetInnerHTML={htmlProcesado2}>

                                        </p>
                                    </div>
                                </a>
                            </div>
                            <div class="timeline">
                                <a href="#" class="timeline-content">
                                    <span class="year">{proyectoImages3 && (
                                        <img src={proyectoImages3} className="imagen-proyecto" style={{ marginTop: '-11px', maxWidth: '90px', height: '90px', borderRadius: '50%' }} alt="Foto del proyecto 1" />
                                    )}</span>
                                    <div class="inner-content">
                                        <h3 class="title">{tituloProyecto3}</h3>
                                        <p class="description" dangerouslySetInnerHTML={htmlProcesado3}>
                                        </p>
                                    </div>
                                </a>
                            </div>
                            <div class="timeline">
                                <a href="#" class="timeline-content">
                                    <span class="year">{proyectoImages4 && (
                                        <img src={proyectoImages4} className="imagen-proyecto" style={{ marginTop: '-11px', maxWidth: '90px', height: '90px', borderRadius: '50%' }} alt="Foto del proyecto 1" />
                                    )}</span>
                                    <div class="inner-content">
                                        <h3 class="title">{tituloProyecto4}</h3>
                                        <p class="description" dangerouslySetInnerHTML={htmlProcesado4}>
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Proyectos;