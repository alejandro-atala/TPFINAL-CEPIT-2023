import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatBubble from './burbujas';

const ChatProfesor = ({ onLogin }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  useEffect(() => {
    // Obtén el ID del profesor a partir de la prop onLogin
    const professorId = onLogin;
console.log(onLogin)
    if (professorId) {
      // Realiza una solicitud GET para obtener los mensajes dirigidos al profesor seleccionado
      axios.get(`http://localhost:3000/chat/${professorId}`)
        .then((response) => {
          setChatMessages(response.data);
        })
        .catch((error) => {
          console.error('Error al obtener los mensajes del profesor:', error);
        });
    }
  }, [onLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '' || selectedProfessor === null) return;

    try {
      const response = await axios.post('http://localhost:3000/chat/', {
        content: inputMessage,
        idAlumno: null, // Puedes establecer esto como nulo o algún valor que represente al profesor
        idProfesor: onLogin.idProfesor, // Utiliza el ID del profesor de la prop onLogin
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
            {/* Puedes omitir el campo de selección de profesor ya que ya tienes el profesor autenticado */}
            <h2>Chat con {onLogin}</h2>

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

export default ChatProfesor;
