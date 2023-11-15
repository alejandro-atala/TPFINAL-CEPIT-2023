import React, { useState } from 'react';
import './inscripcion.css';
import axios from 'axios'; // Importa la librería Axios
import { useNavigate } from 'react-router-dom';
import SideMenu from '../sideMenu';

const Inscripcion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    fechaNac: '',
    direccion: '',
    telefono: '',
    email: '',
    password: '',
    tipo: '',
    curso: '', // Almacenaremos los cursos seleccionados como una cadena de números o un array
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState([]);
  const [isProfessor, setIsProfessor] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]); // Ahora es un array de números

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'tipo') {
      setIsProfessor(value === 'Profesor');
    }

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
console.log(id, value);
    if (id === 'password' && value.length < 8) {
      setErrorMessage(['La contraseña debe tener al menos 8 caracteres.']);
    } else {
      setErrorMessage([]);
    }
  };

  const handleCourseChange = (course) => {
    const updatedCourses = [...selectedCourses];
    if (updatedCourses.includes(course)) {
      // If the course is already selected, remove it
      updatedCourses.splice(updatedCourses.indexOf(course), 1);
    } else {
      // If the course is not selected, add it
      updatedCourses.push(course);
    }
    setSelectedCourses(updatedCourses);
    // Update formData.curso with the selected courses separated by commas
    setFormData((prevData) => ({
      ...prevData,
      curso: updatedCourses.join(','),
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['nombre', 'dni', 'fechaNac', 'direccion', 'telefono', 'email', 'password', 'tipo'];
    const isFormValid = requiredFields.every((field) => formData[field].trim() !== '');

    if (!isFormValid) {
      setErrorMessage(['Por favor, complete todos los campos.']);
      setSuccessMessage('');
      return;
    }

    const selectedDate = new Date(formData.fechaNac);
    const currentDate = new Date();
  
    if (selectedDate > currentDate) {
      setErrorMessage(['La fecha de nacimiento no puede ser en el futuro.']);
      setSuccessMessage('');
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage(['La contraseña debe tener al menos 8 caracteres.']);
      setSuccessMessage('');
      return;
    }

    try {
      console.log(formData)
      const response = await axios.post('https://app-2361a359-07df-48b8-acfd-5fb4c0536ce2.cleverapps.io/solicitudes', formData);
      console.log('Registro exitoso:', response.data);
      setSuccessMessage('Procesando su solicitud. Recibira un email a la brevedad.');
      setErrorMessage([]);

      setTimeout(() => {
        navigate('/iniciarSesion');
      }, 5000);
    } catch (error) {
      console.error('Error en el registro:', error);
      setErrorMessage(['Error en el registro. Inténtelo nuevamente.']);
      setSuccessMessage('');
    }
  };


  return (
    <div className="side">

    <div className="row ">
    <div className="col-md-3 col-sm-6 col-xs-12 d-none d-sm-block">
    <SideMenu />
</div>
        <div className="col-md-9 mt-5 d-flex justify-content-center align-items-center ">
          <div className="container-inscripcion rounded text-center p-5 ">
            <h2 className=" text-center">Registro de usuario</h2>

            <form>
              <div className="form-group">
                <label htmlFor="nombre">Nombre completo:</label>
                <input type="text" className="form-control" id="nombre" value={formData.nombre} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="dni">DNI:</label>
                <input
                  type="number"
                  className="form-control"
                  id="dni"
                  placeholder="Ingresar DNI sin puntos"
                  value={formData.dni}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fecha">Fecha de nacimiento:</label>
                <input
                  type="date"
                  className="form-control"
                  id="fechaNac"
                  value={formData.fechaNac}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="direccion">Direccion:</label>
                <input type="text" className="form-control" id="direccion" value={formData.direccion} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Telefono:</label>
                <input type="number" className="form-control" id="telefono" value={formData.telefono} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo electrónico:</label>
                <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña:</label>
                <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="inputState" className="form-label">
                  Tipo de usuario
                </label>
                <select id="tipo" className="form-select" value={formData.tipo} onChange={handleChange}>
                  <option defaultValue>Elija usuario</option>
                  <option>Alumno</option>
                  <option>Profesor</option>
                </select>
              </div>

              {isProfessor ? (
                <div className="form-group">
                  <label>Asigne cursos:</label>
                  {[1, 2,3, 4, 5, 6].map((course, index) => (
                    <div key={index} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`curso${course}`}
                        checked={selectedCourses.includes(course)}
                        onChange={() => handleCourseChange(course)}
                      />
                      <label className="form-check-label" htmlFor={`curso${course}`}>
                        {` ${course}`}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="form-group">
                  <label htmlFor="curso">Curso:</label>
                  <select id="curso" className="form-select" value={formData.curso} onChange={handleChange}>
                    <option defaultValue>Elija un curso</option>
                    <option value="1">Primero</option>
                    <option value="2">Segundo</option>
                    <option value="3">Tercero</option>
                    <option value="4">Cuarto</option>
                    <option value="5">Quinto</option>
                    <option value="6">Sexto</option>
                  </select>
                </div>
              )}

              <button type="submit" className="btn-registro mt-5 m-4" id="registrarse" onClick={handleSubmit}>
                Registrarse
              </button>
              {successMessage && <div className="alert alert-warning">{successMessage}</div>}
              {errorMessage.map((message, index) => (
                <div key={index} className="alert alert-danger">
                  {message}
                </div>
              ))}
            </form>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default Inscripcion;
