import React, { useState, useEffect } from 'react';
import './materias.css';
import axios from 'axios';
import { useAlumno } from '../Alumno/AlumnoContext';

const Materias = () => {
  const [materiaCursoInputs, setMateriaCursoInputs] = useState(Array(25).fill(''));
  const { alumnoLogueado } = useAlumno();

  useEffect(() => {
    fetchMaterias();
  }, [alumnoLogueado]);

  const fetchMaterias = async () => {
    try {
      if (alumnoLogueado && alumnoLogueado.curso) {
        let cursoString;

        switch (alumnoLogueado.curso) {
          case 1:
            cursoString = "primero";
            break;
          case 2:
            cursoString = "segundo";
            break;
          case 3:
            cursoString = "tercero";
            break;
          case 4:
            cursoString = "cuarto";
            break;
          case 5:
            cursoString = "quinto";
            break;
          case 6:
            cursoString = "sexto";
            break;
          default:
            cursoString = "desconocido";
        }

        const response = await axios.get(`http://localhost:3000/materias-curso/${cursoString}`);
        const materiaCursoData = response.data;

        if (materiaCursoData.length > 0) {
          const updatedMateriaCursoInputs = materiaCursoData.map((materiaItem) => materiaItem.materia || '');
          setMateriaCursoInputs(updatedMateriaCursoInputs);
        } else {
          setMateriaCursoInputs(Array(25).fill(''));
        }
      } else {
        setMateriaCursoInputs(Array(25).fill(''));
      }
    } catch (error) {
      console.error('Error fetching materia data:', error);
    }
  };

  const renderNonEditableCell = (cellIndex, materia) => {
    return (

        <div>{materia}</div>

    );
  };

  const horarios = [
    '8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00'
  ];

  return (
    <div className="container d-flex flex-column justify-content-center">
      <br></br>
      <h4 className="mb-4 titulo-materias">Aquí podrás ver las materias según los días y horarios</h4>
      <div className="table-responsive mb-4">
      <table className="table-materias align-items-center table-bordered">
  <thead>
    <tr>
      <th className="column-header">Horario</th>
      <th className="column-header">Lunes</th>
      <th className="column-header">Martes</th>
      <th className="column-header">Miércoles</th>
      <th className="column-header">Jueves</th>
      <th className="column-header">Viernes</th>
    </tr>
  </thead>
  <tbody>
    {horarios.map((horario, index) => (
      <tr key={index}>
        <td>{horario}</td>
        {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map((day, dayIndex) => (
          <td key={dayIndex}>
            {renderNonEditableCell(index * 5 + dayIndex, materiaCursoInputs[index * 5 + dayIndex])}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default Materias;
