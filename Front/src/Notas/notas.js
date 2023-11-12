import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './notas.css';
import { useAlumno } from '../Alumno/AlumnoContext';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const Notas = () => {
  const [notas, setNotas] = useState([]);
  const { alumnoLogueado } = useAlumno();
  useEffect(() => {
    fetchNotas();
  }, []);

  const fetchNotas = async () => {
    try {

      const response = await axios.get(`https://app-2361a359-07df-48b8-acfd-5fb4c0536ce2.cleverapps.io/notas-examenes/${alumnoLogueado.idAlumno}`);
      const notasData = response.data; // Asumiendo que response.data es un Array de objetos de nota
      setNotas(notasData);
      console.log(notasData);
    } catch (error) {
      console.error('Error fetching notas:', error);
    }
  };

  // Function to calculate one week after a given date
const calculateOneWeekAfter = (inputDate) => {
  const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  const inputDateTimestamp = new Date(inputDate).getTime(); // Convert input date to timestamp
  const oneWeekAfterTimestamp = inputDateTimestamp + oneWeekInMilliseconds; // Calculate one week after timestamp
  const oneWeekAfterDate = new Date(oneWeekAfterTimestamp); // Convert timestamp back to Date object
  return oneWeekAfterDate;
};




  // Filtrar las notas con trimestre 0
  const notasTrimestre0 = notas.filter((nota) => nota.trimestre === 0);

  return (
    <div>
      <h4 className='titulo-notas'>Aquí podrás ver las notas de tus exámenes</h4>

      <table className='tabla-notas'>
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
          {notasTrimestre0.map((nota, index) => (
            <tr key={index}>
              <td>{formatDate(nota.fechaNota)}</td>
              <td>{nota.materia.nombre}</td>
              <td>{nota.nota}</td>
              <td> {nota.nota !== null ? (nota.nota >= 7 ? 'Aprobado' : 'Desaprobado') : '-'}</td>
              <td>{nota.nota !== null && nota.nota < 7 ? formatDate(calculateOneWeekAfter(nota.fechaNota)) : '-'}</td>
              <td>{nota.notaRecuperatorio || '-'}</td>
              <td>
                {nota.notaRecuperatorio !== null && nota.notaRecuperatorio !== undefined
                  ? nota.notaRecuperatorio >= 7
                    ? 'Aprobado'
                    : 'Desaprobado'
                  : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notas;
