import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlumno } from '../Alumno/AlumnoContext';
import './asistencia.css';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const Asistencia = () => {
  const [asistencias, setAsistencias] = useState([]);
  const { alumnoLogueado } = useAlumno();
  const [contadorAsistencias, setContadorAsistencias] = useState(0);
  const [contadorInasistencias, setContadorInasistencias] = useState(0);
  const [contadorMediaFalta, setContadorMediaFalta] = useState(0);

  useEffect(() => {
    fetchAsistencias();
  }, []);

  const fetchAsistencias = async () => {
    try {
      console.log(alumnoLogueado);
      const response = await axios.get(`https://app-9d7fdcc2-2916-41fd-93f1-ef602d6afbcc.cleverapps.io/asistencia/${alumnoLogueado.idAlumno}`);
      const asistenciasData = response.data;
      setAsistencias(asistenciasData);
      // Calcular los contadores
      const asistenciasCounts = asistenciasData.reduce(
        (counts, asistencia) => {
          if (asistencia.asistencia === 'presente') {
            counts.asistencias += 1;
          } else if (asistencia.asistencia === 'ausente') {
            counts.inasistencias += 1;
          } else if (asistencia.asistencia === 'media-falta') {
            counts.mediaFalta += 1;
          }
          return counts;
        },
        { asistencias: 0, inasistencias: 0, mediaFalta: 0 }
      );
      setContadorAsistencias(asistenciasCounts.asistencias);
      setContadorInasistencias(asistenciasCounts.inasistencias);
      setContadorMediaFalta(asistenciasCounts.mediaFalta);
    } catch (error) {
      console.error('Error fetching asistencias:', error);
    }
  };

  return (
    <div className='col-9 mx-auto'>
      <h4 className='titulo-asistencia'>Registro de asistencias e inasistencias</h4>
      <table className="custom-table tabla-asistencia">

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
                <td>{formatDate(asistencia.fecha)}</td>
              <td>{asistencia.entrada}</td>
              <td>{asistencia.salida}</td>
              <td>
                {asistencia.asistencia === 'presente' && 'Presente'}
                {asistencia.asistencia === 'ausente' && 'Ausente'}
                {asistencia.asistencia === 'media-falta' && 'Media-Falta'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      <div className="d-flex justify-content-between tabla-asistencia-2">
        <p>Asistencias: <strong>{contadorAsistencias}</strong></p>
        <p>Inasistencias: <strong>{contadorInasistencias}</strong></p>
        <p>Medias Faltas:<strong> {contadorMediaFalta}</strong></p>
      </div>
    </div>
  );
};

export default Asistencia;
