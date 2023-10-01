import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './avisos.css';
import { useAlumno } from '../Alumno/AlumnoContext';
import { useNotificaciones } from '../Alumno/NotificacionesContext';

const Avisos = () => {
  useEffect(() => {
    // Marcar todos los avisos como leídos al cargar la página de avisos
    markAvisosComoLeidos();
  }, []);
  
  const cursosNombres = {
    1: 'Primero',
    2: 'Segundo',
    3: 'Tercero',
    4: 'Cuarto',
    5: 'Quinto',
    6: 'Sexto',
  };

  const [avisos, setAvisos] = useState([]);
  const { alumnoLogueado } = useAlumno();
  const { markAvisosComoLeidos } = useNotificaciones(); // Utiliza useNotificaciones para acceder a markAvisosComoLeidos

  useEffect(() => {
    const fetchAvisosPorCurso = async () => {
      try {
        const response = await axios.get('http://localhost:3000/avisos');
        console.log('Avisos Recibidos:', response.data);

        // Obtener el curso del alumno como un string legible
        const cursoAlumno = cursosNombres[alumnoLogueado.curso];
        console.log('Curso Alumno:', cursoAlumno);

        const avisosFiltrados = response.data.filter((aviso) => {
          // Convierte el campo 'curso' del aviso a minúsculas antes de comparar
          const cursoAviso = aviso.curso.toString().toLowerCase();
          console.log('Curso Aviso:', cursoAviso);

          // Compara el curso del aviso con el curso del alumno (ambos en minúsculas)
          return cursoAviso === cursoAlumno.toLowerCase();
        });

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
              <h5 className="card-title">Aviso del profesor: <span className="nombre-profesor">{aviso.nombreProfesor}</span></h5>
              <h6>Información para el Curso:  <span className="numero-curso">{aviso.curso}</span></h6>
              <p className="card-text">Contenido del Aviso: </p>
              <h5 className="contenido-aviso">{aviso.contenido}</h5>
              <p className="card-text">Fecha: {new Date(aviso.fecha).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Avisos;
