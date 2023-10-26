import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './footer.css'; // Importa tu archivo CSS personalizado

const Footer = () => {
  return (
    <footer className="py-4 bg">
      <div className="container-footer ">
        <div className="social-icons-container ">
          <div className="social-icons text-center ">
            <a href="#">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </div>
        </div>
        <p className="text-center mb-0">
          Todos los derechos reservados &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;