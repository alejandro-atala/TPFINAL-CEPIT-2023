import React from 'react';
import './beneficios.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Beneficios = () => {
  const titulos = ({
    principal: 'Los beneficios de estudiar en nuestro Instituto',
    secundario: 'Estudiar con nosotros es'
  });

  const beneficios = ([
    'Amplia variedad de programas de estudio',
    'Profesorado altamente calificado',
    'Instalaciones modernas y equipadas',
    'Oportunidades de networking'
  ]);


  return (
    <div className="container componente-beneficios">
        <h1 className="col align-self-start titulo-principal">{titulos.principal}</h1>
        <div className="row">
            <div className="contenido">
            <div className="col align-self-center cuadro-beneficios">
                <h2 className="titulo-secundario">{titulos.secundario}</h2>
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
