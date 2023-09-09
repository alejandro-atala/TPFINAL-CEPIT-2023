import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BloqueDeCarga = () => {
  const [textos, setTextos] = useState([]);
  const [nuevoTexto, setNuevoTexto] = useState('');
  const [Referencia, setNombreReferencia] = useState('');
  const [imagen, setImagen] = useState(null);
  const [textoSeleccionado, setTextoSeleccionado] = useState({ Referencia: '', texto: '' });

  useEffect(() => {
    // Realiza una solicitud GET para obtener todos los textos al cargar el componente
    axios.get('http://localhost:3000/carga')
      .then((response) => {
        setTextos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener textos:', error);
      });
  }, []);

  // Función para cargar los detalles del texto seleccionado
  const cargarDetalleTexto = (referenciaSeleccionada) => {
    // Realiza una solicitud GET para obtener el texto por su referencia
    axios.get(`http://localhost:3000/carga/${referenciaSeleccionada}`)
      .then((response) => {
        console.log(response.data);
        setTextoSeleccionado(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener el detalle del texto:', error);
      });
  };

  const handleGuardarTexto = () => {
    // Realiza una solicitud POST para crear un nuevo texto con nombre de referencia
    axios.post('http://localhost:3000/carga/text', { referencia: Referencia, texto: nuevoTexto })
      .then((response) => {
        setTextos([...textos, response.data]);
        setNuevoTexto('');
        setNombreReferencia('');
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
        setTextoSeleccionado({ Referencia: '', texto: '' }); // Limpia el texto seleccionado después de borrarlo
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
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Imagen guardada con éxito:', response.data);

      // Puedes manejar la URL de la imagen guardada si es necesario.

    } catch (error) {
      console.error('Error al guardar la imagen:', error);
    }
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
  };

  const handleSeleccionarTexto = (referenciaSeleccionada) => {
    // Cargar los detalles del texto seleccionado
    cargarDetalleTexto(referenciaSeleccionada);
  };

  return (
    <div>
      <div>
        <select onChange={(e) => handleSeleccionarTexto(e.target.value)}>
          <option value="">Selecciona un texto</option>
          {textos.map((texto) => (
            <option key={texto.id} value={texto.Referencia}>
              {texto.referencia}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nombre de Referencia"
          value={textoSeleccionado.referencia}
          onChange={(e) => setTextoSeleccionado({ ...textoSeleccionado, Referencia: e.target.value })}
        />
        <input
          type="text"
          placeholder="Texto"
          value={textoSeleccionado.texto}
          onChange={(e) => setTextoSeleccionado({ ...textoSeleccionado, texto: e.target.value })}
        />
        <button onClick={handleGuardarTexto}>Guardar Texto</button>
        <button onClick={() => handleBorrarTexto(textoSeleccionado.id)}>Borrar Texto</button>
      </div>

      <div>
        <input type="file" accept="image/*" onChange={handleImagenChange} />
        <button onClick={handleGuardarImagen}>Guardar Imagen</button>
      </div>
    </div>
  );
};

export default BloqueDeCarga;
