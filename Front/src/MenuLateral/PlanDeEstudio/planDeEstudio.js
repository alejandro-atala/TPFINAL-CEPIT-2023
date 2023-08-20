import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './planDeEstudios.css'; 

const PlanDeEstudios = () => {
  const materiasPorAnio = {
    '1° AÑO': ['Materia 1', 'Materia 2', 'Materia 3'],
    '2° AÑO': ['Materia 4', 'Materia 5', 'Materia 6'],
    '3° AÑO': ['Materia 7', 'Materia 8', 'Materia 9'],
    '4° AÑO': ['Materia 1', 'Materia 2', 'Materia 3'],
    '5° AÑO': ['Materia 4', 'Materia 5', 'Materia 6'],
    '6° AÑO': ['Materia 7', 'Materia 8', 'Materia 9'],
  };
  
 return(
  <div className="container plan-de-estudios">
    <h1>Plan de Estudio Por Año</h1>
        <div className="row">
          {Object.keys(materiasPorAnio).map((year, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="anio p-3 border shadow">
                <h2>{year}</h2>
                <div className="materias">
                  {materiasPorAnio[year].map((materia, subIndex) => (
                    <div key={subIndex} className="materia">
                      {materia}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
 )   
  };
  
export default PlanDeEstudios;
