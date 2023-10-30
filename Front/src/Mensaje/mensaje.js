import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { ChatPrivado, UlMensajes, LiMensajeEnviado, InputContainer, ListaMensajes, LiMensajeRecibido } from './ui-components';
import './mensaje.css';
import { useUsuario } from '../usuarioContext';

function Mensaje() {
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [chatDestino, setChatDestino] = useState(null);
  const [chatAbierto, setChatAbierto] = useState(false);
  const [chatMensajes, setChatMensajes] = useState([]);
  const { usuarioLogueado } = useUsuario();
  const [socket, setSocket] = useState(null);
  const [usuariosTotales, setUsuariosTotales] = useState([]);
  const [usuarioReceptor, setUsuarioReceptor] = useState(null);
  const [usuariosConectados, setUsuariosConectados] = useState([]);
  const [mensajesCargados, setMensajesCargados] = useState(false);
  const [showSelectionWarning, setShowSelectionWarning] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState(new Set());
  
  const messagesRef = useRef(null);

  useEffect(() => {
    // Cargar la lista de usuarios al montar el componente
    fetch('http://localhost:3000/usuario')
      .then((response) => response.json())
      .then((data) => {
        const usuariosExcluyendoActual = data.filter((usuario) => usuario.nombre !== usuarioLogueado?.nombre);
        setUsuariosTotales(usuariosExcluyendoActual);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de usuarios', error);
      });

    // Establecer la conexión con el servidor de sockets
    if (usuarioLogueado?.id) {
      const newSocket = io('http://localhost:3000', {
        query: { usuario: usuarioLogueado.nombre },
      });

      newSocket.on('connect', () => {
        console.log('WebSocket conectado');
        setIsConnected(true);
      });

      newSocket.on('chat_message', handleChatMessage);
      newSocket.on('connected_users', handleConnectedUsers);

      setSocket(newSocket);
    }
  }, [usuarioLogueado?.id, usuarioLogueado?.nombre]);

  const fetchPreviousMessages = async (senderId, receiverId) => {
    if (usuarioReceptor) {
      try {
        const response = await fetch(`http://localhost:3000/messages/previous/${senderId}/${receiverId}`);
        if (response.ok) {
          const data = await response.json();
          // Modificar la lógica de esMensajeEnviado
          const mensajesOrdenados = data.map((mensaje) => ({
            ...mensaje,
            esMensajeEnviado: mensaje.senderId === usuarioLogueado?.id,
          }));
          if (mensajesOrdenados.length > 0) {
            console.log('Mensajes cargados:', mensajesOrdenados);
          }
          
          setChatMensajes(mensajesOrdenados);
        } else {
          console.error('Error al cargar mensajes anteriores');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud GET', error);
      }
    } else {
      console.error('usuarioReceptor es undefined');
    }
    setTimeout(() => {
      setShowSelectionWarning(false);
    }, 3000); // Oculta la advertencia después de 3 segundos (puedes ajustar el tiempo según tus preferencias)
  
  };

  useEffect(() => {
    if (usuarioLogueado?.id && chatDestino) {
      if (chatMensajes.length === 0 && !mensajesCargados) {
        // Solo cargar mensajes si no hay mensajes existentes en el estado
        fetchPreviousMessages(usuarioLogueado.id, usuarioReceptor.idUsuario);
      }
    }
  }, [chatDestino, usuarioLogueado?.id, usuarioReceptor, chatMensajes]);

  const handleChatMessage = (data) => {
    console.log('Mensaje recibido:', data);

    const messageExists = chatMensajes.some((mensaje) => mensaje.id === data.id);

    if (!messageExists) {
      const esMensajeEnviado = data.senderId === usuarioLogueado?.id;
      const nuevoMensaje = {
        ...data,
        esMensajeEnviado: esMensajeEnviado,
      };

      setChatMensajes((mensajes) => [...mensajes, nuevoMensaje]);
    }
    scrollToBottom();
  };

  const handleConnectedUsers = (userNames) => {
    const filteredUsers = userNames.filter((name) => name !== usuarioLogueado?.nombre);
    setUsuariosConectados(filteredUsers);
    console.log('Usuarios conectados:', filteredUsers);
  };

  const iniciarChatConUsuario = (usuario) => {
    if (usuario !== chatDestino) {
      console.log('Iniciar chat con usuario:', usuario);

      const mensajesActuales = chatMensajes;

      setChatDestino(usuario);

      const usuarioReceptor = usuariosTotales.find((u) => u.nombre === usuario);
      console.log('Usuario receptor:', usuarioReceptor);

      setUsuarioReceptor(usuarioReceptor);
      setChatMensajes(mensajesActuales);
      setChatAbierto(true);
    }
  };

  const cerrarChat = () => {
    if (chatDestino) {
      console.log('Cerrar chat con:', chatDestino);
    }
    setChatAbierto(false);
    setChatDestino(null);
    setChatMensajes([]);
  };

  const enviarMensaje = async () => {
    if (chatDestino && nuevoMensaje && usuarioLogueado && usuarioReceptor) {
      console.log('Enviar mensaje:', nuevoMensaje, 'a', chatDestino);
      const messageData = {
        content: nuevoMensaje,
        senderId: usuarioLogueado.id,
        receiverId: usuarioReceptor.idUsuario,
        timestamp: new Date().getTime(),
      };
      console.log('Mensaje a enviar:', messageData);

      try {
        const response = await fetch('http://localhost:3000/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
        });

        if (response.ok) {
          console.log('Mensaje guardado con éxito en la base de datos');
          if (socket) {
            socket.emit('chat_message', messageData);
            console.log('Mensaje emitido a través del socket');
          } else {
            console.error('Socket no está definido o es nulo');
          }
        } else {
          console.error('Error al guardar el mensaje en la base de datos');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud POST', error);
      }
      setNuevoMensaje('');
      scrollToBottom();
    }
  };

  const toggleMessageSelection = (messageId) => {
    // Copia el conjunto de mensajes seleccionados actual
    const newSelectedMessages = new Set(selectedMessages);

    if (newSelectedMessages.has(messageId)) {
      newSelectedMessages.delete(messageId);
    } else {
      newSelectedMessages.add(messageId);
    }

    setSelectedMessages(newSelectedMessages);
  };

  const deleteSelectedMessages = async () => {
    if (selectedMessages.size > 0) {
      const selectedMessagesArray = Array.from(selectedMessages);
  
      try {
        for (const messageId of selectedMessagesArray) {
          // Asegúrate de que messageId esté definido y sea un número antes de la solicitud de eliminación
          if (typeof messageId === 'number') {
            const response = await fetch(`http://localhost:3000/messages/${messageId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
  
            if (response.ok) {
              console.log('Mensaje eliminado con éxito');
              // Actualiza el estado de los mensajes eliminando el mensaje eliminado
              const remainingMessages = chatMensajes.filter((mensaje) => mensaje.id !== messageId);
              setChatMensajes(remainingMessages);
              // Limpia los mensajes seleccionados
              setSelectedMessages(new Set());
            } else {
              console.error('Error al eliminar el mensaje', response);
            }
          }
        }
      } catch (error) {
        console.error('Error al eliminar los mensajes', error);
      }
    } else {
      // No hay mensajes seleccionados, muestra la advertencia
      setShowSelectionWarning(true);
  
      // Luego, puedes ocultar la advertencia después de unos segundos si lo deseas
      setTimeout(() => {
        setShowSelectionWarning(false);
      }, 2000); // Oculta la advertencia después de 3 segundos (puedes ajustar el tiempo según tus preferencias)
    }
  };
  
  const formatTimestamp = (timestamp) => {
    if (!timestamp) {
      return '';
    }
    const date = new Date(timestamp);
    if (isNaN(date)) {
      return 'Marca de tiempo inválida';
    }
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const scrollToBottom = () => {
    if (chatPrivadoRef.current) {
      chatPrivadoRef.current.scrollTop = chatPrivadoRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMensajes]);
  
  const chatPrivadoRef = useRef();
  
  return (
    <div className="Chat">
      <h5 className={chatAbierto ? 'ChatTitle' : 'UsuariosConectados'}>
        <span className={chatAbierto ? 'TituloChat' : 'TituloUsuarios'}>
          {isConnected ? 'Usuarios' : 'No hay usuarios conectados'}
        </span>
      </h5>
      {chatAbierto ? (
        <div className="ChatContent">
          <h5 className="CenteredTitle">Estoy chateando con {chatDestino}</h5>
          <button onClick={cerrarChat} className="CerrarButton">
            Cerrar Chat
          </button>
          <button onClick={deleteSelectedMessages} className="EliminarButton">
            Eliminar Seleccionados
          </button>
          <ChatPrivado ref={chatPrivadoRef}>
            <UlMensajes>
              <ListaMensajes>
                {chatMensajes.map((mensaje, index) => {
                  const esMensajeEnviado = mensaje.esMensajeEnviado;
                  const contenido = mensaje.content;
                  const horaMinutos = formatTimestamp(mensaje.timestamp);
                  const messageClass = Array.from(selectedMessages).includes(mensaje.id)
                    ? 'Mensaje MensajeSeleccionado'
                    : 'Mensaje';

                  return (
                    <div
                      key={index}
                      className={messageClass}
                      onClick={() => toggleMessageSelection(mensaje.id)}
                    >
                      {esMensajeEnviado ? (
                        <LiMensajeEnviado onClick={() => toggleMessageSelection(mensaje.id)}>
                          <div className="MensajeContenido">{contenido}</div>
                          <div className="HoraMensajeEnviado">{horaMinutos}</div>
                        </LiMensajeEnviado>
                      ) : (
                        <LiMensajeRecibido onClick={() => toggleMessageSelection(mensaje.id)}>
                          <span className="NombreRemitente">{usuarioReceptor?.nombre}</span>
                          <div className="MensajeContenido">{contenido}</div>
                          <div className="HoraMensajeRecibido">{horaMinutos}</div>
                        </LiMensajeRecibido>
                      )}
                    </div>
                  );
                })}
              </ListaMensajes>
            </UlMensajes>
          </ChatPrivado>
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
          {showSelectionWarning && (
  <div className="SelectionWarning">¡Selecciona al menos un mensaje para eliminar!</div>
)}
        </div>
      ) : (
        <div className="UsuariosConectados">
          <ul className="UsuariosList">
            {usuariosTotales.map((usuario) => (
              <li key={usuario.idUsuario}>
                <button onClick={() => iniciarChatConUsuario(usuario.nombre)} className="SendButton">
                  {usuario.nombre}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Mensaje;