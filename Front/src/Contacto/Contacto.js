import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './Contacto.css';
import { ToastContainer, toast } from 'react-toastify';

const Contacto = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [telefono, setTelefono] = useState('');
  const [facebookURL, setFacebookURL] = useState('');
  const [instagramURL, setInstagramURL] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [consulta, setConsulta] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);


  useEffect(() => {
    const cargarDatosPorReferencia = async (referencia, setDato) => {
      try {
        const response = await axios.get(`http://localhost:3000/carga/${referencia}`);
        setDato(response.data.texto);
      } catch (error) {
        console.error(`Error al cargar los datos de ${referencia}:`, error);
      }
    };

    cargarDatosPorReferencia('Contacto_General', setTelefono);
    cargarDatosPorReferencia('Facebook', setFacebookURL);
    cargarDatosPorReferencia('Instagram', setInstagramURL);
  }, []);

  const abrirURL = (url) => {
    // Comprobar si la URL no está vacía
    if (url) {
      // Agregar el protocolo "https://" si no está presente en la URL
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }
      // Abrir la URL en una nueva ventana o pestaña
      window.open(url, '_blank');
    } else {
      // Mostrar un mensaje de error si la URL está vacía
      toast.error('URL no válida', {
        position: 'bottom-right',
        autoClose: 3000,
      });
    }
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = {
        firstName: firstName,
        lastName: lastName,
        consulta: consulta,
        email: email,
      };
      console.log(formData);
      const response = await axios.post(`http://localhost:3000/email/contacto`, formData);
      console.log('Solicitud POST exitosa', response.data);

      toast.success('Correo enviado con éxito', {
        position: 'bottom-right',
        autoClose: 3000, // La notificación se cierra automáticamente después de 3 segundos
      });

      setFirstName('');
      setLastName('');
      setEmail('');
      setConsulta('');

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
    <div className="container contact">
      <div className="row">
        <div className="col-md-3 col-md-3-contact">
          <div className="contact-info">
            <img src="https://image.ibb.co/kUASdV/contact-image.png" alt="image"/>
            <h2 className='titulo-contacto'>¡Contáctanos!</h2>
            <h4>¿Necesita ayuda o tiene alguna pregunta? Déjenos sus datos y su consulta,
              y nos pondremos en contacto con usted lo antes posible.</h4>
          </div>
        </div>
        <div className="col-md-9 col-md-9-contacto">
          <div className="contact-form ">
            <div className="form-group ">
              <label className="control-label col-sm-2" htmlFor="firstName">Nombre</label>
              <div className="col-sm-10">
                <input
                  className='contacto-input'
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="lastName">Apellido</label>
              <div className="col-sm-10">
                <input
                  className='contacto-input'
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="email">Correo Electrónico</label>
              <div className="col-sm-10">
                <input
                  className='contacto-input'
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="consulta">Su Consulta</label>
              <div className="col-sm-10">
                <textarea
                  className='contacto-input-consulta'
                  id="consulta"
                  value={consulta}
                  onChange={(e) => setConsulta(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-sm-offset-2 col-sm-10">
    <button type="submit" className="btn-contacto" onClick={handleSubmit} disabled={isLoading} style={{ position: 'relative' }}>
      Enviar
      {isLoading && (
        <div id="circle" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '110%', marginLeft: '5px' }}>
          <div className="loading"></div>
        </div>
      )}
    </button>
  </div>
          </div>
          <p className="card-telefono text-center"> Nuestro Teléfono: {telefono}</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contacto;