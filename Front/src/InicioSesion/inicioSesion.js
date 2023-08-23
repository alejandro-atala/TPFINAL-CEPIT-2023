import React, { useState } from 'react';
import './inicioSesion.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InicioSesion = () => {
  const navigate = useNavigate(); // Acceso a la función de navegación


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
      const response = await axios.post('http://localhost:3000/usuario/login', formData);
  
      console.log('Inicio de sesión exitoso:', response.data);
  
      // Redirigir a la ruta correcta según el tipo de usuario
      if (response.data === 'Alumno') {
        navigate('/alumno');
      } else if (response.data === 'Profesor') {
        navigate('/profesor');
      }
    } catch (error) {
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
