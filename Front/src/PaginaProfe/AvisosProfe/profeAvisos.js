import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profeavisos.css';
import { useUsuario } from '../../usuarioContext';

const AvisosProfe = () => {

  const cursosNombres = {
    1: 'Primero',
    2: 'Segundo',
    3: 'Tercero',
    4: 'cuarto',
    5: 'Quinto',
    6: 'exto',
  };

  const [avisos, setAvisos] = useState([]);
  const [avisoContent, setAvisoContent] = useState('');
  const { usuarioLogueado } = useUsuario();
  const [avisoEditId, setAvisoEditId] = useState(null);
  const [avisoEditText, setAvisoEditText] = useState('');
  const [cursos, setCursos] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState('');

  useEffect(() => {
    fetchProfesorId();
    fetchCursosDelProfesor();
  }, [usuarioLogueado, avisos]); // Ejecutar cuando el usuarioLogueado cambie

  const fetchProfesorId = async () => {
    try {
      if (usuarioLogueado) {
        // Realiza una solicitud para obtener el ID del profesor del usuario logueado
        const response = await axios.get(`http://localhost:3000/profesor/${usuarioLogueado.id}`);
        const profesorId = response.data.idProfesor;

        // Ahora que tienes el idProfesor, puedes filtrar los avisos por ese valor
        fetchAvisos(profesorId);
      }
    } catch (error) {
      console.error('Error fetching profesor ID:', error);
    }
  };

  const fetchCursosDelProfesor = async () => {
    try {
      if (usuarioLogueado && usuarioLogueado.tipo === 'Profesor') {
        // Obtiene los cursos del profesor desde la tabla de usuarios
        const cursosDelProfesor = usuarioLogueado.curso.split(',');

        // Guarda los cursos en el estado
        setCursos(cursosDelProfesor);

       
      }
    } catch (error) {
      console.error('Error fetching cursos del profesor:', error);
    }
  };

  const fetchAvisos = async (profesorId) => {
    try {
      const response = await axios.get(`http://localhost:3000/avisos`);
      const todosLosAvisos = response.data;

      // Filtra los avisos por el ID del profesor actual
      const avisosDelProfesor = todosLosAvisos.filter((aviso) => aviso.profesorIdProfesor === profesorId);

      setAvisos(avisosDelProfesor);
    } catch (error) {
      console.error('Error fetching avisos:', error);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (avisoContent.trim() === '' || selectedCurso === '') {
      return; // Evita enviar avisos vacíos o sin curso seleccionado
    }

    const nuevaFecha = new Date().toISOString();

    // Verificar si usuarioLogueado es válido
    if (!usuarioLogueado) {
      console.error('Usuario no válido');
      return;
    }


    // Realiza una solicitud para obtener el ID del profesor
    const response = await axios.get(`http://localhost:3000/profesor/${usuarioLogueado.id}`);
    const profesorId = response.data.idProfesor;

    const nuevoAviso = {
      contenido: avisoContent,
      fecha: nuevaFecha,
      curso: cursosNombres[selectedCurso], // Utiliza el curso en formato de cadena
      profesorIdProfesor: profesorId,
      nombreProfesor: usuarioLogueado.nombre,
    };

    // Envía el nuevo aviso al servidor
    await axios.post('http://localhost:3000/avisos', nuevoAviso);

    setAvisos([...avisos, nuevoAviso]);
    setAvisoContent('');
  } catch (error) {
    console.error('Error al enviar el aviso:', error);
  }
};

  const handleEditarClick = (id, contenido) => {
    setAvisoEditId(id);
    setAvisoEditText(contenido);
  };

  const handleCancelarEdicion = () => {
    setAvisoEditId(null);
    setAvisoEditText('');
  };

  const handleGuardarEdicion = async () => {
    try {
      await axios.put(`http://localhost:3000/avisos/${avisoEditId}`, {
        contenido: avisoEditText,
      });

      const avisosActualizados = avisos.map((aviso) => {
        if (aviso.idAviso === avisoEditId) {
          return { ...aviso, contenido: avisoEditText };
        }
        return aviso;
      });

      setAvisos(avisosActualizados);

      setAvisoEditId(null);
      setAvisoEditText('');
    } catch (error) {
      console.error('Error al editar el aviso:', error);
    }
  };

  const handleEliminarClick = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/avisos/${id}`);
  
      // Use a callback function in setAvisos to ensure you are working with the latest state
      setAvisos(prevAvisos => prevAvisos.filter((aviso) => aviso.idAviso !== id));
    } catch (error) {
      console.error('Error al eliminar el aviso:', error);
    }
  };
  

  

  return (
    <div className='col-6 mx-auto p-5'>
      <div className="row">
        <h4 className="card-title">Enviar avisos al curso</h4>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
  <input
    type="text"
    className="form-control"
    id="avisoContent"
    value={avisoContent}
    onChange={(e) => setAvisoContent(e.target.value)}
    placeholder="Escriba el aviso aquí" 
  />
</div>
          <div className="mb-3">
            <select
  id="curso"
  className="form-select"
  value={selectedCurso}
  onChange={(e) => setSelectedCurso(e.target.value)}
>
  <option value="">Seleccionar Curso</option> {/* Opción vacía o leyenda */}
  {cursos.map((curso) => (
    <option key={curso} value={curso}>
      {curso}
    </option>
  ))}
</select>
          </div>
          <button type="submit" className="btn btn-primary mb-5">
            Cargar Aviso
          </button>
        </form>
      </div>
      <div>
      {avisos.slice().reverse().map((aviso) => (
  <div key={aviso.idAviso} className="borde mb-4">
            <div className="card-body">
              <h5>Aviso dirigido al Curso:  <span className="numero-curso">{aviso.curso}</span></h5>
        {aviso.idAviso === avisoEditId ? (
          <div>
            <textarea
            className="contenido-aviso input-edit"
              type="text"
              value={avisoEditText}
              onChange={(e) => setAvisoEditText(e.target.value)}
            />
            <button className='btn btn-success m-1' onClick={handleGuardarEdicion}>Guardar</button>
            <button className='btn btn-secondary m-1' onClick={handleCancelarEdicion}>Cancelar</button>
          </div>
        ) : (
          <div>
         
            <h5 className="contenido-aviso">{aviso.contenido}</h5>
            <p className="card-text">Fecha: {new Date(aviso.fecha).toLocaleString()}</p>
            <button className='btn btn-primary m-1' onClick={() => handleEditarClick(aviso.idAviso, aviso.contenido)}>Editar</button>
            <button className='btn btn-danger m-1' onClick={() => handleEliminarClick(aviso.idAviso)}>Borrar</button>
          </div>
        )}
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default AvisosProfe;