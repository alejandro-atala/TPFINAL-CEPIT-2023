import React from 'react';
import './registro.css'; // Verifica la ruta de la importación


const RegistrationForm = () => {
  return (
    <div className="container rounded  mt-4 text-center col-md-4 col-xs-12 col-sm-3 p-5 bg-registro ">
      <div className="row align-items-center ">
        <div className="col ">
          <h2 className="text-center">Registro de usuario</h2>
          <form>
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo:</label>
              <input type="text" className="form-control" id="nombre" />
            </div>
            <div className="form-group">
              <label htmlFor="dni">DNI:</label>
              <input
                type="number"
                className="form-control"
                id="dni"
                placeholder="Ingresar DNI sin puntos"
              />
            </div>
            <div className="form-group">
              <label htmlFor="fecha">Fecha de nacimiento:</label>
              <input type="date" className="form-control" id="fecha" />
            </div>
            <div className="form-group">
              <label htmlFor="direccion">Direccion:</label>
              <input type="text" className="form-control" id="direccion" />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Telefono:</label>
              <input type="number" className="form-control" id="telefono" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico:</label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input type="password" className="form-control" id="password" />
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
  );
};

export default RegistrationForm;
