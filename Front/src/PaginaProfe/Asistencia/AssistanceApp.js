import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AssistanceForm from './AssistanceForm';
import AssistanceList from './AssistanceList';
import './App.css';

function AssistanceApp() {
  const [assistances, setAssistances] = useState([]);
  const [studentNames, setStudentNames] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(() => {
    // Fetch student names from backend
    fetchStudentNames();
  }, []);

  const fetchStudentNames = async () => {
    try {
      const response = await axios.get('/alumno'); // Make sure the endpoint is correct
      setStudentNames(response.data);
    } catch (error) {
      console.error('Error fetching student names:', error);
    }
  };

  const addAssistance = (assistance) => {
    setAssistances([...assistances, assistance]);
  };

  return (
    <div className="App">
      <h1>Registro de Asistencias</h1>
      <AssistanceForm
        addAssistance={addAssistance}
        studentNames={studentNames}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
      />
      <AssistanceList assistances={assistances} />
    </div>
  );
}

export default AssistanceApp;
