import React from 'react';
import './navbar.css';
import { useUsuario } from '../usuarioContext';
import { Link, useNavigate } from 'react-router-dom'; // Importa useHistory

const Navbar = ({ loggedInUser, onLogout, userType }) => {
  const { usuarioLogueado } = useUsuario();
  const navigate = useNavigate(); // Obtiene el objeto de historial




  const handleHelloUserClick = () => {
    if (usuarioLogueado.tipo === 'Alumno') {
      // Si es un alumno, redirige a la página de alumno
      navigate('/alumno');
    } else if (usuarioLogueado.tipo === 'Profesor' && usuarioLogueado.nombre !== 'Admin') {
      // Si es un profesor, redirige a la página de profesor
      navigate('/profesor');
    }else if (usuarioLogueado.nombre === 'Admin') {
      // Si es un profesor, redirige a la página de profesor
    window.location.reload();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-pink">
      <Link to="/logo" className="navbar-brand">
        <img
          src="https://images4.imagebam.com/9c/af/6d/MENQMV5_o.png"
          alt="Logo"
          className="navbar-logo"
        />
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
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/proyectos" className="nav-link">
              Proyectos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/historial" className="nav-link">
              Historial
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/reglamento" className="nav-link">
              Reglamentos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contacto" className="nav-link">
              Contacto
            </Link>
          </li>
        </ul>
        {loggedInUser ? (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
            <span
            className="nav-link hola-usuario"
            onClick={handleHelloUserClick} // Manejar clic en "Hola Usuario"
            style={{ cursor: 'pointer' }} // Cambiar el cursor para indicar que es un enlace
          >
            Hola {loggedInUser}
          </span>
            </li>
            <li className="nav-item">
              <button className="nav-link sesion" onClick={onLogout}>
                Cerrar Sesión
              </button>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/iniciarSesion" className="nav-link sesion">
                Iniciar Sesión
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;