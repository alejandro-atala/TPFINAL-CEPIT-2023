import React, { useState, useEffect, useDeferredValue } from 'react';
import './materias.css';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { useAlumno } from '../Alumno/AlumnoContext';
import { useProfesor} from '../PaginaProfe/profesorContext';

const Materias = () => {
  const [selectedCurso, setSelectedCurso] = useState('');
  const [materiaCursoInputs, setMateriaCursoInputs] = useState(Array(25).fill(''));
  const [cursos, setCursos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const { setAlumnoLogueado } = useAlumno();
  const { profesorLogueado } = useProfesor();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State for success alert
  const [showErrorAlert, setShowErrorAlert] = useState(false); // State for error alert
  const [materiasDelAnio, setMateriasDelAnio] = useState([]); // Estado para almacenar las materias del año seleccionado

  useEffect(() => {
    fetchCursosPorProfesor();
    fetchMaterias();
  }, []);

  const fetchCursosPorProfesor = async () => {
    try {
      const idDelProfesor= profesorLogueado().idProfesor;
      console.log(profesorLogueado);
      if (!idDelProfesor) {
        console.error('No se ha identificado al profesor logueado.');
        return;
      }
      const response = await axios.get(`http://localhost:3000/curso/asignados/${idDelProfesor}`);
      const data = response.data;
      console.log('Cursos:', data);
      if (Array.isArray(data)) {
        setCursos(data);
      } else {
        console.error('Received data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching cursos:', error);
    }
  };

  fetchCursosPorProfesor();
  

  useEffect(() => {
    fetchMaterias();
  }, []);

  const fetchMaterias = async () => {
    try {
      const response = await axios.get('http://localhost:3000/materias');
      const data = response.data;

      if (Array.isArray(data)) {
        const sortedMaterias = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
        setMaterias(sortedMaterias);
      } else {
        console.error('Received data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching materias:', error);
    }
  };

  useEffect(() => {
    fetchCursosPorProfesor();
  }, []);

  const handleCursoChange = async (e) => {
    const selectedCursoId = e.target.value;
    setSelectedCurso(selectedCursoId);

    if (selectedCursoId) {
      try {
        const response = await axios.get(`http://localhost:3000/materias-curso/${selectedCursoId}`);
        const materiaCursoData = response.data;

        if (materiaCursoData.length > 0) {
          const updatedMateriaCursoInputs = materiaCursoData.map((materiaItem) => materiaItem.materia || '');
          setMateriaCursoInputs(updatedMateriaCursoInputs);
        } else {
          setMateriaCursoInputs(Array(25).fill(''));
        }

        // Actualiza las materias del año seleccionado solo si existen materias para ese año en la base de datos
        const materiasParaAnio = materias.filter((materia) => materia.anio === selectedCursoId);
        setMateriasDelAnio(materiasParaAnio);
      } catch (error) {
        console.error('Error fetching materia data:', error);
      }
    } else {
      setMateriaCursoInputs(Array(25).fill(''));
      setMateriasDelAnio([]); // Reinicia las materias del año seleccionado si no se ha seleccionado un año
    }
  };

 

  const renderNonEditableCell = (cellIndex, materia) => {
    return (
      <td>
        <div>{materia}</div>
      </td>
    );
  };
  

  return (
    <div className="container d-flex flex-column justify-content-center ">
      <h4 className="mb-4">Aquí podrás editar las materias según los días y horarios</h4>
      <div className="mb-3">
        <label>Seleccione un curso:</label>
        <select className="form-select" onChange={handleCursoChange} value={selectedCurso}>
          <option value="">Seleccione un curso</option>
          {cursos.map((curso) => (
            <option key={curso.idCurso} value={curso.idCurso}>
              {curso}
            </option>
          ))}
        </select>
      </div>
      <div className="table-responsive mb-4">
        <table className="table table-bordered">
          <thead>
          <tr>
  <th className="column-header">Día/Hora</th>
  <th className="column-header">Lunes</th>
  <th className="column-header">Martes</th>
  <th className="column-header">Miércoles</th>
  <th className="column-header">Jueves</th>
  <th className="column-header">Viernes</th>
</tr>

          </thead>
          <tbody>
            
            <tr>
  <td>8:00-9:00</td>
  {renderNonEditableCell(0, materiaCursoInputs[0])}
  {renderNonEditableCell(1, materiaCursoInputs[1])}
  {renderNonEditableCell(2, materiaCursoInputs[2])}
  {renderNonEditableCell(3, materiaCursoInputs[3])}
  {renderNonEditableCell(4, materiaCursoInputs[4])}
</tr>
<tr>
  <td>9:00-10:00</td>
  {renderNonEditableCell(5, materiaCursoInputs[5])}
  {renderNonEditableCell(6, materiaCursoInputs[6])}
  {renderNonEditableCell(7, materiaCursoInputs[7])}
  {renderNonEditableCell(8, materiaCursoInputs[8])}
  {renderNonEditableCell(9, materiaCursoInputs[9])}
</tr>
<tr>
  <td>10:00-11:00</td>
  {renderNonEditableCell(10, materiaCursoInputs[10])}
  {renderNonEditableCell(11, materiaCursoInputs[11])}
  {renderNonEditableCell(12, materiaCursoInputs[12])}
  {renderNonEditableCell(13, materiaCursoInputs[13])}
  {renderNonEditableCell(14, materiaCursoInputs[14])}
</tr>
<tr>
  <td>11:00-12:00</td>
  {renderNonEditableCell(15, materiaCursoInputs[15])}
  {renderNonEditableCell(16, materiaCursoInputs[16])}
  {renderNonEditableCell(17, materiaCursoInputs[17])}
  {renderNonEditableCell(18, materiaCursoInputs[18])}
  {renderNonEditableCell(19, materiaCursoInputs[19])}
</tr>
<tr>
  <td>12:00-13:00</td>
  {renderNonEditableCell(20, materiaCursoInputs[20])}
  {renderNonEditableCell(21, materiaCursoInputs[21])}
  {renderNonEditableCell(22, materiaCursoInputs[22])}
  {renderNonEditableCell(23, materiaCursoInputs[23])}
  {renderNonEditableCell(24, materiaCursoInputs[24])}
</tr>
          </tbody>
        </table>
      </div>
    
    </div>
  );
};

export default Materias;