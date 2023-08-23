import React, { useState } from 'react';
import './inicioSesion.css';
import axios from 'axios'; // Importa la librería Axios

const InicioSesion = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Realiza la solicitud POST al controlador de NestJS para autenticar al usuario
      const response = await axios.post('http://localhost:3000/usuario/login', formData);
      
      // Maneja la respuesta del servidor aquí (puede redirigir a otra página)
      console.log('Inicio de sesión exitoso:', response.data);
      
      // Redirige a otra página después del inicio de sesión exitoso
      // Por ejemplo: window.location.href = '/dashboard';
    } catch (error) {
      // Maneja el error aquí (puede mostrar mensaje de error)
      console.error('Error en el inicio de sesión:', error);
    }
  };

  return (
    <div className="container rounded text-center col-xs-12  col-md-4 col-sm-3 p-5 mt-4 bg-sesion ">
      <div className="row align-items-center">
        <div className=" ">
          <h2 className="text-center">Iniciar sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" /> Recordarme
              </label>
            </div>
            <button type="submit" id="btn-iniciar" className="btn btn-primary btn-block">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InicioSesion;
