import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 

const HomePage = () => {
  return (
    <div>
      <div className="container col-sm-6 mt-5">
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="imagenes/esc1.jpg" className="imgnormalizada d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block text-black">
                <h2>Estudia en nuestro instituto</h2>
                <p>Podrás elegir la carrera que más te guste.</p>
              </div>
            </div>
            {/* ... Otras diapositivas del carrusel */}
          </div>
          {/* ... Botones de control para el carrusel */}
        </div>
      </div>

      <div className="container p-5">
        <div className="card-group">
          <div className="card m-2">
            <img src="imagenes/abanderados.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
            </div>
          </div>
          {/* ... Otras tarjetas */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
