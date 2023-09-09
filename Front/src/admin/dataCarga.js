import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BloqueDeCarga = () => {
  const [textos, setTextos] = useState([]);
  const [nuevoTexto, setNuevoTexto] = useState('');
  const [Referencia, setNombreReferencia] = useState('');
  const [imagen, setImagen] = useState(null);
  const [textoSeleccionado, setTextoSeleccionado] = useState({ Referencia: '', texto: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/carga')
      .then((response) => {
        setTextos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener textos:', error);
      });
  }, []);

  const cargarDetalleTexto = (referenciaSeleccionada) => {
    axios.get(`http://localhost:3000/carga/${referenciaSeleccionada}`)
      .then((response) => {
        setTextoSeleccionado(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener el detalle del texto:', error);
      });
  };

  const handleGuardarTexto = () => {
    axios.post('http://localhost:3000/carga/text', { referencia: textoSeleccionado.Referencia, texto: textoSeleccionado.texto })
      .then((response) => {
        setTextos([...textos, response.data]);
        setNuevoTexto('');
        setNombreReferencia('');
        setSuccessMessage('Texto guardado con éxito');
        setErrorMessage('');
      })
      .catch((error) => {
        console.error('Error al crear un texto:', error);
        setErrorMessage('Error al guardar el texto');
        setSuccessMessage('');
      });
  };

  const handleBorrarTexto = (id) => {
    axios.delete(`http://localhost:3000/carga/${id}`)
      .then(() => {
        const updatedTextos = textos.filter((texto) => texto.id !== id);
        setTextos(updatedTextos);
        setTextoSeleccionado({ Referencia: '', texto: '' });
        setSuccessMessage('Texto borrado con éxito');
        setErrorMessage('');
      })
      .catch((error) => {
        console.error('Error al borrar un texto:', error);
        setErrorMessage('Error al borrar el texto');
        setSuccessMessage('');
      });
  };

  const handleGuardarImagen = async () => {
    try {
      const formData = new FormData();
      formData.append('imagen', imagen);

      const response = await axios.post('http://localhost:3000/carga/img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Imagen guardada con éxito:', response.data);
      setSuccessMessage('Imagen guardada con éxito');
      setErrorMessage('');
    } catch (error) {
      console.error('Error al guardar la imagen:', error);
      setErrorMessage('Error al guardar la imagen');
      setSuccessMessage('');
    }
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
  };

  const handleSeleccionarTexto = (referenciaSeleccionada) => {
    cargarDetalleTexto(referenciaSeleccionada);
  };

  return (
    <div>
       {successMessage && (
        <div className="alert alert-success text-center d-flex align-items-center" role="alert">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-danger text-center d-flex align-items-center" role="alert">
          {errorMessage}
        </div>
      )}

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
          value={textoSeleccionado.Referencia}
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
