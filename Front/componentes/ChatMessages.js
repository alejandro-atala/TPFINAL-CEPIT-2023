import React from 'react';
import './whatsapp-chat.css'// Importa tu archivo CSS con los estilos

function ChatMessages({ messages }) {
  return (
    <div>
      <ul className="chat-messages-list"> {/* Agrega una clase para aplicar los estilos */}
        {messages.map((message, index) => (
          <li
            key={index}
            className={`chat-message-item ${message.isOwn ? 'Message--own' : 'Message--chat'}`}
          >
            {message.user}: {message.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatMessages;
