import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './planDeEstudios.css';
import axios from 'axios';

const PlanDeEstudios = () => {
  const [materiasPorId, setMateriasPorId] = useState([]);

  useEffect(() => {
    const obtenerMateriasPorId = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3000/materias-curso/${id}`);
        return { id, materias: response.data.map((row) => row.materia) };
      } catch (error) {
        console.error(`Error al obtener datos del ID ${id}:`, error);
        return { id, materias: [] };
      }
    };

    const obtenerMateriasDeIds = async () => {
      const ids = ["Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto"];
      const promesas = ids.map((id) => obtenerMateriasPorId(id));
      const resultados = await Promise.all(promesas);
      setMateriasPorId(resultados);
    };

    obtenerMateriasDeIds();
  }, []);

  return (
    <div className="container plan-de-estudios mt-5">
      <h1>Plan de Estudio Por Año</h1>
      <div className="row">
        {materiasPorId.map((materiasPorId) => (
          <div key={materiasPorId.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="card-title">{` ${materiasPorId.id}`}</h2>
                <div className="materias">
                  {materiasPorId.materias.map((materia, subIndex) => (
                    <div key={subIndex} className="card-text">
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
