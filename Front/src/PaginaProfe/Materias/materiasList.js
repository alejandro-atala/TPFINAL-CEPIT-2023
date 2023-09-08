import React, { useState, useEffect } from 'react';
import './materiasList.css';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

const MateriasList = () => {
  const [selectedCurso, setSelectedCurso] = useState('');
  const [materiaCursoInputs, setMateriaCursoInputs] = useState(Array(25).fill(''));
  const [cursos, setCursos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isCursoSelected, setIsCursoSelected] = useState(false);


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

  const handleCursoChange = async (e) => {
    const selectedCursoId = e.target.value;
    setSelectedCurso(selectedCursoId);
  
    if (selectedCursoId) {
      setIsCursoSelected(true);
      try {
        const response = await axios.get(`http://localhost:3000/materias-curso/${selectedCursoId}`);
        const materiaCursoData = response.data;
  
        if (materiaCursoData.length > 0) {
          const updatedMateriaCursoInputs = materiaCursoData.map((materiaItem) => materiaItem.materia || '');
          setMateriaCursoInputs(updatedMateriaCursoInputs);
        } else {
          setMateriaCursoInputs(Array(25).fill(''));
        }
      } catch (error) {
        console.error('Error fetching materia data:', error);
      }
    } else {
      setIsCursoSelected(false);
      setMateriaCursoInputs(Array(25).fill(''));
    }
  };
  

  const handleSaveClick = async () => {
    if (!isCursoSelected) {
      setShowErrorAlert(true);
      setShowSuccessAlert(false);

      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
    
      
      return;
    }
  

  
    try {
      const daysAndTimes = [
        'Lunes 8:00-9:00', 'Lunes 9:00-10:00', 'Lunes 10:00-11:00', 'Lunes 11:00-12:00', 'Lunes 12:00-13:00',
        'Martes 8:00-9:00', 'Martes 9:00-10:00', 'Martes 10:00-11:00', 'Martes 11:00-12:00', 'Martes 12:00-13:00',
        'Miércoles 8:00-9:00', 'Miércoles 9:00-10:00', 'Miércoles 10:00-11:00', 'Miércoles 11:00-12:00', 'Miércoles 12:00-13:00',
        'Jueves 8:00-9:00', 'Jueves 9:00-10:00', 'Jueves 10:00-11:00', 'Jueves 11:00-12:00', 'Jueves 12:00-13:00',
        'Viernes 8:00-9:00', 'Viernes 9:00-10:00', 'Viernes 10:00-11:00', 'Viernes 11:00-12:00', 'Viernes 12:00-13:00',
      ];

      const materiaData = daysAndTimes.map((dayAndTime, index) => ({
        materia: materiaCursoInputs[index],
        diaHora: dayAndTime,
        anio: selectedCurso,
      }));
      

      const response = await axios.post('http://localhost:3000/materias-curso/guardar', materiaData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        console.log('Materias guardadas exitosamente');
        setShowSuccessAlert(true);
        setShowErrorAlert(false);

        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 2000);
      } else {


        console.error('Error al guardar las materias');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setShowSuccessAlert(false);
      setShowErrorAlert(true);

      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
    }
    }
  

  const handleMateriaCursoInputChange = (e, cellIndex) => {
    const updatedMateriaCursoInputs = [...materiaCursoInputs];
    updatedMateriaCursoInputs[cellIndex] = e.target.value;
    setMateriaCursoInputs(updatedMateriaCursoInputs);
  };

  const renderSelectCell = (cellIndex) => {
    return (
      <td>
        <select
          value={materiaCursoInputs[cellIndex]}
          onChange={(e) => handleMateriaCursoInputChange(e, cellIndex)}
        >
          <option key="default" value="">Selecciona una materia</option>
          {materias.map((materia) => (
            <option key={materia.id} value={materia.id}>
              {materia.nombre}
            </option>
          ))}
        </select>
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
              {renderSelectCell(0)}
              {renderSelectCell(1)}
              {renderSelectCell(2)}
              {renderSelectCell(3)}
              {renderSelectCell(4)}
            </tr>
            <tr>
              <td> 9:00-10:00</td>
              {renderSelectCell(5)}
              {renderSelectCell(6)}
              {renderSelectCell(7)}
              {renderSelectCell(8)}
              {renderSelectCell(9)}
            </tr>
            <tr>
              <td> 10:00-11:00</td>
              {renderSelectCell(10)}
              {renderSelectCell(11)}
              {renderSelectCell(12)}
              {renderSelectCell(13)}
              {renderSelectCell(14)}
            </tr>
            <tr>
              <td> 11:00-12:00</td>
              {renderSelectCell(15)}
              {renderSelectCell(16)}
              {renderSelectCell(17)}
              {renderSelectCell(18)}
              {renderSelectCell(19)}
            </tr>
            <tr>
              <td> 12:00-13:00</td>
              {renderSelectCell(20)}
              {renderSelectCell(21)}
              {renderSelectCell(22)}
              {renderSelectCell(23)}
              {renderSelectCell(24)}
            </tr>
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary" onClick={handleSaveClick}>
        Guardar Materias
      </button>

      {showSuccessAlert && (
        <Alert variant="success" className="mt-3 text-center">
          Materias guardadas exitosamente.
        </Alert>
      )}

      {showErrorAlert && (
        <Alert variant="danger" className="mt-3 text-center">
          Error al guardar las materias. Por favor, inténtalo nuevamente.
        </Alert>
      )}
    </div>
  );
};

export default MateriasList;