import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contacto.css';

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
    console.log(url);
    window.open(url, '_blank');
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
    <div className="d-flex align-items-center justify-content-center" >
      <div className="mt-5 flex-column text-center" style={{ maxWidth: '500px' }}>
        <div className="card card-custom">
          <div className="card-body">
            <h1 className="card-title">¡Contáctanos!</h1>
            <p className="card-text">
              ¿Necesita ayuda o tiene alguna pregunta? Déjenos sus datos y su consulta,
              y nos pondremos en contacto con usted lo antes posible.
            </p>
            {isSubmitted ? (
              <p>¡Gracias por contactarnos!</p>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="firstName">Nombre</label>
                  <p>
                    <input
                      className='contacto-input'
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Apellido</label>
                  <p>
                    <input
                      className='contacto-input'
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <p>
                    <input className='contacto-input'
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="consulta">Su Consulta</label>
                  <p>
                    <textarea
                      className='contacto-input-consulta'
                      type="consulta"
                      id="consulta"
                      value={consulta}
                      onChange={(e) => setConsulta(e.target.value)}
                      required
                    />
                  </p>
                </div>
                <button type="submit" className="btn-enviar">Enviar</button>
              </form>
            )}

            <p className="card-telefono"> Nuestro Teléfono:
              <div className='cel'>
                {telefono}</div> </p>

            <div className="redes-sociales">
              <button className="btn btn-custom mx-2" onClick={() => abrirURL(facebookURL)}>
                Facebook
              </button>

              <button className="btn btn-custom mx-2" onClick={() => abrirURL(instagramURL)}>
                Instagram
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Contacto;




