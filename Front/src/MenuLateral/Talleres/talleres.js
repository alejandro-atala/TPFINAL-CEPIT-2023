import React from 'react';
import './talleres.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import pintura from '../../ImagenesDescargadas/tallerPintura.jpg';
import escritura from '../../ImagenesDescargadas/tallerEscritura.jpg';
import gym from '../../ImagenesDescargadas/gymAdultos.jpg';
import crochet from '../../ImagenesDescargadas/tallerCrochet.jpg';
import ceramica from '../../ImagenesDescargadas/tallerCeramica.jpg';
import deporte from '../../ImagenesDescargadas/handball.jpg';

const Talleres = () => {
  const titulo = ('Talleres disponibles en nuestras instalaciones');

  return (
    <div class="container mt-4 p-5">
    <h1>{titulo}</h1>    
        <div class="row row-cols-1 row-cols-md-3 g-4 ">
            <div class="col ">
            <div class="card h-100">
            <img src={pintura} className="card-img-top" alt="..." />
                <div class="card-body">
                <h5 class="card-title">Taller de Pintura</h5>
                </div>
            </div>
            </div>
            <div class="col ">
            <div class="card h-100">
            <img src={gym} className="card-img-top" alt="..." />
                <div class="card-body">
                <h5 class="card-title">Gimnasia Para Adultos</h5>
                </div>
            </div>
            </div>
            <div class="col ">
            <div class="card h-100">
            <img src={deporte} className="card-img-top" alt="..." />
                <div class="card-body">
                <h5 class="card-title">Deportes Para Jovenes</h5>
                </div>
            </div>
            </div>
            <div class="col ">
            <div class="card h-100">
            <img src={ceramica} className="card-img-top" alt="..." />
                <div class="card-body">
                <h5 class="card-title">Cerámica</h5>
                </div>
            </div>
            </div>
            <div class="col ">
            <div class="card h-100">
            <img src={crochet} className="card-img-top" alt="..." />
                <div class="card-body">
                <h5 class="card-title">Crochet</h5>
                </div>
            </div>
            </div>
            <div class="col ">
            <div class="card h-100">
            <img src={escritura} className="card-img-top" alt="..." />
                <div class="card-body">
                <h5 class="card-title">Escritura</h5>
                </div>
            </div>
            </div>
        </div>
            <div className="col-end rectangulo-llamado" style={{ backgroundColor: '#833075', opacity: '0.5' }}>
                <p className="llamado-titulo">Inscríbete llamando al: 123456</p>
            </div>
    </div>
  );
};

export default Talleres;
