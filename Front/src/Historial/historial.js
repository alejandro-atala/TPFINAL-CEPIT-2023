import React, {useEffect, useState} from "react";
import axios from 'axios';
import './historial.css';

const Historial = () => {

    const [textoHistorial, setTextoHistorial] = useState('');
    
  useEffect(() => {
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
  }, []);

  const htmlProcesado = { __html: textoHistorial };
    
  return (
    <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <h3 className="text-center"></h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <ul className="timeline">
          <li>
            <div class="timeline-image">
              {/* <img class="img-circle img-responsive" src="http://lorempixel.com/250/250/cats/1" alt=""> */}
            </div>
            <div class="timeline-panel">
              <div class="timeline-heading">
                <h4>Step One</h4>
                <h4 class="subheading">Subtitle</h4>
              </div>
              <div class="timeline-body">
                <p class="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <div class="line"></div>
          </li>
          <li class="timeline-inverted">
            <div class="timeline-image">
              {/* <img class="img-circle img-responsive" src="http://lorempixel.com/250/250/cats/2" alt=""> */}
            </div>
            <div class="timeline-panel">
              <div class="timeline-heading">
                <h4>Step Two</h4>
                <h4 class="subheading">Subtitle</h4>
              </div>
              <div class="timeline-body">
                <p class="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <div class="line"></div>
          </li>
          <li>
            <div class="timeline-image">
              {/* <img class="img-circle img-responsive" src="http://lorempixel.com/250/250/cats/3" alt=""> */}
            </div>
            <div class="timeline-panel">
              <div class="timeline-heading">
                <h4>Step Three</h4>
                <h4 class="subheading">Subtitle</h4>
              </div>
              <div class="timeline-body">
                <p class="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <div class="line"></div>
          </li>
          <li class="timeline-inverted">
            <div class="timeline-image">
              {/* <img class="img-circle img-responsive" src="http://lorempixel.com/250/250/cats/4" alt=""> */}
            </div>
            <div class="timeline-panel">
              <div class="timeline-heading">
                <h4>Step Three</h4>
                <h4 class="subheading">Subtitle</h4>
              </div>
              <div class="timeline-body">
                <p class="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
            <div class="line"></div>
          </li>
          <li>
            <div class="timeline-image">
              {/* <img class="img-circle img-responsive" src="http://lorempixel.com/250/250/cats/5" alt=""> */}
            </div>
            <div class="timeline-panel">
              <div class="timeline-heading">
                <h4>Bonus Step</h4>
                <h4 class="subheading">Subtitle</h4>
              </div>
              <div class="timeline-body">
                <p class="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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