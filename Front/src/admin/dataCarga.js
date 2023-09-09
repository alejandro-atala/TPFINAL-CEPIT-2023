import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BloqueDeCarga = () => {
  const [textos, setTextos] = useState([]);
  const [nuevoTexto, setNuevoTexto] = useState(''); // Agregado para el nuevo texto
  const [imagen, setImagen] = useState(null); // Agregado para la imagen

  useEffect(() => {
    // Realiza una solicitud GET para obtener todos los textos al cargar el componente
    axios.get('http://localhost:3000/carga/text')
      .then((response) => {
        setTextos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener textos:', error);
      });
  }, []);

  const handleGuardarTexto = () => {
    // Realiza una solicitud POST para crear un nuevo texto
    //console.log( nuevoTexto)
    axios.post('http://localhost:3000/carga/text',  { texto: nuevoTexto })
      .then((response) => {
        setTextos([...textos, response.data]);
        setNuevoTexto(''); // Limpia el campo de texto después de guardar
      })
      .catch((error) => {
        console.error('Error al crear un texto:', error);
      });
  };

  const handleBorrarTexto = (id) => {
    // Realiza una solicitud DELETE para eliminar un texto por su ID
    axios.delete(`http://localhost:3000/carga/${id}`)
      .then(() => {
        const updatedTextos = textos.filter((texto) => texto.id !== id);
        setTextos(updatedTextos);
      })
      .catch((error) => {
        console.error('Error al borrar un texto:', error);
      });
  };

  const handleGuardarImagen = async () => {
    try {
      // Crea un objeto FormData para enviar la imagen al servidor
      const formData = new FormData();
      formData.append('imagen', imagen);

      // Realiza una solicitud POST para guardar la imagen
      const response = await axios.post('http://localhost:3000/carga/img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Importante establecer el encabezado correcto
        },
      });

      // Si la solicitud se completa con éxito, puedes manejar la respuesta si es necesario.
      console.log('Imagen guardada con éxito:', response.data);

      // Aquí debes decidir cómo manejar la URL de la imagen guardada, si es necesario.
      // Puedes guardarla en el estado o realizar alguna otra acción.

    } catch (error) {
      console.error('Error al guardar la imagen:', error);
    }
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
  };

  return (
    <div>
      {/* Sección de texto */}
      <div>
        <input type="text" placeholder="Texto" value={nuevoTexto} onChange={(e) => setNuevoTexto(e.target.value)} />
        <button onClick={handleGuardarTexto}>Guardar Texto</button>
        {/* Agrega el botón de Editar Texto y su lógica si lo deseas */}
        {/* <button onClick={() => handleEditarTexto()}>Editar Texto</button> */}
        <button onClick={() => handleBorrarTexto()}>Borrar Texto</button>
      </div>

      {/* Sección de imagen */}
      <div>
        <input type="file" accept="image/*" onChange={handleImagenChange} />
        <button onClick={handleGuardarImagen}>Guardar Imagen</button>
      </div>
    </div>
  );
};

export default BloqueDeCarga;
