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
        <div>
            <h1 className="text-center mt-5">{titulo}</h1>
            <div className="container mt-4 p-5">

                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <div className="card h-100">
                            <img src={pintura} className="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title text-center">Taller de Pintura</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col ">
                        <div class="card h-100">
                            <img src={gym} className="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title text-center">Gimnasia Para Adultos</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col ">
                        <div class="card h-100">
                            <img src={deporte} className="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title text-center">Deportes Para Jovenes</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col ">
                        <div class="card h-100">
                            <img src={ceramica} className="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title text-center">Cerámica</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col ">
                        <div class="card h-100">
                            <img src={crochet} className="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title text-center">Crochet</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col ">
                        <div class="card h-100">
                            <img src={escritura} className="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title text-center">Escritura</h5>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="container col-end rectangulo-llamado rounded">
                <p className="llamado-titulo text-center">Inscribete llamando al: 123456</p>
            </div>
        </div>
    );
};

export default Talleres;
