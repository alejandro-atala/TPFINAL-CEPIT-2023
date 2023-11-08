import styled from 'styled-components';

const UlMensajes = styled.ul`
  max-width: 400px;
  margin: 0 auto;
  background-color: #f8faf6;
  padding: 20px;
  border-radius: 10px;
  color: #007bff;
    background-image: url('https://mcdn.wallpapersafari.com/medium/77/16/Nkc7Xe.jpg');
        min-height: 400px;
`;

const LiMensaje = styled.li`
  margin-bottom: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  font-size: 16px;
  padding: 6px;
  color: #333;
`;

const LiMensajeEnviado = styled(LiMensaje)`
background-color: rgba(0, 255, 0, 0.2); /* Fondo verde transparente para mensajes enviados */
  text-align: right;
`;

const LiMensajeRecibido = styled(LiMensaje)`
background-color: rgba(0, 123, 255, 0.2); /* Fondo azul transparente para mensajes recibidos */
  text-align: left;
`;

export {
  UlMensajes,
  LiMensaje,
  LiMensajeEnviado,
  LiMensajeRecibido,
};

export const ChatPrivado = styled.div`
  max-height: 400px;
  overflow-y: auto;

`;

export const ListaMensajes = styled.ul`
  padding: 0;
  list-style: none;
  
`;

export const Mensaje = styled.li`
  background-color: #DCF8C6;
  padding: 8px;
  margin: 4px;
  border-radius: 5px;
`;

