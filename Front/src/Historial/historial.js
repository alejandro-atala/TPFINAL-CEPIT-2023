import React, {useEffect, useState} from "react";
import axios from 'axios';
import './historial.css';

const Historial = () => {

    const [textoHistorial, setTextoHistorial] = useState('');
    const [yearLinea1, setYearLinea1] = useState('');
    const [yearLinea2, setYearLinea2] = useState('');
    const [yearLinea3, setYearLinea3] = useState('');
    const [yearLinea4, setYearLinea4] = useState('');
    const [lineaDeTiempo1, setlineaDeTiempo1] = useState('');
    const [lineaDeTiempo2, setlineaDeTiempo2] = useState('');
    const [lineaDeTiempo3, setlineaDeTiempo3] = useState('');
    const [lineaDeTiempo4, setlineaDeTiempo4] = useState('');
    const [lineaDeTiempoBonus, setlineaDeTiempoBonus] = useState('');
    const [imagenLinea1, setImagenLinea1] = useState(null);
    const [imagenLinea2, setImagenLinea2] = useState(null);
    const [imagenLinea3, setImagenLinea3] = useState(null);
    const [ImagenLinea4, setImagenLinea4] = useState(null);
    const [imagenBonus, setImagenBonus] = useState(null);
    
  useEffect(() => {
    const obtenerImagenPorReferencia = async (referencia, setImagenLinea) => {
      try {
        const responseImagen = await axios.get(`https://app-2361a359-07df-48b8-acfd-5fb4c0536ce2.cleverapps.io/imagenes/nombre/${referencia}`);

        if (responseImagen.data) {
          setImagenLinea(responseImagen.data.url);
        }
      } catch (error) {
        console.error(`Error al obtener datos de ${referencia}:`, error);
      }
    };
    obtenerImagenPorReferencia('ImagenLinea1', setImagenLinea1);
    obtenerImagenPorReferencia('ImagenLinea2', setImagenLinea2);
    obtenerImagenPorReferencia('ImagenLinea3', setImagenLinea3);
    obtenerImagenPorReferencia('ImagenLinea4', setImagenLinea4);
    obtenerImagenPorReferencia('ImagenBonus', setImagenBonus);
    
    const obtenerTextoPorReferencia = async (referencia, setTextoHistorial) => {
      try {
        const responseTexto = await axios.get(`https://app-2361a359-07df-48b8-acfd-5fb4c0536ce2.cleverapps.io/carga/${referencia}`);
        var textoConSaltosDeLinea = responseTexto.data.texto.replace(/\n/g, "<br>");

        setTextoHistorial(textoConSaltosDeLinea);
      } catch (error) {
        console.error(`Error al obtener datos de ${referencia}:`, error);
      }
    };
    obtenerTextoPorReferencia('Texto_Historial', setTextoHistorial);
    obtenerTextoPorReferencia('Año_Linea_1', setYearLinea1);
    obtenerTextoPorReferencia('Año_Linea_2', setYearLinea2);
    obtenerTextoPorReferencia('Año_Linea_3', setYearLinea3);
    obtenerTextoPorReferencia('Año_Linea_4', setYearLinea4);
    obtenerTextoPorReferencia('Linea_tiempo_1', setlineaDeTiempo1);
    obtenerTextoPorReferencia('Linea_tiempo_2', setlineaDeTiempo2);
    obtenerTextoPorReferencia('Linea_tiempo_3', setlineaDeTiempo3);
    obtenerTextoPorReferencia('Linea_tiempo_4', setlineaDeTiempo4);
    obtenerTextoPorReferencia('Texto_Bonus', setlineaDeTiempoBonus);
  }, []);

  const htmlProcesado = { __html: textoHistorial };
  const htmlProcesado1 = { __html: lineaDeTiempo1 };
  const htmlProcesado2 = { __html: lineaDeTiempo2 };
  const htmlProcesado3 = { __html: lineaDeTiempo3 };
  const htmlProcesado4 = { __html: lineaDeTiempo4 };
  const htmlProcesado5 = { __html: lineaDeTiempoBonus };
    
  return (
    <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <h3 className="text-center"> Nuestra Historia </h3>
        <p className="text-historial text-center" dangerouslySetInnerHTML={htmlProcesado}></p>
        <ul className="timeline">
          <li>
            <div class="timeline-image">
            {imagenLinea1 && <img className="img-circle img-responsive"  
            style={{  marginTop: '-6px', marginLeft:'-7px' , maxWidth: '200px', height: '200px', borderRadius: '50%' }} 
            src={imagenLinea1} alt="foto Linea 1" />}
            </div>
            <div class="timeline-panel">
              <div class="timeline-heading">
                <h4>{yearLinea1}</h4>
              </div>
              <div class="timeline-body">
                <p class="text-muted" dangerouslySetInnerHTML={htmlProcesado1}></p>
              </div>
            </div>
            <div class="line"></div>
          </li>
          <li class="timeline-inverted">
            <div class="timeline-image">
            {imagenLinea1 && <img className="img-circle img-responsive"  
            style={{  marginTop: '-6px', marginLeft:'-7px' , maxWidth: '200px', height: '200px', borderRadius: '50%' }}
             src={imagenLinea2} alt="foto Linea 1" />}
            </div>
            <div class="timeline-panel">
              <div class="timeline-heading">
                <h4>{yearLinea2}</h4>
              </div>
              <div class="timeline-body">
                <p class="text-muted" dangerouslySetInnerHTML={htmlProcesado2}>
                </p>
              </div>
            </div>
            <div class="line"></div>
          </li>
          <li>
            <div class="timeline-image">
            {imagenLinea1 && <img className="img-circle img-responsive" 
             style={{  marginTop: '-6px', marginLeft:'-7px' , maxWidth: '200px', height: '200px', borderRadius: '50%' }}
              src={imagenLinea3} alt="foto Linea 1" />}
            </div>
            <div class="timeline-panel">
              <div class="timeline-heading">
                <h4>{yearLinea3}</h4>
              </div>
              <div class="timeline-body">
                <p class="text-muted" dangerouslySetInnerHTML={htmlProcesado3}>
                </p>
              </div>
            </div>
            <div class="line"></div>
          </li>
          <li class="timeline-inverted">
            <div class="timeline-image">
            {imagenLinea1 && <img className="img-circle img-responsive"  
            style={{  marginTop: '-6px', marginLeft:'-7px' , maxWidth: '200px', height: '200px', borderRadius: '50%' }} 
            src={ImagenLinea4} alt="foto Linea 1" />}
            </div>
            <div class="timeline-panel">
              <div class="timeline-heading">
                <h4>{yearLinea4}</h4>
              </div>
              <div class="timeline-body">
                <p class="text-muted" dangerouslySetInnerHTML={htmlProcesado4}>
                </p>
              </div>
            </div>
            <div class="line"></div>
          </li>
          <li>
            <div class="timeline-image">
            {imagenLinea1 && <img className="img-circle img-responsive"  
            style={{  marginTop: '-6px', marginLeft:'-7px' , maxWidth: '200px', height: '200px', borderRadius: '50%' }} 
            src={imagenBonus} alt="foto Linea 1" />}
            </div>
            <div class="timeline-panel">
              <div class="timeline-heading">
                <h4>Bonus</h4>
              </div>
              <div class="timeline-body">
                <p class="text-muted" dangerouslySetInnerHTML={htmlProcesado5}>
                </p>
              </div>
            </div>
          </li>
          </ul>
        </div>
      </div>
    </div>   
  );
};
export default Historial;