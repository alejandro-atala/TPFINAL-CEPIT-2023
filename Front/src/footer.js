import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light py-4">
      <div className="container">
        <p className="text-center mb-0">
          Todos los derechos reservados &copy; {new Date().getFullYear()}
        </p>
        <ul className="list-inline text-center mt-2">
          <li className="list-inline-item">
            <a href="/">Inicio</a>
          </li>
          <li className="list-inline-item">
            <a href="/">Acerca de</a>
          </li>
          <li className="list-inline-item">
            <a href="/">Contacto</a>
          </li>
          <li className="list-inline-item">
            <a href="/">Términos y condiciones</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
