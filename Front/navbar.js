import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">Navbar</a>
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
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Proyecto institucional</a>
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
              <a className="nav-link" href="/">Iniciar Sesion</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;