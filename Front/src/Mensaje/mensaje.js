import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { UlMensajes, LiMensajeEnviado, LiMensajeRecibido } from './ui-components';
import './mensaje.css';
import { useUsuario } from '../usuarioContext'; // Importa el contexto del usuario

const socket = io('http://localhost:3000');

function Mensaje() {
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const { usuarioLogueado } = useUsuario(); // Accede al contexto del usuario logueado

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));

    socket.on('chat_message', (data) => {
      setMensajes((mensajes) => [...mensajes, data]);
    });

    return () => {
      socket.off('connect');
      socket.off('chat_message');
    };
  }, []);

  const enviarMensaje = () => {
    // Incluye el nombre del usuario logueado en el mensaje
    socket.emit('chat_message', {
      usuario: socket.id,
      message: nuevoMensaje,
      sender: usuarioLogueado.nombre, // Agrega el nombre del usuario
    });
    setNuevoMensaje('');
  };

  return (
    <div className="Chat">
      <h2>{isConnected ? 'NO CONECTADO' : 'CONECTADO'}</h2>
      <UlMensajes>
        {mensajes.map((mensaje, index) => (
          <React.Fragment key={index}>
            {mensaje.usuario === socket.id ? (
              <LiMensajeEnviado>{mensaje.message}</LiMensajeEnviado>
            ) : (
              <LiMensajeRecibido>{`${mensaje.sender}: ${mensaje.message}`}</LiMensajeRecibido>
            )}
          </React.Fragment>
        ))}
      </UlMensajes>
      <div className="InputContainer">
        <input
          type="text"
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
          className="TextInput"
          placeholder="Escribe un mensaje"
        />
        <button onClick={enviarMensaje} className="SendButton">
          Enviar
        </button>
      </div>
    </div>
  );
}

export default Mensaje;
