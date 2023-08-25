import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlumno } from '../Alumno/AlumnoContext';

const Asistencia = () => {
  const [asistencias, setAsistencias] = useState([]);
  const { alumnoLogueado } = useAlumno();
console.log(alumnoLogueado);


  useEffect(() => {
    fetchAsistencias();
  }, []);
//`http://localhost:3000/asistencia/${alumnoLogueado}`
const fetchAsistencias = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/asistencia/${alumnoLogueado}`);
    const asistenciasData = response.data; // Asumiendo que response.data es un Array
    console.log(response.data)
    const asistenciasAlumno = asistenciasData.filter(asistencia => asistencia.idAlumno === alumnoLogueado);
    setAsistencias(asistenciasAlumno);
  } catch (error) {
    console.error('Error fetching asistencias:', error);
  }
};

  return (
    <div>
      <h1>Log de asistencias e inasistencias</h1>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Entrada</th>
            <th>Salida</th>
            <th>Asistencia/Inasistencia</th>
          </tr>
        </thead>
        <tbody>
          {asistencias.map(asistencia => (
            <tr key={asistencia.id}>
              <td>{asistencia.fecha}</td>
              <td>{asistencia.entrada}</td>
              <td>{asistencia.salida}</td>
              <td>{asistencia.asistencia ? 'Asistencia' : 'Inasistencia'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Asistencia;
