// Componente de búsqueda de emojis (EmojiSearch.js)
import React, { useState } from 'react';

function EmojiSearch({ onEmojiSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleEmojiSelect = (emoji) => {
    // Lógica para copiar el emoji seleccionado al portapapeles
    onEmojiSelect(emoji);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar emojis"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {/* Lista de emojis disponibles que coinciden con el término de búsqueda */}
        {emojis.map((emoji) => (
          <span key={emoji} onClick={() => handleEmojiSelect(emoji)}>
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
}

export default EmojiSearch;
