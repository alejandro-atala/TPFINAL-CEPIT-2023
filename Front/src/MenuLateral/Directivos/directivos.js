import React from 'react';
import './directivos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import directora from '../../ImagenesDescargadas/A.jpg';
import secretaria from '../../ImagenesDescargadas/AA.jpg';
import representante from '../../ImagenesDescargadas/AAAA.jpg';

const Directivos = () => {
  const titulo = ('Nuestros Directivos');

  return (
    <div className="container component-directivos mt-4">
      <h1>{titulo}</h1>
      <div className="row ">
        <div className="col-md-8 ">
          <div className="directivos ">
             <div className="cuadro-imagen ">
                <img src={directora} alt="foto de la directora" />
             </div>
             <h3>Sonia Perez</h3>
             <h5>Directora de La Instituion</h5>
             <div className="cuadro-imagen">
                <img src={secretaria} alt="foto de la secretaria" />
             </div>
             <h3>Jorgelina Rodriguez</h3>
             <h5>Secretaria de La Instituion</h5>
             <div className="cuadro-imagen">
                <img src={representante} alt="foto del representatnte" />
            </div>   
             <h3>Lucas Garcia</h3>
             <h5>Representante Legal de La Instituion</h5>
          </div>
         </div> 
     </div>
    </div>
  );
};

export default Directivos;
