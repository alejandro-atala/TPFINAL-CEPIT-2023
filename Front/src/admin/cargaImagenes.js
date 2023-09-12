
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Form } from 'react-bootstrap';


const CargaImagenes = () => {

    const [textos, setTextos] = useState([]);
    const [nuevoTexto, setNuevoTexto] = useState('');
    const [referencia, setReferencia] = useState(''); // Estado para la referencia seleccionada
    const [imagen, setImagen] = useState(null);
    const [nombrePagina, setNombrePagina] = useState('');
    const [textoSeleccionado, setTextoSeleccionado] = useState({ referencia: '', texto: '' });
    const [editing, setEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [imagenUrl, setImagenUrl] = useState('');
    const [nombreImagenABorrar, setNombreImagenABorrar] = useState('');

    
    const handleGuardarImagen = async () => {
        if (!imagen || !nombrePagina) {
          // Verificar si no se ha seleccionado una imagen o asignado un nombre
          setErrorMessage('Debes seleccionar una imagen y asignar un nombre antes de guardarla');
          setTimeout(() => {
            setErrorMessage('');
          }, 2000);
          return;
        }
    
        try {
    
          const formData = new FormData();
          formData.append('file', imagen);
          formData.append('upload_preset', 'dgmwrypk');
    
    
          const response = await axios.post(
            'https://api.cloudinary.com/v1_1/difggjfxn/image/upload/',
            formData
          );
    
          console.log('Imagen guardada con éxito:', response.data);
    
          const imageUrl = response.data.secure_url;
    
    
          const responseDB = await axios.post('http://localhost:3000/imagenes', {
            nombre: nombrePagina,
            url: imageUrl,
          });
    
    
          setSuccessMessage('Imagen guardada con éxito');
          setErrorMessage('');
          setImagenUrl(imageUrl);
    
          setTimeout(() => {
            setSuccessMessage('');
          }, 2000);
        } catch (error) {
    
          console.error('Error al guardar la imagen:', error);
          setErrorMessage('Error al guardar la imagen');
          setSuccessMessage('');
    
          setTimeout(() => {
            setErrorMessage('');
          }, 2000);
        }
      };
    
    
      const handleBorrarImagen = async () => {
        if (!nombrePagina) {
          // Verificar si se ha seleccionado una imagen para borrar
          setErrorMessage('Debes seleccionar una imagen para borrar');
          setTimeout(() => {
            setErrorMessage('');
          }, 2000);
          return;
        }
      
        try {
          // Realiza una solicitud DELETE a la API para eliminar la imagen por nombre
          const response = await axios.delete(`http://localhost:3000/imagenes/nombre/${nombrePagina}`);
          console.log('Imagen borrada con éxito:', response.data);
      
          // Actualiza los mensajes de éxito y error
          setSuccessMessage('Imagen borrada con éxito');
          setErrorMessage('');
      
          // Limpia el nombre de la imagen seleccionada
          setNombrePagina('');
      
          // Oculta el mensaje de éxito después de 2 segundos
          setTimeout(() => {
            setSuccessMessage('');
          }, 2000);
        } catch (error) {
          // Si ocurre un error al borrar la imagen, muestra un mensaje de error
          console.error('Error al borrar la imagen:', error);
          setErrorMessage('Error al borrar la imagen');
          setSuccessMessage('');
      
          // Oculta el mensaje de error después de 2 segundos
          setTimeout(() => {
            setErrorMessage('');
          }, 2000);
        }
      };
      
    
      const handleImagenChange = (e) => {
        const file = e.target.files[0];
        setImagen(file);
      };

      

  return (
    <div>
      
<h4>Carga de imagenes</h4>
          <select
            value={nombrePagina}
            onChange={(e) => setNombrePagina(e.target.value)}
            className="form-select mb-3 w-25"
          >
            <option value="">Selecciona una página</option>
            <option value="home1">Home 1</option>
            <option value="home2">Home 2</option>
            <option value="home3">Home 3</option>
            <option value="directora">Directora</option>
            <option value="secretaria">Secretaria</option>
            <option value="representante">Representante</option>
            <option value="taller1">Taller 1</option>
            <option value="taller2">Taller 2</option>
            <option value="taller3">Taller 3</option>
            <option value="taller4">Taller 4</option>
            <option value="taller5">Taller 5</option>
            <option value="taller6">Taller 6</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleImagenChange}
            className="form-control-file"
          />

<br></br>

<button onClick={handleGuardarImagen} className="btn btn-success mt-3">
            Guardar Imagen
          </button>

          <button onClick={handleBorrarImagen} className="btn btn-danger mt-3">
  Borrar Imagen
</button>
{successMessage && (
            <Alert variant="success" className="text-center">
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert variant="danger" className="text-center">
              {errorMessage}
            </Alert>
          )}
    </div>
  )

  
}

export default CargaImagenes
