import React from 'react';
import './beneficios.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Beneficios = () => {
  const titulos = ('Estudiar con nosotros es');

  const beneficios = ([
    'Amplia variedad de programas de estudio',
    'Profesorado altamente calificado',
    'Instalaciones modernas y equipadas',
    'Oportunidades de networking'
  ]);


  return (
    <div className="container componente-beneficios mt-5 contenido">
        <div className="row">
            <div className="">
            <div className="col align-self-center cuadro-beneficios">
                <h2 className="titulo">{titulos}</h2>
                <ul className="list-unstyled lista-beneficios">
                {beneficios.map((beneficio, index) => (
                    <li key={index} className="beneficio">
                        {beneficio}
                    </li>
                ))}
                </ul>
            </div>
            </div>
        </div>
    </div>
  );
};

export default Beneficios;
