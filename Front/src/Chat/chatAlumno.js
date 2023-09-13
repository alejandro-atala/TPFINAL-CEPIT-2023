import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatBubble from './burbujas';
import { useAlumno } from '../Alumno/AlumnoContext';


const ChatAlumno = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { message: 'Hola, soy un alumno.', type: 'user' },
    { message: '¡Hola! Soy el profesor.', type: 'other' },
    // Agrega más mensajes aquí
  ]);
  const [professors, setProfessors] = useState([]); // Lista de profesores
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const { alumnoLogueado } = useAlumno(); // Acceder a la información del usuario desde el contexto

console.log(alumnoLogueado)

  useEffect(() => {
    // Realizar una solicitud GET para obtener la lista de profesores
    axios.get('http://localhost:3000/profesor') // Ajusta la URL según tu ruta en el servidor
      .then((response) => {
        setProfessors(response.data);
   
      })
      .catch((error) => {
        console.error('Error al obtener la lista de profesores:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '' || selectedProfessor === null) return;

    try {console.log(selectedProfessor)
      const response = await axios.post('http://localhost:3000/chat/', {
        content: inputMessage,
        idAlumno: alumnoLogueado.idAlumno, //.idAlumno
        idProfesor: selectedProfessor.idProfesor, // Envía el ID del profesor seleccionado
      });

      setChatMessages([...chatMessages, response.data]);
      setInputMessage('');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="chat-box">
            {/* Agregar un campo de selección de profesor */}
            <select
              className="form-control"
              value={selectedProfessor ? selectedProfessor.id : ''}
              onChange={(e) => {
                const selectedProf = professors.find((prof) => prof.idProfesor === parseInt(e.target.value));
                setSelectedProfessor(selectedProf);
              }}
            >
              <option value="">Selecciona un profesor</option>
              {professors.map((prof) => (
                <option key={prof.idProfesor} value={prof.idProfesor}>
                  {prof.nombre} {/* Ajusta el nombre del profesor según tus datos */}
                </option>
              ))}
            </select>

            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <ChatBubble key={index} message={msg.message} type={msg.type} />
              ))}
            </div>
            <form onSubmit={handleSubmit} className="chat-input-form">
              <input
                type="text"
                className="form-control"
                placeholder="Escribe un mensaje..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatAlumno;
