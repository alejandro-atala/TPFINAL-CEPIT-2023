import React, { useState , useEffect } from 'react';
import './materiasList.css';
import axios from 'axios';



const MateriasList = () => {
    const [selectedCurso, setSelectedCurso] = useState('');
    const [materiaInputs, setMateriaInputs] = useState(Array(25).fill(''));
    const [cursos, setCursos] = useState([]);
  
    useEffect(() => {
      fetchCursos(); // Fetch the list of courses when the component mounts
    }, []);
  
    const fetchCursos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/curso/anios'); // Adjust the API endpoint
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
    
  
  
  
  
  
    const handleCursoChange = async (e) => {
      const selectedCursoId = e.target.value;
      setSelectedCurso(selectedCursoId);
    
      if (selectedCursoId) {
        try {
          const response = await axios.get(`http://localhost:3000/materias/${selectedCursoId}`);
          const materiaData = response.data;
    
          if (materiaData.length > 0) {
            const updatedMateriaInputs = materiaData.map((materiaItem) => materiaItem.materia || '');
            setMateriaInputs(updatedMateriaInputs);
          } else {
            setMateriaInputs(Array(25).fill('')); // Clear inputs when no data available
          }
        } catch (error) {
          console.error('Error fetching materia data:', error);
        }
      } else {
        setMateriaInputs(Array(25).fill('')); // Clear inputs when no year is selected
      }
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
//  console.log(materiaData);
        const response = await axios.post('http://localhost:3000/materias/guardar', materiaData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 201) {
          console.log('Materias guardadas exitosamente');
        } else {
          console.error('Error al guardar las materias');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };
  
    const renderEditableCell = ( cellIndex) => {
        return (
          <td>
            <input
              type="text"
              value={materiaInputs[cellIndex]}
              onChange={(e) => handleMateriaInputChange(e, cellIndex)}
              placeholder={materiaInputs[cellIndex]} // Set the placeholder to the current value
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
                {renderEditableCell(0)}
                {renderEditableCell(1)}
                {renderEditableCell(2)}
                {renderEditableCell(3)}
                {renderEditableCell(4)}
              </tr>
              <tr>
                <td> 9:00-10:00</td>
                {renderEditableCell(5)}
                {renderEditableCell(6)}
                {renderEditableCell(7)}
                {renderEditableCell(8)}
                {renderEditableCell(9)}
              </tr>
              <tr>
                <td> 10:00-11:00</td>
                {renderEditableCell(10)}
                {renderEditableCell(11)}
                {renderEditableCell(12)}
                {renderEditableCell(13)}
                {renderEditableCell(14)}
              </tr>
              <tr>
                <td> 11:00-12:00</td>
                {renderEditableCell(15)}
                {renderEditableCell(16)}
                {renderEditableCell(17)}
                {renderEditableCell(18)}
                {renderEditableCell(19)}
              </tr>
              <tr>
                <td> 12:00-13:00</td>
                {renderEditableCell(20)}
                {renderEditableCell(21)}
                {renderEditableCell(22)}
                {renderEditableCell(23)}
                {renderEditableCell(24)}
              </tr>
            </tbody>
            </table>
        </div>
        <button className="btn btn-primary" onClick={handleSaveClick}>
          Guardar Materias
        </button>
      </div>
    );
  };

  export default MateriasList;
