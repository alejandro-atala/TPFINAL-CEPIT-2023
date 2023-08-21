
import React, { useState } from 'react';
import './inscripcion.css';
import axios from 'axios'; // Importa la librería Axios

const Inscripcion = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    fecha: '',
    direccion: '',
    telefono: '',
    email: '',
    password: '',
    tipoUsuario: 'Elija usuario',
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
      // Realiza la solicitud POST al controlador de NestJS
      const response = await axios.post('/api/registro', formData);

      // Maneja la respuesta del servidor aquí (puede mostrar mensaje de éxito)
      console.log('Registro exitoso:', response.data);
    } catch (error) {
      // Maneja el error aquí (puede mostrar mensaje de error)
      console.error('Error en el registro:', error);
    }
  };
  return (
    <div>
      <div className="container rounded  mt-4 text-center col-md-4 col-xs-12 col-sm-3 p-5 bg-registro ">
        <div className="row align-items-center ">
          <div className="col ">
            <h2 className="text-center">Registro de usuario</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre completo:</label>
                <input type="text" className="form-control" id="nombre" value={formData.nombre} 
                  onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="dni">DNI:</label>
                <input
                  type="number"
                  className="form-control"
                  id="dni"
                  placeholder="Ingresar DNI sin puntos"
                  value={formData.dni}  // Agrega el atributo value
                  onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="fecha">Fecha de nacimiento:</label>
                <input type="date" className="form-control" id="fecha" value={formData.fecha}  
                  onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="direccion">Direccion:</label>
                <input type="text" className="form-control" id="direccion" value={formData.direccion}  
                  onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Telefono:</label>
                <input type="number" className="form-control" id="telefono" value={formData.telefono}  
                  onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo electrónico:</label>
                <input type="email" className="form-control" id="email" value={formData.email}  
                  onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña:</label>
                <input type="password" className="form-control" id="password" value={formData.password}  
                  onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="inputState" className="form-label">
                  Tipo de usuario
                </label>
                <select id="inputState" className="form-select">
                  <option defaultValue>Elija usuario</option>
                  <option>Alumno</option>
                  <option>Profesor</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-primary m-4"
                id="registrarse"
              >
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Inscripcion;
