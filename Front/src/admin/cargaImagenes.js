
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Form } from 'react-bootstrap';


const CargaImagenes = () => {



  const [imagen, setImagen] = useState(null);
  const [nombrePagina, setNombrePagina] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [imagenThumbnailUrl, setImagenThumbnailUrl] = useState(null); // Nuevo estado para la miniatura de la imagen
  const [miniaturaVisible, setMiniaturaVisible] = useState(true); // Estado para controlar la visibilidad de la miniatura
  const [imagenMiniaturaUrl, setImagenMiniaturaUrl] = useState('');




  const obtenerUrlImagenExistente = async (nombrePagina) => {
    try {
      const response = await axios.get(`http://localhost:3000/imagenes/nombre/${nombrePagina}`);
  
      if (response.data) {
        const imageUrl = response.data.url;
  
        // Actualiza la miniatura con la URL obtenida
        setImagenThumbnailUrl(imageUrl);
      } else {
        setImagenThumbnailUrl(''); // Si no hay URL, limpia la miniatura
      }
    } catch (error) {
      console.error('Error al obtener la URL de la imagen existente:', error);
    }
  };

  const handleGuardarImagen = async () => {
    if (!imagen || !nombrePagina) {
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
      setImagenThumbnailUrl(imageUrl); // Set thumbnail URL to the saved image
      setMiniaturaVisible(true); // Make thumbnail visible
  
      setTimeout(() => {
        setImagenThumbnailUrl('');
        setMiniaturaVisible(false); // Hide the image after 2 seconds
      }, 3000);
  
      setImagen(null); // Limpia la imagen actual después de guardar
      setNombrePagina('');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
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
    if (!nombrePagina || !imagenThumbnailUrl) {
      // Verificar si se ha seleccionado una imagen para borrar
      setErrorMessage('Debes seleccionar una imagen para borrar ó no hay imagenes cargadas');
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
      setMiniaturaVisible(false);
      setImagenThumbnailUrl(null); // Limpia la miniatura
  
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
    setMiniaturaVisible(true);
    setImagenThumbnailUrl(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagenMiniaturaUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };
  
  


  const handleNombrePaginaChange = (e) => {
    setMiniaturaVisible(true);
    const selectedName = e.target.value;
    setNombrePagina(selectedName);
    if (selectedName) {
    
      obtenerUrlImagenExistente(selectedName);
    } else {
      setImagenThumbnailUrl(null); // Si no hay nombre seleccionado, reinicia la miniatura
    }
  };
  
  
  

  return (
    <div>

      <h4>Carga de imagenes</h4>
      <select
  value={nombrePagina}
  onChange={handleNombrePaginaChange} // Llama a la función al cambiar el nombre de la página
  className="form-select mb-3 w-25"
>

        <option value="">Selecciona una página</option>
        <option value="Home1">Home 1</option>
        <option value="Home2">Home 2</option>
        <option value="Home3">Home 3</option>
        <option value="directora">Directora</option>
        <option value="secretaria">Secretaria</option>
        <option value="representante">Representante</option>
        <option value="taller1">Taller 1</option>
        <option value="taller2">Taller 2</option>
        <option value="taller3">Taller 3</option>
        <option value="taller4">Taller 4</option>
        <option value="taller5">Taller 5</option>
        <option value="taller6">Taller 6</option>
        <option value='proyectoImagen1'> Proyecto Imagen 1</option>
        <option value='proyectoImagen2'> Proyecto Imagen 2</option> 
        <option value='proyectoImagen3'> Proyecto Imagen 3</option>
        <option value='imagenReglamento1'> Reglamento Imagen 1 </option>
        <option value='imagenReglamento2'> Reglamento Imagen 2 </option>
        <option value='imagenReglamento3'> Reglamento Imagen 3 </option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={handleImagenChange}
        className="form-control-file"
      />
        
        {imagenThumbnailUrl && <h6>Imagen cargada </h6>}
      {imagenThumbnailUrl && (
        <img
          src={imagenThumbnailUrl}
          alt="Miniatura de la imagen"
          style={{ width: '150px', height: '100px' }}
        />
      )}


      <br></br>

      <button onClick={handleGuardarImagen} className="btn btn-success mt-3 ">
        Guardar Imagen
      </button>

      <button onClick={handleBorrarImagen} className="btn btn-danger mt-3 ms-2">
        Borrar Imagen
      </button>
      {successMessage && (
        <Alert variant="success" className="text-center mt-3">
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert variant="danger" className="text-center mt-3">
          {errorMessage}
        </Alert>
      )}
    </div>
  )


}

export default CargaImagenes