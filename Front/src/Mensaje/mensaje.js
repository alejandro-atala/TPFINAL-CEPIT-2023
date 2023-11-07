import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import {
  ChatPrivado,
  UlMensajes,
  LiMensajeEnviado,
  InputContainer,
  ListaMensajes,
  LiMensajeRecibido,
} from './ui-components';
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteOption, setDeleteOption] = useState(null);
  const [deletedMessagesForMe, setDeletedMessagesForMe] = useState(new Set());
  const [mensajesEliminadosParaMi, setMensajesEliminadosParaMi] = useState(
    new Set(),
  );
  const messagesRef = useRef(null);

  useEffect(() => {
    // Cargar la lista de usuarios al montar el componente
    fetch('http://localhost:3000/usuario')
      .then((response) => response.json())
      .then((data) => {
        const usuariosExcluyendoActual = data.filter(
          (usuario) => usuario.nombre !== usuarioLogueado?.nombre,
        );
        setUsuariosTotales(usuariosExcluyendoActual);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de usuarios', error);
      });

    // Establecer la conexión con el servidor de sockets
    if (!socket && usuarioLogueado?.id) {
      const newSocket = io('http://localhost:3000', {
        query: { usuario: usuarioLogueado.nombre },
      });

      newSocket.on('connect', () => {
        console.log('WebSocket conectado');
      });

      newSocket.on('chat_message', handleChatMessage);
      newSocket.on('connected_users', handleConnectedUsers);

      setSocket(newSocket);
    } else if (socket) {
      // Lógica de reconexión o manejo de la conexión existente
      // Por ejemplo, puedes manejar la reconexión en caso de que la conexión se corte.
      socket.on('disconnect', () => {
        console.log('WebSocket desconectado');
        // Puedes agregar lógica para reconectar aquí si la conexión se pierde.
        // Por ejemplo, volver a conectarse automáticamente después de un tiempo.
      });
    }
  }, [socket, usuarioLogueado?.id, usuarioLogueado?.nombre]);

  
  const fetchPreviousMessages = async (senderId, receiverId) => {
    try {
      const response = await fetch(`http://localhost:3000/messages/previous/${senderId}/${receiverId}`);
  
      if (response.ok) {
        const data = await response.json();
  
        if (Array.isArray(data) && data.length > 0) {
          return data; // Devuelve los mensajes previos como un array
        } else {
          console.log('No hay mensajes anteriores en la base de datos.');
          return [];
        }
      } else {
        console.error('Error al cargar mensajes anteriores', response);
        return [];
      }
    } catch (error) {
      console.error('Error al realizar la solicitud GET', error);
      return [];
    }
  };

  useEffect(() => {
    if (usuarioLogueado?.id && chatDestino) {
      if (!mensajesCargados) {
        fetchPreviousMessages(usuarioLogueado.id, usuarioReceptor.idUsuario).then((loadedMessages) => {
          if (Array.isArray(loadedMessages)) {
            const mensajesActualizados = loadedMessages.map((mensaje) => ({
              ...mensaje,
              esMensajeEnviado: mensaje.senderId === usuarioLogueado?.id,
            }));
            setChatMensajes((mensajes) => [...mensajes, ...mensajesActualizados]);
            setMensajesCargados(true);
          } else {
            console.error('loadedMessages no es un array válido:', loadedMessages);
          }
        });
      }
    }
  }, [chatDestino, usuarioLogueado?.id, usuarioReceptor, mensajesCargados]);
  

  const handleChatMessage = (data) => {
    console.log('Mensaje recibido:', data);

    const messageExists = chatMensajes.some((mensaje) => mensaje.id === data.id);

    if (!messageExists) {
      const esMensajeEnviado = data.senderId === usuarioLogueado?.id;
      const nuevoMensaje = {
        ...data,
        esMensajeEnviado: esMensajeEnviado,
        eliminado: false,
      };

      setChatMensajes((mensajes) => [...mensajes, nuevoMensaje]);
    }
    scrollToBottom();
  };

  const handleConnectedUsers = (userNames) => {
    const filteredUsers = userNames.filter(
      (name) => name !== usuarioLogueado?.nombre,
    );
    setUsuariosConectados(filteredUsers);
    console.log('Usuarios conectados:', filteredUsers);
  };

  const iniciarChatConUsuario = (usuario) => {
    console.log('Iniciar chat con usuario:', usuario);
    if (usuario !== chatDestino) {

  
      // Limpiar la selección de mensajes al iniciar una conversación
      setSelectedMessages(new Set());
  
      const mensajesActuales = chatMensajes.slice(); // Crea una copia de los mensajes actuales
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
  };

   const enviarPrimerMensaje = async () => {
    if (chatDestino && nuevoMensaje && usuarioLogueado && usuarioReceptor) {
      // Enviar el primer mensaje
      const messageData = {
        content: nuevoMensaje,
        senderId: usuarioLogueado.id,
        receiverId: usuarioReceptor.idUsuario,
        timestamp: new Date().getTime(),
      };

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

          // Cargar mensajes previos después de enviar el primer mensaje
          const loadedMessages = await fetchPreviousMessages(
            usuarioLogueado.id,
            usuarioReceptor.idUsuario
          );

          if (Array.isArray(loadedMessages)) {
            const mensajesActualizados = loadedMessages.map((mensaje) => ({
              ...mensaje,
              esMensajeEnviado: mensaje.senderId === usuarioLogueado?.id,
            }));
            setChatMensajes(mensajesActualizados);
            setMensajesCargados(true);
          } else {
            console.error('loadedMessages no es un array válido:', loadedMessages);
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
      if (!mensajesCargados) {
        // Si no hay mensajes previos cargados, cargarlos antes de enviar el primer mensaje
        enviarPrimerMensaje();
      }

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

  const openDeleteModal = (option) => {
    setShowDeleteModal(true);
    setDeleteOption(option);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteOption(null);
  };

  const toggleMessageSelection = (messageId) => {
    setSelectedMessages((selected) => {
      const newSelectedMessages = new Set(selected);
  
      if (newSelectedMessages.has(messageId)) {
        newSelectedMessages.delete(messageId);
      } else {
        newSelectedMessages.add(messageId);
      }
  
      return newSelectedMessages;
    });
  };
  
  

  const handleDelete = async (option) => {
    if (selectedMessages.size > 0) {
      const selectedMessagesArray = Array.from(selectedMessages);

      for (const messageId of selectedMessagesArray) {
        if (typeof messageId === 'number') {
          const messageToDelete = chatMensajes.find(
            (mensaje) => mensaje.id === messageId,
          );

          if (messageToDelete) {
            try {
              if (option === 'deleteForMe') {
                // Agrega el ID del mensaje a mensajesEliminadosParaMi
                setMensajesEliminadosParaMi(
                  (prevSet) => new Set([...prevSet, messageId]),
                );
                // Enviar solicitud para marcar el mensaje como eliminado para ti en el servidor
                const response = await fetch(
                  `http://localhost:3000/messages/${messageId}`,
                  {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ eliminado: 1 }), // Marcar el mensaje como eliminado para ti
                  },
                );

                if (response.ok) {
                  console.log(
                    'Mensaje marcado como eliminado para ti con éxito en la base de datos',
                  );
                  // Agregar el mensaje a la lista de mensajes eliminados para ti en el estado local
                  setDeletedMessagesForMe(
                    new Set([...deletedMessagesForMe, messageId]),
                  );

                  // Eliminar el mensaje del estado local
                  const updatedMessages = chatMensajes.filter(
                    (mensaje) => mensaje.id !== messageId,
                  );
                  setChatMensajes(updatedMessages);
                } else {
                  console.error(
                    'Error al marcar el mensaje como eliminado para ti en la base de datos',
                    response,
                  );
                }
              }

              if (option === 'deleteForAll') {
                // Enviar solicitud para eliminar el mensaje de la base de datos
                const response = await fetch(
                  `http://localhost:3000/messages/${messageId}`,
                  {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  },
                );

                if (response.ok) {
                  console.log(
                    'Mensaje eliminado con éxito de la base de datos',
                  );
                  // Eliminar el mensaje del estado local
                  const updatedMessages = chatMensajes.filter(
                    (mensaje) => mensaje.id !== messageId,
                  );
                  setChatMensajes(updatedMessages);
                } else {
                  console.error(
                    'Error al eliminar el mensaje de la base de datos',
                    response,
                  );
                }
              }
            } catch (error) {
              console.error(
                'Error al eliminar el mensaje en el servidor',
                error,
              );
            }
          }
        }
      }

      // Limpia los mensajes seleccionados y oculta el modal
      setSelectedMessages(new Set());
      closeDeleteModal();
    } else {
      // No hay mensajes seleccionados, muestra la advertencia
      setShowSelectionWarning(true);

      // Luego, puedes ocultar la advertencia después de unos segundos si lo deseas
      setTimeout(() => {
        setShowSelectionWarning(false);
      }, 3000);
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
          <button onClick={cerrarChat} className="CerrarButton m-2">
            Cerrar Chat
          </button>
          <button
            onClick={() => openDeleteModal('deleteForMe')}
            className="eliminarSeleccionados"
          >
            Eliminar Seleccionados
          </button>
          <ChatPrivado ref={chatPrivadoRef}>
            <UlMensajes>
              <ListaMensajes>
              {chatMensajes.map((mensaje, index) => {
  const mensajeId = mensaje.id || `mensaje-${index}`;
                  console.log('Procesando mensaje:', mensaje.id);
                  // Agregar una condición para mostrar mensajes eliminados al receptor
                  if (
                    !mensaje.eliminado ||
                    (mensaje.eliminado &&
                      mensaje.receiverId === usuarioLogueado?.id)
                  ) {
                    const esMensajeEnviado = mensaje.esMensajeEnviado;
                    const contenido = mensaje.content;
                    const horaMinutos = formatTimestamp(mensaje.timestamp);
                    const messageClass = Array.from(selectedMessages).includes(
                      mensaje.id,
                    )
                      ? 'Mensaje MensajeSeleccionado'
                      : 'Mensaje';

                    return (
                      <div
                      key={mensajeId}
                      className={messageClass}
                      onClick={() => chatDestino && esMensajeEnviado ? toggleMessageSelection(mensaje.id) : null}
                    >
                        {esMensajeEnviado ? (
                          <LiMensajeEnviado>
                            <div className="MensajeContenido ">{contenido}</div>
                            <div className="HoraMensajeEnviado">
                              {horaMinutos}
                            </div>
                          </LiMensajeEnviado>
                        ) : (
                          <LiMensajeRecibido>
                            <span className="NombreRemitente">
                              {usuarioReceptor?.nombre}
                            </span>
                            <div className="MensajeContenido">{contenido}</div>
                            <div className="HoraMensajeRecibido">
                              {horaMinutos}
                            </div>
                          </LiMensajeRecibido>
                        )}
                      </div>
                    );
                  }
                })}
              </ListaMensajes>
            </UlMensajes>
          </ChatPrivado>
          {showDeleteModal && (
            <div className="DeleteModal">
              <p className="leyendaeliminar">
                ¿Qué deseas hacer con los mensajes seleccionados?
              </p>
              <button
                onClick={() => handleDelete('deleteForMe')}
                className="eliminarParaMi"
              >
                Eliminar para mí
              </button>
              <button
                onClick={() => handleDelete('deleteForAll')}
                className="eliminarParaTodos"
              >
                Eliminar para todos
              </button>
              <button onClick={closeDeleteModal} className="cancelar">
                Cancelar
              </button>
            </div>
          )}
          <div className="InputContainer ">
            <input
              type="text"
              value={nuevoMensaje}
              onChange={(e) => setNuevoMensaje(e.target.value)}
              className="TextInput"
              placeholder="Escribe un mensaje"
            />
            <button onClick={enviarMensaje} className="SendButton m-2">
              Enviar
            </button>
          </div>
          {showSelectionWarning && (
            <div className="SelectionWarning">
              ¡Selecciona al menos un mensaje para eliminar!
            </div>
          )}
        </div>
      ) : (
        <div className="UsuariosConectados ">
          <ul className="UsuariosList ">
            {usuariosTotales.map((usuario) => (
              <li key={usuario.idUsuario} className="mb-1">
                <button
                  onClick={() => iniciarChatConUsuario(usuario.nombre)}
                  className="SendButton"
                >
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
