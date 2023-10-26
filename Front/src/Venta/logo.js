import React from 'react';
import './logo.css';
import { Link } from 'react-router-dom';


const Logo = () => {

    return (
        <div className="container text-center venta mt-5 contenido-venta">
            <div className="row">
                <div className="col align-self-center venta">
                    <h2 >
                        <img src="https://images4.imagebam.com/9c/af/6d/MENQMV5_o.png" alt="Logo" className="logo" />
                    </h2>
                    <h5 className='subtitulo-venta'> GRACIAS POR CONTRATAR NUESTRO SERVICIO </h5>
                    <div className='texto-venta'>
                        <div>
                        El desarrollo del Gestor de Escuelas Secundarias surgió en 2023, 
                        coincidiendo con la culminación de nuestro último año de Programación Full-Stack. 
                             <div>
                             Estamos extraordinariamente satisfechos por los notables logros alcanzados y profundamente
                              agradecidos por la confianza que han depositado en nuestro trabajo.
                                <div>
                                Si en algún momento surgen inquietudes o tienen sugerencias para mejorar,
                                 les invitamos a ponerse en contacto con nosotros. 
                                 Estamos comprometidos en perfeccionar continuamente 
                                nuestro producto y en brindarles la mejor experiencia posible.
                                </div>
                                </div> 

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Logo;