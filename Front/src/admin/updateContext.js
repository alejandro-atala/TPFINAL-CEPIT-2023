// En el archivo updateContext.js

import React, { createContext, useState } from 'react';

const ContentContext = createContext();

const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({}); // Define el estado para content
  const [updateContent, setUpdateContent] = useState(() => {
    // Define la función para actualizar content
    return (newContent) => {
      setContent(newContent);
    };
  });

  return (
    <ContentContext.Provider value={{ content, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export { ContentContext, ContentProvider };

