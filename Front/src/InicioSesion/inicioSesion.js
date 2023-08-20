import React from 'react';
import './inicioSesion.css';

const InicioSesion = () => {
  return (
    <div className="container rounded text-center col-xs-12 col-sm-3 p-5 mt-4 bg-sesion ">
      <div className="row align-items-center">
        <div className=" ">
          <h2 className="text-center">Iniciar sesión</h2>
          <form>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico:</label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input type="password" className="form-control" id="password" />
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" /> Recordarme
              </label>
            </div>
            <button type="submit" id="btn-iniciar" className="btn btn-primary btn-block">
              Iniciar sesión
            </button>
            {/* <a href="registro.html" className="btn btn-default m-4">Registrarse</a> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default InicioSesion;
