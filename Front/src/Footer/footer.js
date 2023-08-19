import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './footer.css'; // Importa tu archivo CSS personalizado

const Footer = () => {
  return (
    <footer className="bg-light py-4">
      <div className="container">
        <div className="social-icons text-center"> {/* Asegúrate de usar la clase social-icons */}
          <a href="#">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
        <p className="text-center mb-0">
          Todos los derechos reservados &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
