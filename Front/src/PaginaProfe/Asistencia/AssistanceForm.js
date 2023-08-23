import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AssistanceForm({ addAssistance }) {
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceStatus, setAttendanceStatus] = useState('presente');
  const [category, setCategory] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [studentNames, setStudentNames] = useState([]); // State to hold student names
  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/alumno')
      .then(response => {
        setAlumnos(response.data);
        const fetchedStudentNames = response.data.map(student => student.nombreAlumno);
        setStudentNames(fetchedStudentNames); // Set the student names
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });
  }, []);

  const handleAttendanceStatusChange = (status) => {
    setAttendanceStatus(status);
    if (status === 'media_falta') {
      setCategory('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let attendanceText = "";
    if (attendanceStatus === 'presente') {
      attendanceText = "Presente";
    } else if (attendanceStatus === 'media_falta') {
      attendanceText = "Media falta";
    } else {
      attendanceText = "Ausente";
    }

    console.log('Enviando solicitud de asistencia...'); // Registro antes de la solicitud
    
    try {
      await axios.post('http://localhost:5000/asistencia', {
        alumno: selectedStudent,
        fecha: entryDate,
        asistencia: attendanceText
      });

      console.log('Asistencia registrada'); // Registro después de la solicitud exitosa
      
      // Resto del código después de enviar la asistencia...
      addAssistance({ studentName: selectedStudent, entryDate, attendanceStatus: attendanceText, category });
      setSelectedStudent('');
      setEntryDate(new Date().toISOString().split('T')[0]);
      setAttendanceStatus('presente');
      setCategory('');
    } catch (error) {
      console.error('Error al registrar la asistencia:', error); // Manejo de errores
      
    }  }
  

 

    return (
      <form onSubmit={handleSubmit}>
        <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
          <option value="">Selecciona un alumno</option>
          {studentNames.map((name, index) => (
            <option key={index} value={name}>{name}</option>
          ))}
        </select>
        <input
          type="date"
          value={entryDate}
          onChange={(e) => setEntryDate(e.target.value)}
        />
        <label>
          <input
            type="radio"
            value="presente"
            checked={attendanceStatus === 'presente'}
            onChange={() => handleAttendanceStatusChange('presente')}
          />
          Asistencia
        </label>
        <label>
          <input
            type="radio"
            value="inasistencia"
            checked={attendanceStatus === 'inasistencia'}
            onChange={() => handleAttendanceStatusChange('inasistencia')}
          />
          Inasistencia
        </label>
        <label>
          <input
            type="radio"
            value="media_falta"
            checked={attendanceStatus === 'media_falta'}
            onChange={() => handleAttendanceStatusChange('media_falta')}
          />
          Media falta
        </label>
        
        <button type="submit">Registrar</button>
      </form>
    );
   }
  
  export default AssistanceForm;