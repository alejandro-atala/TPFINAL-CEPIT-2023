import React from 'react';
import './navbar.css'; // Importa tu archivo CSS personalizado

import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-pink">
      <div className="container justify-content-center text-center"> {/* Centrar */}
        <Link className="navbar-brand" to="/">
          <img src="https://images4.imagebam.com/9c/af/6d/MENQMV5_o.png" alt="Logo" className="navbar-logo" />
          Home
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
              <a className="nav-link" href="/">Proyecto Institucional</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Historial</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Estatuto y Reglamento</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Contacto</a>
            </li>
            <li className="nav-item">
              <Link to="/Registro" className="nav-link">Iniciar Sesion</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;