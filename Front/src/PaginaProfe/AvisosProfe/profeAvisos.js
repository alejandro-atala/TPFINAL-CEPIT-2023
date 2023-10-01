import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profeavisos.css';
import { useUsuario } from '../../usuarioContext';

const AvisosProfe = () => {
  const [avisos, setAvisos] = useState([]);
  const [avisoContent, setAvisoContent] = useState('');
  const { usuarioLogueado } = useUsuario();
  const [avisoEditId, setAvisoEditId] = useState(null);
  const [avisoEditText, setAvisoEditText] = useState('');
  const [selectedCurso, setSelectedCurso] = useState('');
  const [avisoEnviado, setAvisoEnviado] = useState(false);
  const [avisoEliminado, setAvisoEliminado] = useState(false);

  useEffect(() => {
    fetchProfesorId();
  }, [usuarioLogueado]);

  const fetchProfesorId = async () => {
    try {
      if (usuarioLogueado) {
        const response = await axios.get(`http://localhost:3000/profesor/${usuarioLogueado.id}`);
        const profesorId = response.data.idProfesor;
        fetchAvisos(profesorId);
      }
    } catch (error) {
      console.error('Error fetching profesor ID:', error);
    }
  };

  const fetchAvisos = async (profesorId) => {
    try {
      const response = await axios.get(`http://localhost:3000/avisos`);
      const todosLosAvisos = response.data;
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
        return;
      }
      const nuevaFecha = new Date().toISOString();
      if (!usuarioLogueado) {
        console.error('Usuario no válido');
        return;
      }
      const nuevoAviso = {
        contenido: avisoContent,
        fecha: nuevaFecha,
        curso: selectedCurso, // Utiliza el curso seleccionado
        profesorIdProfesor: usuarioLogueado.id,
        nombreProfesor: usuarioLogueado.nombre,
      };
      await axios.post('http://localhost:3000/avisos', nuevoAviso);
      console.log('Aviso enviado con exito:', nuevoAviso);
      setAvisos([...avisos, nuevoAviso]);
      setAvisoContent('');
      setAvisoEnviado(true);
      setTimeout(() => {
        setAvisoEnviado(false);
      }, 2000);
      // También puedes restablecer el contenido del aviso u otros estados según sea necesario.
      setAvisoContent('');
    } catch (error) {
      console.error('Error al enviar el aviso:', error);
    }
    fetchProfesorId();
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
      const avisosActualizados = avisos.filter((aviso) => aviso.idAviso !== id);
      setAvisos(avisosActualizados);
      setAvisoEliminado(true);  // Mostrar el mensaje de aviso eliminado
      setTimeout(() => {
        setAvisoEliminado(false);
      }, 2000);
    } catch (error) {
      console.error('Error al eliminar el aviso:', error);
    }
  };

  return (
    <div>
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
              <option value="">Seleccionar Curso</option>
              <option value="Primero">Primero</option>
              <option value="Segundo">Segundo</option>
              <option value="Tercero">Tercero</option>
              <option value="Cuarto">Cuarto</option>
              <option value="Quinto">Quinto</option>
              <option value="Sexto">Sexto</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Cargar Aviso
          </button>
          {avisoEnviado && (
  <div className="alert alert-success text-center mt-3">Aviso enviado correctamente</div>

)}
               {avisoEliminado && (
      <div className="alert alert-success text-center mt-3">Aviso eliminado correctamente</div>
    )}
        </form>
      </div>
      <div>
        
        {avisos .slice()  // Crear una copia para no modificar el estado original
    .reverse()  // Revertir el orden de los avisos (los más recientes primero)
    .map((aviso) => {
          // Verificar si aviso.idAviso es una clave válida y única
          if (aviso.idAviso) {
            return (
              <div key={aviso.idAviso} className="card mt-3">
                <div className="card-body">
                  <h5>Aviso dirigido al Curso: <span className="numero-curso">{aviso.curso}</span></h5>
                  {aviso.idAviso === avisoEditId ? (
                    <div>
                      <input
                        type="text"
                        value={avisoEditText}
                        onChange={(e) => setAvisoEditText(e.target.value)}
                      />
                      <button onClick={handleGuardarEdicion}>Guardar</button>
                      <button onClick={handleCancelarEdicion}>Cancelar</button>
                    </div>
                  ) : (
                    <div>
                      <p className="card-text">Contenido del Aviso: </p>
                      <h5 className="contenido-aviso">{aviso.contenido}</h5>
                      <p className="card-text">Fecha: {new Date(aviso.fecha).toLocaleString()}</p>
                      <button onClick={() => handleEditarClick(aviso.idAviso, aviso.contenido)}>Editar</button>
                      <button onClick={() => handleEliminarClick(aviso.idAviso)}>Borrar</button>
       
                    </div>
                  )}
                </div>
              </div>
            );
          } else {
            
            return null; 
          }
        })}
      </div>
    </div>
  );
};

export default AvisosProfe;
