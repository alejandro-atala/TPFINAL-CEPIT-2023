import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './notas.css';
import { useAlumno } from '../Alumno/AlumnoContext';

const Notas = () => {
  const [notas, setNotas] = useState([]);
  const { alumnoLogueado } = useAlumno();
  useEffect(() => {
    fetchNotas();
  }, []);

  const fetchNotas = async () => {
    try {
		console.log(alumnoLogueado);
      const response = await axios.get(`http://localhost:3000/notas-examenes/${alumnoLogueado}`);
      const notasData = response.data; // Asumiendo que response.data es un Array de objetos de nota
      setNotas(notasData);
    } catch (error) {
      console.error('Error fetching notas:', error);
    }
	console.log(notas)
  };

  return (
    <div>
      <h4>Aquí podrás ver las notas de tus exámenes</h4>

      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Materia</th>
            <th>Nota del examen</th>
            <th>Estado</th>
            <th>Recuperatorio</th>
            <th>Nota del recuperatorio</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota, index) => (
            <tr key={index}>
              <td>{nota.fecha}</td>
              <td>{nota.materia}</td>
              <td>{nota.notaExamen}</td>
              <td>{nota.estadoExamen}</td>
              <td>{nota.fechaRecuperatorio || '-'}</td>
              <td>{nota.notaRecuperatorio || '-'}</td>
              <td>{nota.estadoRecuperatorio || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notas;
