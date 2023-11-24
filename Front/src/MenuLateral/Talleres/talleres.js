// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './talleres.css';
// import axios from 'axios';
// import SideMenu from '../sideMenu';

// const Talleres = () => {
//   const [textoTaller1, setTextoTaller1] = useState('');
//   const [textoTaller2, setTextoTaller2] = useState('');
//   const [textoTaller3, setTextoTaller3] = useState('');
//   const [textoTaller4, setTextoTaller4] = useState('');
//   const [textoTaller5, setTextoTaller5] = useState('');
//   const [textoTaller6, setTextoTaller6] = useState('');
//   const [textoTelefono, setTextoTelefono] = useState('');
//   const [imagenTaller1, setImagenTaller1] = useState(null);
//   const [imagenTaller2, setImagenTaller2] = useState(null);
//   const [imagenTaller3, setImagenTaller3] = useState(null);
//   const [imagenTaller4, setImagenTaller4] = useState(null);
//   const [imagenTaller5, setImagenTaller5] = useState(null);
//   const [imagenTaller6, setImagenTaller6] = useState(null);

//   useEffect(() => {
//     const obtenerTextoEImagenPorReferencia = async (referencia, setTexto, setImagen) => {
//       try {
//         const responseTexto = await axios.get(`http://localhost:3000/carga/${referencia}`);

//         setTexto(responseTexto.data.texto);

//         const responseImagen = await axios.get(`http://localhost:3000/imagenes/nombre/${referencia}`);
//         console.log(responseImagen.data.url)
//         if (responseImagen.data) {
//           setImagen(responseImagen.data.url);
//         }
//       } catch (error) {
//         console.error(`Error al obtener datos de ${referencia}:`, error);
//       }
//     };

//     // Obtener texto e imagen por referencia para cada taller
//     obtenerTextoEImagenPorReferencia('taller1', setTextoTaller1, setImagenTaller1);
//     obtenerTextoEImagenPorReferencia('taller2', setTextoTaller2, setImagenTaller2);
//     obtenerTextoEImagenPorReferencia('taller3', setTextoTaller3, setImagenTaller3);
//     obtenerTextoEImagenPorReferencia('taller4', setTextoTaller4, setImagenTaller4);
//     obtenerTextoEImagenPorReferencia('taller5', setTextoTaller5, setImagenTaller5);
//     obtenerTextoEImagenPorReferencia('taller6', setTextoTaller6, setImagenTaller6);
//     obtenerTextoEImagenPorReferencia('Contacto_Talleres', setTextoTelefono);
//   }, []);

//   const titulo = 'Talleres Disponibles en Nuestras Instalaciones';

//   return (
//     <div>
//     <div className="row">
//     <div className="col-md-3 col-sm-6 col-xs-12">
//     <SideMenu />
// </div>
//         <div className="col-md-9 mt-5 d-flex flex-column align-items-center justify-content-center">   
//       <h1 className="titulo-taller  ">{titulo}</h1>
//       <div className="mt-4 p-5">
//         <div className="row row-cols-1 row-cols-md-4 g-4 align-items-center justify-content-center">
//           <div className="col taller">
//             <div className="img-taller h-100">
//               {imagenTaller1 && <img src={imagenTaller1} className="img-taller" alt="..." />}
//               <div className="card-body">
//                 <h5 className="card-title text-center">{textoTaller1}</h5>
//               </div>
//             </div>
//           </div>
//           <div className="col taller ">
//             <div className="img-taller h-100">
//               {imagenTaller2 && <img src={imagenTaller2} className="img-taller" alt="..." />}
//               <div className="card-body">
//                 <h5 className="card-title text-center">{textoTaller2}</h5>
//               </div>
//             </div>
//           </div>
//           <div className="col taller">
//             <div className="img-cont-taller h-100">
//               {imagenTaller3 && <img src={imagenTaller3} className="img-taller" alt="..." />}
//               <div className="card-body-taller">
//                 <h5 className="card-title text-center">{textoTaller3}</h5>
//               </div>
//             </div>
//           </div>
//           <div className="col taller">
//             <div className="img-cont-taller h-100">
//               {imagenTaller4 && <img src={imagenTaller4} className="img-taller" alt="..." />}
//               <div className="card-body-taller">
//                 <h4 className="card-title text-center">{textoTaller4}</h4>
//               </div>
//             </div>
//           </div>
//           <div className="col taller">
//             <div className="img-cont-taller h-100">
//               {imagenTaller5 && <img src={imagenTaller5} className="img-taller" alt="..." />}
//               <div className="card-body-taller">
//                 <h5 className="card-title text-center">{textoTaller5}</h5>
//               </div>
//             </div>
//           </div>
//           <div className="col taller">
//             <div className="img-cont-taller h-100">
//               {imagenTaller6 && <img src={imagenTaller6} className="img-taller" alt="..." />}
//               <div className="card-body-taller">
//                 <h5 className="card-title text-center">{textoTaller6}</h5>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-end rectangulo-llamado rounded">
//         <p className="llamado-titulo text-center">Inscribirse llamando al: {textoTelefono}</p>
//       </div>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default Talleres;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './talleres.css';
import axios from 'axios';
import SideMenu from '../sideMenu';

const Talleres = () => {
  const [textoTaller1, setTextoTaller1] = useState('');
  const [textoTaller2, setTextoTaller2] = useState('');
  const [textoTaller3, setTextoTaller3] = useState('');
  const [textoTaller4, setTextoTaller4] = useState('');
  const [textoTaller5, setTextoTaller5] = useState('');
  const [textoTaller6, setTextoTaller6] = useState('');
  const [textoTelefono, setTextoTelefono] = useState('');
  const [imagenTaller1, setImagenTaller1] = useState(null);
  const [imagenTaller2, setImagenTaller2] = useState(null);
  const [imagenTaller3, setImagenTaller3] = useState(null);
  const [imagenTaller4, setImagenTaller4] = useState(null);
  const [imagenTaller5, setImagenTaller5] = useState(null);
  const [imagenTaller6, setImagenTaller6] = useState(null);

  useEffect(() => {
    const obtenerTextoEImagenPorReferencia = async (referencia, setTexto, setImagen) => {
      try {
        const responseTexto = await axios.get(`http://localhost:3000/carga/${referencia}`);

        setTexto(responseTexto.data.texto);

        const responseImagen = await axios.get(`http://localhost:3000/imagenes/nombre/${referencia}`);
        console.log(responseImagen.data.url)
        if (responseImagen.data) {
          setImagen(responseImagen.data.url);
        }
      } catch (error) {
        console.error(`Error al obtener datos de ${referencia}:`, error);
      }
    };

    // Obtener texto e imagen por referencia para cada taller
    obtenerTextoEImagenPorReferencia('taller1', setTextoTaller1, setImagenTaller1);
    obtenerTextoEImagenPorReferencia('taller2', setTextoTaller2, setImagenTaller2);
    obtenerTextoEImagenPorReferencia('taller3', setTextoTaller3, setImagenTaller3);
    obtenerTextoEImagenPorReferencia('taller4', setTextoTaller4, setImagenTaller4);
    obtenerTextoEImagenPorReferencia('taller5', setTextoTaller5, setImagenTaller5);
    obtenerTextoEImagenPorReferencia('taller6', setTextoTaller6, setImagenTaller6);
    obtenerTextoEImagenPorReferencia('Contacto_Talleres', setTextoTelefono);
  }, []);

  const titulo = 'Talleres Disponibles en Nuestras Instalaciones';

  return (
    <div className="">
      <div className="row">
        <div className="col-md-3 col-sm-6 col-xs-12">
          <SideMenu />
        </div>

        <div className=" col-md-8 taller mt-5 text-center mx-auto ">
          <section id="team" class="pb-5 bordes">
            <div class="container ">
              <h1 class="section-title h1 ">{titulo}</h1>
              <div class="row ">

                <div class="col-xs-12 col-sm-6 col-md-4 ">
                  <div class="image-flip" >
                    <div class="mainflip flip-0">
                      <div class="frontside">
                        <div class="card ">
                          <div class="card-body text-center ">
                            <img
                              className="img-taller"
                              src={imagenTaller1}
                              alt="card image"
                            />                            <h4 class="card-title">{textoTaller1}</h4>
                            <a href="https://www.fiverr.com/share/qb8D02" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i></a>
                          </div>
                        </div>
                      </div>
                      <div class="backside">
                        <div class="card">
                          <div class="card-body text-center mt-4">
                            <h4 class="card-title">{textoTaller1}</h4>
                            <p class="card-text">Para mas informacion, dirijase a nuestro formulario de contacto.</p>
                            <ul class="list-inline">
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-facebook"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-twitter"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-skype"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-google"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xs-12 col-sm-6 col-md-4">
                  <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
                    <div class="mainflip">
                      <div class="frontside">
                        <div class="card">
                          <div class="card-body text-center">
                            <img
                              className="img-taller"
                              src={imagenTaller2}
                              alt="card image"
                            />                            <h4 class="card-title">{textoTaller2}</h4>
                            <a href="https://www.fiverr.com/share/qb8D02" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i></a>
                          </div>
                        </div>
                      </div>
                      <div class="backside">
                        <div class="card">
                          <div class="card-body text-center mt-4">
                            <h4 class="card-title">{textoTaller2}</h4>
                            <p class="card-text">Para mas informacion, dirijase a nuestro formulario de contacto.</p>
                            <ul class="list-inline">
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-facebook"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-twitter"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-skype"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-google"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xs-12 col-sm-6 col-md-4">
                  <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
                    <div class="mainflip">
                      <div class="frontside">
                        <div class="card">
                          <div class="card-body text-center">
                            <img
                              className="img-taller"
                              src={imagenTaller3}
                              alt="card image"
                            />                            <h4 class="card-title">{textoTaller3}</h4>
                            <a href="https://www.fiverr.com/share/qb8D02" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i></a>
                          </div>
                        </div>
                      </div>
                      <div class="backside">
                        <div class="card">
                          <div class="card-body text-center mt-4">
                            <h4 class="card-title">{textoTaller3}</h4>
                            <p class="card-text">Para mas informacion, dirijase a nuestro formulario de contacto.</p>
                            <ul class="list-inline">
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-facebook"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-twitter"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-skype"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-google"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xs-12 col-sm-6 col-md-4">
                  <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
                    <div class="mainflip">
                      <div class="frontside">
                        <div class="card">
                          <div class="card-body text-center">
                            <img
                              className="img-taller"
                              src={imagenTaller4}
                              alt="card image"
                            />                            <h4 class="card-title">{textoTaller4}</h4>
                            <a href="https://www.fiverr.com/share/qb8D02" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i></a>
                          </div>
                        </div>
                      </div>
                      <div class="backside">
                        <div class="card">
                          <div class="card-body text-center mt-4">
                            <h4 class="card-title">{textoTaller4}</h4>
                            <p class="card-text">Para mas informacion, dirijase a nuestro formulario de contacto.</p>
                            <ul class="list-inline">
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-facebook"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-twitter"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-skype"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-google"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xs-12 col-sm-6 col-md-4">
                  <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
                    <div class="mainflip">
                      <div class="frontside">
                        <div class="card">
                          <div class="card-body text-center">
                            <img
                              className="img-taller"
                              src={imagenTaller5}
                              alt="card image"
                            />                            <h4 class="card-title">{textoTaller5}</h4>
                            <a href="https://www.fiverr.com/share/qb8D02" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i></a>
                          </div>
                        </div>
                      </div>
                      <div class="backside">
                        <div class="card">
                          <div class="card-body text-center mt-4">
                            <h4 class="card-title">{textoTaller5}</h4>
                            <p class="card-text">Para mas informacion, dirijase a nuestro formulario de contacto.</p>
                            <ul class="list-inline">
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-facebook"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-twitter"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-skype"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-google"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xs-12 col-sm-6 col-md-4">
                  <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
                    <div class="mainflip">
                      <div class="frontside">
                        <div class="card">
                          <div class="card-body text-center ">
                            <img
                              className="img-taller"
                              src={imagenTaller6}
                              alt="card image"
                            />                            <h4 class="card-title">{textoTaller6}</h4>
                            <a href="https://www.fiverr.com/share/qb8D02" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i></a>
                          </div>
                        </div>
                      </div>
                      <div class="backside">
                        <div class="card">
                          <div class="card-body text-center mt-4">
                            <h4 class="card-title">{textoTaller6}</h4>
                            <p class="card-text">Para mas informacion, dirijase a nuestro formulario de contacto.</p>
                            <ul class="list-inline">
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-facebook"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-twitter"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-skype"></i>
                                </a>
                              </li>
                              <li class="list-inline-item">
                                <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                  <i class="fa fa-google"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

  );
};

export default Talleres;