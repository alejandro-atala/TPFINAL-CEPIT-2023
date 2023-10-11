import styled from 'styled-components';

const UlMensajes = styled.ul`
  max-width: 400px;
  margin: 0 auto;
  background-color: #f8faf6;
  padding: 20px;
  border-radius: 10px;
  font-weight: bold;
  color: #007bff;
`;

const LiMensaje = styled.li`
  margin-bottom: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 10px;
  color: #333;
`;

const LiMensajeEnviado = styled(LiMensaje)`
  background-color: #8cf33d; /* Color de fondo verde para mensajes enviados */
  text-align: right; /* Alinea el texto a la derecha */
`;

const LiMensajeRecibido = styled(LiMensaje)`
  background-color: #ffc107; /* Color de fondo amarillo para mensajes recibidos */
  text-align: left; /* Alinea el texto a la izquierda */
`;

export {
  UlMensajes,
  LiMensaje,
  LiMensajeEnviado,
  LiMensajeRecibido,
};