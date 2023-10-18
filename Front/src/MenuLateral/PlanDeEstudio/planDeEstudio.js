import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './planDeEstudios.css';
import axios from 'axios';

const PlanDeEstudios = () => {
  const [materiasPorCurso, setMateriasPorCurso] = useState({});

  useEffect(() => {
    const obtenerMateriasPorId = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3000/materias-curso/${id}`);
        const materias = response.data.map((row) => row.materia);
        return materias;
      } catch (error) {
        console.error(`Error al obtener datos del ID ${id}:`, error);
        return [];
      }
    };

    const obtenerMateriasDeIds = async () => {
      const ids = ["Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto"];
      const materiasPorId = await Promise.all(ids.map((id) => obtenerMateriasPorId(id)));

      const materiasPorCurso = {};
      ids.forEach((id, index) => {
        // Filtrar materias duplicadas en cada año usando un conjunto (Set)
        const materiasUnicas = [...new Set(materiasPorId[index])];
        materiasPorCurso[id] = materiasUnicas;
      });

      setMateriasPorCurso(materiasPorCurso);
    };

    obtenerMateriasDeIds();
  }, []);

  return (
    <div className="container d-flex justify-content-center plan-de-estudios mt-5">
      <h1>Plan de Estudio Por Año</h1>
      <div className="row">
        {Object.keys(materiasPorCurso).map((curso) => (
          <div key={curso} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="card-title">{` ${curso}`}</h2>
                <div className="materias">
                  {materiasPorCurso[curso].map((materia, index) => (
                    <div key={index} className="card-text">
                      {materia}
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

export default PlanDeEstudios;
