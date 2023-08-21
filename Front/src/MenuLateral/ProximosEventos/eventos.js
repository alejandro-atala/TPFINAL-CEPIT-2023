import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './eventos.css';

const ProximosEventos = () => {
  const titulo = ('Eventos del Instituto')  
  const eventoData = {
  'Actos' : ['24 de Marzo: Día Nacional de la Meoria y la Justicia. Acto Jueves 23, 15:00hs en el ZOOM de la escuela', 
  'Acto 2'], 
  'Eventos' : ['Muestra "Somos Escritores"', 
  'Salen a la Venta nuestra nueva rifa a solo $100, vendedores alumnos de 6° año']
} ;
 

  return (
    <div className="container proximos-eventos mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">  
         <h1>{titulo}</h1>
        </div>
       </div> 
      <div className="row  justify-content-center">
        {Object.keys(eventoData).map((evento, index) => (
          <div key={index} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="card-title">{evento}</h2>
                <div className="evento">
                  {eventoData[evento].map((acto, subIndex) => (
                    <div key={subIndex} className="card-text">
                      <h5>{acto}</h5> 
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProximosEventos;
