import React, { useState, useEffect } from 'react';
import './materiasProf.css';
import axios from 'axios';
import { useUsuario } from '../../usuarioContext';

const MateriasProf = () => {
  const [materiaCursoInputs, setMateriaCursoInputs] = useState(Array(25).fill(''));
  const { usuarioLogueado } = useUsuario();

console.log("cursos",usuarioLogueado.curso)

  useEffect(() => {
    fetchMaterias();
  }, [usuarioLogueado]);

  const fetchMaterias = async () => {
    try {
      if (usuarioLogueado && usuarioLogueado.curso) {
        let cursoString;

        switch (usuarioLogueado.curso) {
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
        // if (response.data.tipo === 'Profesor') {
        //   const resp = await axios.get(`http://localhost:3000/usuario/${idUsuario}`);
        //   const profesorData = resp.data;
  
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
      <td>
        <div>{materia}</div>
      </td>
    );
  };

  const horarios = [
    '8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00'
  ];

  return (
    <div className="container d-flex flex-column justify-content-center">
      <br></br>
      <h4 className="mb-4">Aquí podrás ver las materias según los días y horarios</h4>
      <div className="table-responsive mb-4">
        <table className="table table-bordered">
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
                {renderNonEditableCell(index, materiaCursoInputs[index])}
                {renderNonEditableCell(index + 5, materiaCursoInputs[index + 5])}
                {renderNonEditableCell(index + 10, materiaCursoInputs[index + 10])}
                {renderNonEditableCell(index + 15, materiaCursoInputs[index + 15])}
                {renderNonEditableCell(index + 20, materiaCursoInputs[index + 20])}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MateriasProf;
