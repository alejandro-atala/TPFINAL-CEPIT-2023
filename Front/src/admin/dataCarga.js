import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Form } from 'react-bootstrap';
import MateriasList from '../PaginaProfe/Materias/materiasList';


const BloqueDeCarga = () => {
  const [textos, setTextos] = useState([]);
  const [nuevoTexto, setNuevoTexto] = useState('');
  const [referencia, setReferencia] = useState(''); // Estado para la referencia seleccionada
  const [imagen, setImagen] = useState(null);
  const [nombreImagen, setNombreImagen] = useState('');
  const [textoSeleccionado, setTextoSeleccionado] = useState({ referencia: '', texto: '' });
  const [editing, setEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [imagenUrl, setImagenUrl] = useState('');


  const nombresDeReferencia = {
    Titulo_instituto: 'Nombre Instituto',
    Descripcion: 'Descripcion',
    Beneficios: 'Beneficios',
    Directora: 'Directora',
    Secretaria: 'Secretaria',
    Representante: 'Representante',
    Actos: 'Actos',
    Eventos: 'Eventos',
    Taller_1: 'Taller 1',
    Taller_2: 'Taller 2',
    Taller_3: 'Taller 3',
    Taller_4: 'Taller 4',
    Taller_5: 'Taller 5',
    Taller_6: 'Taller 6',
    Contacto: 'Contacto',
    // Agrega más nombres de referencia según tus necesidades
  };




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
        setEditing(false);
        if (response.data.texto) {

          setEditMode(true);
        } else {
          setTextoSeleccionado({ referencia: '', texto: '' });
          setEditMode(false);
        }
      })
      .catch((error) => {
        console.error('Error al obtener el detalle del texto:', error);
      });
  };


  const handleGuardarEditarTexto = () => {
    if (editMode) {
      editarDetalleTexto();
    } else {
      handleGuardarTexto();
    }
  };



  const editarDetalleTexto = () => {
    axios.put(`http://localhost:3000/carga/${textoSeleccionado.id}`, {
      referencia: referencia, // Usa el valor de referencia seleccionado
      texto: textoSeleccionado.texto,
    })
      .then(() => {
        setSuccessMessage('Texto actualizado con éxito');
        setErrorMessage('');
        // Ocultar el mensaje de éxito después de 2 segundos
        setTimeout(() => {
          setSuccessMessage('');
        }, 2000);
      })
      .catch(() => {
        setErrorMessage('Error al guardar el texto');
        setSuccessMessage('');
        // Ocultar el mensaje de error después de 2 segundos
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      });
  }

  const handleGuardarTexto = () => {
    if (!textoSeleccionado.texto.trim() || !referencia) {
      // El textarea está vacío, muestra un mensaje de error
      setErrorMessage('La referencia/texto no puede estar vacío');
      setSuccessMessage('');
      // Ocultar el mensaje de error después de 2 segundos
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return;
    }
    axios
      .post('http://localhost:3000/carga/text', {
        referencia: referencia, // Usa el valor de referencia seleccionado
        texto: textoSeleccionado.texto,
      })
      .then((response) => {
        setTextos([...textos, response.data]);
        setNuevoTexto('');
        setReferencia(''); // Limpia la referencia después de guardar
        setSuccessMessage('Texto guardado con éxito');
        setErrorMessage('');
        // Ocultar el mensaje de éxito después de 2 segundos
        setTimeout(() => {
          setSuccessMessage('');
        }, 2000);
      })
      .catch((error) => {
        console.error('Error al crear un texto:', error);
        setErrorMessage('Error al guardar el texto');
        setSuccessMessage('');
        // Ocultar el mensaje de error después de 2 segundos
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      });
  }


  const handleBorrarTexto = (id) => {
    axios.delete(`http://localhost:3000/carga/${id}`)
      .then(() => {
        const updatedTextos = textos.filter((texto) => texto.id !== id);
        setTextos(updatedTextos);
        setTextoSeleccionado({ referencia: '', texto: '' });
        setSuccessMessage('Texto borrado con éxito');
        setErrorMessage('');
        setTimeout(() => {
          setSuccessMessage('');
        }, 2000);
        setEditing(false); // Deshabilitar la edición después de borrar
      })
      .catch((error) => {
        console.error('Error al borrar un texto:', error);
        setErrorMessage('Error al borrar el texto');
        setSuccessMessage('');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      });
  };

  const handleGuardarImagen = async () => {
    try {
      // Crea un objeto FormData y agrega la imagen y el upload preset
      const formData = new FormData();
      formData.append('file', imagen); // 'imagen' debe ser el archivo seleccionado
      formData.append('upload_preset', 'dgmwrypk'); // Reemplaza con tu upload preset
  
      // Realiza una solicitud POST a la API de Cloudinary para cargar la imagen
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/difggjfxn/image/upload',
        formData
      );
  
      // Si la carga es exitosa, Cloudinary debería devolver información sobre la imagen
      console.log('Imagen guardada con éxito:', response.data);
  
      // La respuesta de Cloudinary debe contener la URL pública de la imagen
      const imageUrl = response.data.secure_url;
  
      // Actualiza los mensajes de éxito y error
      setSuccessMessage('Imagen guardada con éxito');
      setErrorMessage('');
  
      // Actualiza la URL de la imagen en tu estado local (si es necesario)
      setImagenUrl(imageUrl); // Debes tener un estado para almacenar la URL de la imagen
  
      // Oculta el mensaje de éxito después de 2 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
    } catch (error) {
      // Si ocurre un error al cargar la imagen, muestra un mensaje de error
      console.error('Error al guardar la imagen:', error);
      setErrorMessage('Error al guardar la imagen');
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <h4>Seleccione un campo para cargar su texto</h4>
          <select
            value={referencia}
            onChange={(e) => {
              setReferencia(e.target.value);
              cargarDetalleTexto(e.target.value);
            }}
            className="form-select mb-3"
          >
            <option value="">Selecciona un campo</option>
            {Object.keys(nombresDeReferencia).map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
          </select>

          <textarea
            type="text"
            placeholder="Texto"
            value={textoSeleccionado.texto}
            onChange={(e) => setTextoSeleccionado({ ...textoSeleccionado, texto: e.target.value })}
            className="form-control"
            style={{ height: '200px' }}
          />

          <button
            onClick={handleGuardarEditarTexto}
            className="btn btn-primary mt-3"
          >
            {editMode ? 'Guardar Edición' : 'Guardar'}
          </button>

          <button onClick={() => handleBorrarTexto(textoSeleccionado.id)} className="btn btn-danger mt-3 ms-2">
            Borrar Texto
          </button>

          <button onClick={handleGuardarImagen} className="btn btn-success mt-3">
  Guardar Imagen
</button>

<input
  type="file"
  accept="image/*"
  onChange={handleImagenChange}
  className="form-control-file"
/>



        </div>
        <div className='mt-2 '>
        <MateriasList />
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
      </div>
    </div>
  );
};

export default BloqueDeCarga;


