import React from 'react';
import './navbar.css';
import AvisosNotificationBadge from '../Alumno/notificacion';
import { useAlumno } from '../Alumno/AlumnoContext';
import { Link } from 'react-router-dom';

const Navbar = ({ loggedInUser, onLogout, userType }) => {
  const { alumnoLogueado } = useAlumno();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-pink">
      <div className="container">
        <Link to="/logo" className="navbar-brand">
          <img src="https://images4.imagebam.com/9c/af/6d/MENQMV5_o.png" alt="Logo" className="navbar-logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/proyectos" className="nav-link">Proyectos</Link>
            </li>
            <li className="nav-item">
              <Link to="/historial" className="nav-link">Historial</Link>
            </li>
            <li className="nav-item">
              <Link to="/reglamento" className="nav-link">Reglamentos</Link>
            </li>
            <li className="nav-item">
              <Link to="/contacto" className="nav-link">Contacto</Link>
            </li>
            {loggedInUser ? (
              <li className="nav-item">
                <span className="nav-link hola-usuario">Hola {loggedInUser}</span>
              </li>
            ) : null}
          </ul>
        </div>
          <div className="navbar-nav">
            <li className="nav-item sesion">
              {loggedInUser ? (
                <button className="nav-link sesion" onClick={onLogout}>Cerrar Sesión</button>
              ) : (
                <Link to="/iniciarSesion" className="nav-link sesion">Iniciar Sesión</Link>
              )}
            </li>
          </div>
      </div>
    </nav>
  );
}


export default Navbar;