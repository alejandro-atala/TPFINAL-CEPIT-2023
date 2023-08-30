import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import escuela1 from '../ImagenesDescargadas/ESCUELA2.jpg';
import escuela2 from '../ImagenesDescargadas/ESCUELA.jpg';
import escuela3 from '../ImagenesDescargadas/ESCUELA3.jpg';
import './home.css'


const HomePage = () => {

  return (
    <div>
    <h1>Instituto Secundario NN</h1>
    <div className="container plan-de-estudios mt-5">
      <div className="row">
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={escuela1} className="imgnormalizada d-block w-100" alt="foto de escuela" />
              <div className="carousel-caption d-none d-md-block text-black">
              </div>
            </div>
            <div className="carousel-item">
              <img src={escuela2} className="imgnormalizada d-block w-100" alt="foto de escuela" />
              <div className="carousel-caption d-none d-md-block">  
              </div>
            </div>
            <div className="carousel-item">
              <img src={escuela3} className="imgnormalizada d-block w-100" alt="foto de escuela" />
              <div className="carousel-caption d-none d-md-block">
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <h2>Estudia en nuestro Instituto</h2>
        <p>¡Descubre un mundo de aprendizaje emocionante en nuestra escuela secundaria!
           En nuestro campus, la curiosidad se convierte en conocimiento y las amistades perduran 
           para toda la vida. Con un equipo de educadores apasionados y programas educativos de vanguardia,
            estamos comprometidos a nutrir tus habilidades y potencial al máximo. 
            Desde laboratorios científicos hasta actividades artísticas, 
            deportes en equipo hasta proyectos comunitarios, encontrarás infinitas oportunidades 
            para crecer y brillar. Únete a nuestra familia escolar y prepárate
             para un emocionante viaje hacia el éxito académico y personal.
              Tu futuro comienza aquí, en Nuestro Instituto. 
              ¡Inscribe hoy y haz tus sueños realidad con nosotros!</p>
      </div>
    </div>
    </div>
  );
};

export default HomePage;
