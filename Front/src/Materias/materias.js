import React, { useState, useEffect } from 'react';
import './materias.css';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

const Materias = () => {
  const [selectedCurso, setSelectedCurso] = useState('');
  const [materiaCursoInputs, setMateriaCursoInputs] = useState(Array(25).fill(''));
  const [cursos, setCursos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State for success alert
  const [showErrorAlert, setShowErrorAlert] = useState(false); // State for error alert
  const [materiasDelAnio, setMateriasDelAnio] = useState([]); // Estado para almacenar las materias del año seleccionado

  useEffect(() => {
    fetchCursos();
    fetchMaterias();
  }, []);

  const fetchCursos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/curso/anios');
      const data = response.data;

      if (Array.isArray(data)) {
        setCursos(data);
      } else {
        console.error('Received data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching cursos:', error);
    }
  };

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
    fetchCursos();
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

 

  const renderNonEditableCell = (cellIndex) => {
    return (
      <td>
        <input
          type="text"
          value={materiaCursoInputs[cellIndex]}
          readOnly
        />
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
            <option key={curso.id} value={curso.id}>
              {curso}
            </option>
          ))}
        </select>
      </div>
      <div className="table-responsive mb-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Día/Hora</th>
              <th>Lunes</th>
              <th>Martes</th>
              <th>Miércoles</th>
              <th>Jueves</th>
              <th>Viernes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> 8:00-9:00</td>
              {renderNonEditableCell(0)}
              {renderNonEditableCell(1)}
              {renderNonEditableCell(2)}
              {renderNonEditableCell(3)}
              {renderNonEditableCell(4)}
            </tr>
            <tr>
              <td> 9:00-10:00</td>
              {renderNonEditableCell(5)}
              {renderNonEditableCell(6)}
              {renderNonEditableCell(7)}
              {renderNonEditableCell(8)}
              {renderNonEditableCell(9)}
            </tr>
            <tr>
              <td> 10:00-11:00</td>
              {renderNonEditableCell(10)}
              {renderNonEditableCell(11)}
              {renderNonEditableCell(12)}
              {renderNonEditableCell(13)}
              {renderNonEditableCell(14)}
            </tr>
            <tr>
              <td> 11:00-12:00</td>
              {renderNonEditableCell(15)}
              {renderNonEditableCell(16)}
              {renderNonEditableCell(17)}
              {renderNonEditableCell(18)}
              {renderNonEditableCell(19)}
            </tr>
            <tr>
              <td> 12:00-13:00</td>
              {renderNonEditableCell(20)}
              {renderNonEditableCell(21)}
              {renderNonEditableCell(22)}
              {renderNonEditableCell(23)}
              {renderNonEditableCell(24)}
            </tr>
          </tbody>
        </table>
      </div>
    
    </div>
  );
};

export default Materias;
