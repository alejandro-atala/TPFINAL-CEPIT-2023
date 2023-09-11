import React, { useState, useEffect } from 'react';
import './inicioSesion.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAlumno } from '../Alumno/AlumnoContext';
import { useAuth } from './tokenContext';

import { Routes, Route } from 'react-router-dom';

const InicioSesion = ({ onLogin }) => {
  const {  setToken } = useAuth();
  const navigate = useNavigate();
  const { setAlumnoLogueado } = useAlumno();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [sessionExpired, setSessionExpired] = useState(false);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3000/usuario/login', formData);
      const newToken = response.data.token;
      setToken(newToken);

      onLogin(response.data.nombre);

      const idUsuario = response.data.id;

      if (response.data.nombre === 'Admin' && response.data.tipo === 'Profesor') {

        navigate('/admin');
      }
  
     else if (response.data.tipo === 'Alumno') {

        // Una vez que tengas el ID del usuario, realiza una solicitud GET para obtener el ID del alumno
        const resp = await axios.get(`http://localhost:3000/alumno/usuario/${idUsuario}`);
        const alumnoData = resp.data;

        if (alumnoData) {
          const idDelAlumno = alumnoData.idAlumno; // Suponiendo que el ID del alumno está en la primera entrada
          setAlumnoLogueado(idDelAlumno);
        }
        navigate('/alumno');

      } else if (response.data.tipo === 'Profesor') {
        navigate('/profesor');
      } else {
        navigate('/alumno');
      }
      
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setMessage('Error en el inicio de sesión. Verifica tus credenciales.');
    }
  };
  
  

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLogout = () => {
    setToken(null);
    navigate('/inicio-sesion');
  };

  return (
    <div className="container rounded text-center col-xs-12 col-md-4 col-sm-3 p-5 mt-4 bg-sesion">
      <div className="row align-items-center">
        <div className="">
          <h2 className="text-center">Iniciar sesión</h2>
          {message && <div className="alert alert-danger">{message}</div>}
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
          <div className="App">
            {sessionExpired && (
              <div className="session-expired-alert">
                Tu sesión ha expirado. Por favor, inicia sesión nuevamente.
              </div>
            )}
            <Routes>
              <Route path="/inicio-sesion" element={<InicioSesion />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InicioSesion;
