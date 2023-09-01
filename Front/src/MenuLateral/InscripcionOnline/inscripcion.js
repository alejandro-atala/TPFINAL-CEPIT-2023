import React, { useState } from 'react';
import './inscripcion.css';
import axios from 'axios'; // Importa la librería Axios
import { useNavigate } from 'react-router-dom';

const Inscripcion = () => {
  const navigate = useNavigate(); // Acceso a la función de navegación
  const [formData, setFormData] = useState({

    nombre: '',
    dni: '',
    fechaNac: '',
    direccion: '',
    telefono: '',
    email: '',
    password: '',
    tipo: '',
    curso: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita la recarga de la página al enviar el formulario
    console.log(formData)
    try {
      // Realiza la solicitud POST al controlador de NestJS
      const response = await axios.post('http://localhost:3000/usuario', formData);
      console.log('Registro exitoso:', response.data);
      setSuccessMessage('Registro exitoso. ¡Bienvenido! ');
      setErrorMessage('');
     // Agregar un retraso de 2 segundos antes de redirigir
     setTimeout(() => {
      navigate('/iniciarSesion');
    }, 3000);
    } catch (error) {
      console.error('Error en el registro:', error);
      setErrorMessage('Error en el registro. Inténtelo nuevamente.');
      setSuccessMessage('');
    }
  };
  
  const handleChange = (event) => {
    const { id, checked } = event.target;
  
    if (formData.tipo === "Profesor") {
      // Manejar las casillas de verificación solo si el usuario es un profesor
      let cursosSeleccionados = [...formData.curso];
  
      if (checked) {
        // Si se marca el checkbox, agregar el curso seleccionado al array
        cursosSeleccionados.push(id);
      } else {
        // Si se desmarca el checkbox, quitar el curso del array
        cursosSeleccionados = cursosSeleccionados.filter((curso) => curso !== id);
      }
  
      setFormData({
        ...formData,
        curso: cursosSeleccionados
      });
    } else {
      setFormData({
        ...formData,
        [id]: event.target.value
      });
    }
  };
  
  return (
    <div>
      <div className="container rounded  mt-4 text-center col-md-4 col-xs-12 col-sm-3 p-5 bg-registro ">
        <div className="row align-items-center ">
          <div className="col ">
            <h2 className="text-center">Registro de usuario</h2>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form>
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
                <input
                  type="date"
                  className="form-control"
                  id="fechaNac" // Cambia el ID a "fechaNac"
                  value={formData.fechaNac}
                  onChange={handleChange} // Cambia el manejador de cambios a handleChangeFecha
                />
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
              <div>
                <div className="form-group">
                  <label htmlFor="tipo" className="form-label">
                    Elija usuario
                  </label>
                  <select id="tipo" className="form-select" value={formData.tipo} onChange={handleChange}>
                    <option value="">Elija usuario</option>
                    <option value="Alumno">Alumno</option>
                    <option value="Profesor">Profesor</option>
                  </select>
                </div>
                {formData.tipo === "Alumno" && (
                  <div className="form-group">
                    <label htmlFor="inputState" className="form-label">
                      Curso
                    </label>
                    <select id="curso" className="form-select" value={formData.curso} onChange={handleChange}>
                      <option defaultValue>Elija usuario</option>
                      <option value={1}>Primero</option>
                      <option value={2}>Segundo</option>
                      <option value={3}>Tercero</option>
                      <option value={4}>Cuarto</option>
                      <option value={5}>Quinto</option>
                      <option value={6}>Sexto</option>
                    </select>
                  </div>
                )}
                {formData.tipo === "Profesor" && (
                  <div className="form-group">
                    <label htmlFor="cursos" className="form-label">
                      Cursos
                    </label>
                    <div>
                      <input type="checkbox" id="1" value="Primero" checked={formData.curso.includes("1")} onChange={handleChange} />
                      <label htmlFor="1">Primero</label>
                    </div>
                    <div>
                      <input type="checkbox" id="2" value="Segundo" checked={formData.curso.includes("2")} onChange={handleChange} />
                      <label htmlFor="2">Segundo</label>
                    </div>
                    <div>
                      <input type="checkbox" id="3" value="Tercero" checked={formData.curso.includes("3")} onChange={handleChange} />
                      <label htmlFor="3">Tercero</label>
                    </div>
                    <div>
                      <input type="checkbox" id="4" value="Cuarto" checked={formData.curso.includes("4")} onChange={handleChange} />
                      <label htmlFor="4">Cuarto</label>
                    </div>
                    <div>
                      <input type="checkbox" id="5" value="Quinto" checked={formData.curso.includes("5")} onChange={handleChange} />
                      <label htmlFor="5">Quinto</label>
                    </div>
                    <div>
                      <input type="checkbox" id="6" value="Sexto" checked={formData.curso.includes("6")} onChange={handleChange} />
                      <label htmlFor="6">Sexto</label>
                    </div>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary m-4"
                id="registrarse"
                onClick={handleSubmit} // Cambio aquí: ejecuta handleSubmit al hacer clic en el botón
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

