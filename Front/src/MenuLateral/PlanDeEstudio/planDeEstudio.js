import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './planDeEstudios.css';
import axios from 'axios';
import SideMenu from '../sideMenu';

const PlanDeEstudios = () => {
  const [materiasPorCurso, setMateriasPorCurso] = useState({});

  useEffect(() => {
    const obtenerMateriasPorId = async (id) => {
      try {
        const response = await axios.get(`https://app-2361a359-07df-48b8-acfd-5fb4c0536ce2.cleverapps.io/materias-curso/${id}`);
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
    <div className="container-plan">
      <div className="row">
      <div className="col-md-3 col-sm-6 col-xs-12">
    <SideMenu />
</div>
        <div className="col-md-9 mt-5">
          <div className="d-flex flex-column align-items-center">
            <h1 className='titulo-plan'>Plan de Estudio Por Año</h1>
            <div className="row plan">
              {Object.keys(materiasPorCurso).map((curso) => (
                <div key={curso} className="col-md-6 col-lg-4 mb-4">
                  <div className="card shadow">
                    <div className="card-body text-center"> {/* Utilizamos la clase text-center para centrar el contenido */}
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
        </div>
      </div>
    </div>
  );}
  
export default PlanDeEstudios;
