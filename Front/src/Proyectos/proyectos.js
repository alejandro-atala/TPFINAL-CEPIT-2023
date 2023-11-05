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

        obtenerTextoPorReferencia('Texto_Descripcion_Proyecto_1', settextoDescripcionProyecto1);
        obtenerTextoPorReferencia('Texto_Descripcion_Proyecto_2', settextoDescripcionProyecto2);
        obtenerTextoPorReferencia('Texto_Descripcion_Proyecto_3', settextoDescripcionProyecto3);

        // Obtener texto e imagen por referencia para cada directivo
        obtenerImagenPorReferencia('proyectoImagen1', setproyectoImages1);
        obtenerImagenPorReferencia('proyectoImagen2', setproyectoImages2);
        obtenerImagenPorReferencia('proyectoImagen3', setproyectoImages3);
    }, []);

    const htmlProcesado = { __html: descripcionProyecto };
    const htmlProcesado1 = { __html: textoDescripcionProyecto1 };
    const htmlProcesado2 = { __html: textoDescripcionProyecto2 };
    const htmlProcesado3 = { __html: textoDescripcionProyecto3 };


    return (


        <div className=" mt-5  flex-column text-center my-auto  ">
            <div className="col-md-12">
                <h1 className="titulo-proyectos">{textoProyecto}</h1>
                <div className="texto-proyectos">
                    <p className="text-center" dangerouslySetInnerHTML={htmlProcesado}></p>
                </div>
            </div>
            <div className="row">
                <div class="">

                    <h3 className="titulo-proyecto">{tituloProyecto1}</h3>
                    <p className="texto-proyectos" dangerouslySetInnerHTML={htmlProcesado1}></p>
                    <div className="cuadro-imagen-proyecto">
                        {proyectoImages1 && <img src={proyectoImages1} className="imagen-proyecto" style={{ maxWidth: '300px' }} alt="foto del proyecto 1" />}
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div className="cuadro-imagen-proyecto">
                        {proyectoImages2 && <img src={proyectoImages2} className="imagen-proyecto" style={{ maxWidth: '300px' }} alt="foto del proyecto 2" />}
                    </div>
                    <h3 className="titulo-proyecto">{tituloProyecto2}</h3>
                    <p className="texto-proyectos" dangerouslySetInnerHTML={htmlProcesado2}></p>
                </div>
                <div class="col-md-6">
                    <div className="cuadro-imagen-proyecto">
                        {proyectoImages3 && <img src={proyectoImages3} className="imagen-proyecto" style={{ maxWidth: '300px' }} alt="foto del proyecto 3" />}
                    </div>
                    <h3 className="titulo-proyecto">{tituloProyecto3}</h3>
                    <p className="texto-proyectos" dangerouslySetInnerHTML={htmlProcesado3}></p>
                </div>
            </div>

        </div>


    );
};

export default Proyectos;