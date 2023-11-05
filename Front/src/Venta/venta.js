import React, { useState } from 'react';
import axios from 'axios';
import './venta.css'; // Importa el archivo CSS para estilizar
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Venta() {
  const [formData, setFormData] = useState({ email: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {

      const response = await axios.post(`http://localhost:3000/email/suscripcion`, formData);
      console.log('Solicitud POST exitosa', response.data);

      toast.success('Correo enviado con éxito', {
        position: 'bottom-right',
        autoClose: 3000, // La notificación se cierra automáticamente después de 3 segundos
      });


    } catch (error) {
      console.error('Error al enviar la solicitud POST', error);

      // Mostrar notificación de error
      toast.error('Error al enviar el correo', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    } finally {
      // Restablecer el estado de isLoading después de que la solicitud se haya completado
      setIsLoading(false);

    }
  };

  return (
    <div className="ventas-page">
      <div className="overlay">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <h1>Gestion Integral para Escuelas</h1>
              <p>El Sistema de Gestión Escolar para Escuelas Secundarias es una herramienta integral diseñada para simplificar y
                optimizar la administración y operación de una institución educativa de nivel secundario. Este sistema proporciona a
                directores, maestros, personal administrativo, y estudiantes las herramientas necesarias para llevar a cabo una
                gestión eficiente de la escuela y mejorar la experiencia educativa en su conjunto.</p>
              <br></br>
              <p>Para mas informacion suscribase y un representante le ayudará</p>
              <br></br>    <br></br>
              <p>VSA Desarrollos</p>
            </div>
        
            <div className="col-md-6 carousel mx-auto">
  <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src='https://res.cloudinary.com/difggjfxn/image/upload/v1699192751/imagenes/5ebdc2f576807f9cab3d9c45d6ff59cd.png' className="img-fluid d-block w-100" alt="Slide 1" />
        <div className="carousel-caption d-none d-md-block text-black">
        </div>
      </div>

      <div className="carousel-item">
        <img src='https://res.cloudinary.com/difggjfxn/image/upload/v1699192935/imagenes/d11cfadfeffd62a3c74549cabd352b0f.png' className="img-fluid d-block w-100" alt="Slide 2" />
        <div className="carousel-caption d-none d-md-block text-black">
        </div>
      </div>

      <div className="carousel-item">
        <img src='https://res.cloudinary.com/difggjfxn/image/upload/v1699193170/imagenes/3d76187ed568c79a40803bd263bc9f01.png' className="img-fluid d-block w-100" alt="Slide 3" />
        <div className="carousel-caption d-none d-md-block text-black">
 
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
</div>

<div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label ">Email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>


                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? (
                    <div className="loader"></div> // Elemento de carga
                  ) : (
                    'Suscribirse'
                  )}
                </button>

              </form>

              
            </div>

          </div>
        </div>
      </div>
 
           
      <ToastContainer />
    </div>
  );
}

export default Venta;
