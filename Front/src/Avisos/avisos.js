import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './avisos.css';
import { useAlumno } from '../Alumno/AlumnoContext';

const Avisos = () => {
  const [avisos, setAvisos] = useState([]);
  const { alumnoLogueado } = useAlumno();

  useEffect(() => {
    const fetchAvisosPorCurso = async () => {
      try {
        const response = await axios.get('http://localhost:3000/avisos');
        console.log('Avisos Recibidos:', response.data);
  
        const avisosFiltrados = response.data.filter(
          (aviso) => aviso.curso === alumnoLogueado.curso
        );
        console.log('Avisos Filtrados:', avisosFiltrados);
  
        setAvisos(avisosFiltrados);
      } catch (error) {
        console.error('Error fetching avisos:', error);
      }
    };
  
    if (alumnoLogueado && alumnoLogueado.curso) {
      fetchAvisosPorCurso();
    }
  }, [alumnoLogueado]);
  
  return (
    <div>
      <div className="row">
        <h4 className="card-title">Avisos recibidos</h4>
      </div>
      <div>
        {avisos.map((aviso) => (
          <div key={aviso.idAviso} className="card">
            <div className="card-body">
              <h5 className="card-title">Aviso del profesor:</h5>
              <div>
                <p className="card-text">Contenido: {aviso.contenido}</p>
                <p className="card-text">Fecha: {new Date(aviso.fecha).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
 }  
export default Avisos;
