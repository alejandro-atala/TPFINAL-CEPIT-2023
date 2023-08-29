import React, { useState , useEffect } from 'react';
import './materiasList.css';
import axios from 'axios';



const MateriasList = () => {
    const [editingCell, setEditingCell] = useState(null);
  const [selectedCurso, setSelectedCurso] = useState('');
  const [materiaInputs, setMateriaInputs] = useState(Array(25).fill(''));
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    fetchCursos(); // Fetch the list of courses when the component mounts
  }, []);

  const fetchCursos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/curso'); // Adjust the API endpoint
      const data = response.data; // Assuming the data is an array of course objects
  
      if (Array.isArray(data)) {
        setCursos(data);
      } else {
        console.error('Received data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching cursos:', error);
    }
  };
  

  const handleEditClick = (cellIndex) => {
    setEditingCell(cellIndex);
  };

  const handleCellBlur = () => {
    setEditingCell(null);
  };

  const handleCursoChange = (e) => {
    setSelectedCurso(e.target.value);
  };

  const handleSaveClick = async () => {
    try {
      const daysAndTimes = [
        'Lunes 8:00-9:00', 'Lunes 9:00-10:00', 'Lunes 10:00-11:00', 'Lunes 11:00-12:00', 'Lunes 12:00-13:00',
        'Martes 8:00-9:00', 'Martes 9:00-10:00', 'Martes 10:00-11:00', 'Martes 11:00-12:00', 'Martes 12:00-13:00',
        'Miércoles 8:00-9:00', 'Miércoles 9:00-10:00', 'Miércoles 10:00-11:00', 'Miércoles 11:00-12:00', 'Miércoles 12:00-13:00',
        'Jueves 8:00-9:00', 'Jueves 9:00-10:00', 'Jueves 10:00-11:00', 'Jueves 11:00-12:00', 'Jueves 12:00-13:00',
        'Viernes 8:00-9:00', 'Viernes 9:00-10:00', 'Viernes 10:00-11:00', 'Viernes 11:00-12:00', 'Viernes 12:00-13:00',
      ];

      const materiaData = daysAndTimes.map((dayAndTime, index) => ({
        materia: materiaInputs[index],
        diaHora: dayAndTime,
        anio: selectedCurso,
      }));
console.log(materiaData);
      const response = await axios.post('http://localhost:3000/materias/guardar', materiaData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Materias guardadas exitosamente');
      } else {
        console.error('Error al guardar las materias');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const renderEditableCell = (cellContent, cellIndex) => {
    return (
      <td>
        <input
          type="text"
          value={materiaInputs[cellIndex]}
          onChange={(e) => handleMateriaInputChange(e, cellIndex)}
        />
      </td>
    );
  };
  
  const handleMateriaInputChange = (e, cellIndex) => {
    const updatedMateriaInputs = [...materiaInputs];
    updatedMateriaInputs[cellIndex] = e.target.value;
    setMateriaInputs(updatedMateriaInputs);
  };
  
  

  return (
    <div>
      
      <h4>Aquí podrás editar las materias según los días y horarios</h4>
      <div>
        <label>Seleccione un curso:</label>
        <select onChange={handleCursoChange} value={selectedCurso}>
  <option value="">Seleccione un curso</option>
  {cursos.map((curso) => (
    <option key={curso.id} value={curso.id}>
      {curso.anio} {/* Display the course name */}
    </option>
  ))}
</select>
      </div>
      <div className="table-responsive m-5">
        <table>
          <thead>
            <tr>
              <th>Día/Hora</th>
              <th>8:00-9:00</th>
              <th>9:00-10:00</th>
              <th>10:00-11:00</th>
              <th>11:00-12:00</th>
              <th>12:00-1:00</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lunes</td>
              {renderEditableCell('Matematicas', 0)}
              {renderEditableCell('Fisica', 1)}
              {renderEditableCell('Ingles', 2)}
              {renderEditableCell('Historia', 3)}
              {renderEditableCell('Recreo', 4)}
            </tr>
            <tr>
              <td>Martes</td>
              {renderEditableCell('Biologia', 5)}
              {renderEditableCell('Educación Física', 6)}
              {renderEditableCell('Matematicas', 7)}
              {renderEditableCell('Fisica', 8)}
              {renderEditableCell('Recreo', 9)}
            </tr>
            <tr>
              <td>Miércoles</td>
              {renderEditableCell('Ingles', 10)}
              {renderEditableCell('Historia', 11)}
              {renderEditableCell('Biologia', 12)}
              {renderEditableCell('Educación Física', 13)}
              {renderEditableCell('Recreo', 14)}
            </tr>
            <tr>
              <td>Jueves</td>
              {renderEditableCell('Matematicas', 15)}
              {renderEditableCell('Fisica', 16)}
              {renderEditableCell('Ingles', 17)}
              {renderEditableCell('Historia', 18)}
              {renderEditableCell('Recreo', 19)}
            </tr>
            <tr>
              <td>Viernes</td>
              {renderEditableCell('Biologia', 20)}
              {renderEditableCell('Educación Física', 21)}
              {renderEditableCell('Matematicas', 22)}
              {renderEditableCell('Fisica', 23)}
              {renderEditableCell('Recreo', 24)}
            </tr>
          </tbody>
        </table>
        </div>
      <button onClick={handleSaveClick}>Guardar Materias</button>
    </div>
  );
};

export default MateriasList;