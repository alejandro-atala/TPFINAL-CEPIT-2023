import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUsuario } from '../../usuarioContext';

const AvisosProfe = () => {
  const [avisos, setAvisos] = useState([]);
  const [avisoContent, setAvisoContent] = useState('');
  const { usuarioLogueado } = useUsuario();
  const [avisoEditId, setAvisoEditId] = useState(null);
  const [avisoEditText, setAvisoEditText] = useState('');

  useEffect(() => {
    fetchProfesorId();
  }, [usuarioLogueado]); // Ejecutar cuando el usuarioLogueado cambie

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
      if (avisoContent.trim() === '') {
        return; // Evita enviar avisos vacíos
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
        curso: usuarioLogueado.curso,
        profesorIdProfesor: profesorId,
      };

      // Envía el nuevo aviso al servidor
      await axios.post('http://localhost:3000/avisos', nuevoAviso);

      setAvisoContent('');
      fetchAvisos();
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

      const avisosActualizados = avisos.filter((aviso) => aviso.idAviso !== id);
      setAvisos(avisosActualizados);
    } catch (error) {
      console.error('Error al eliminar el aviso:', error);
    }
  };

  const handleAvisoChange = (e) => {
    setAvisoContent(e.target.value);
  };

  return (
    <div>
      <div className="row">
        <h4 className="card-title">Enviar avisos al curso</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="avisoContent" className="form-label">
              Escriba el aviso
            </label>
            <input
              type="text"
              className="form-control"
              id="avisoContent"
              value={avisoContent}
              onChange={handleAvisoChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Cargar Aviso
          </button>
        </form>
      </div>
      <div>
        {avisos.map((aviso) => (
          <div key={aviso.idAviso} className="card">
            <div className="card-body">
              <h5 className="card-title">Aviso del profesor:</h5>
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
                  <p className="card-text">Contenido: {aviso.contenido}</p>
                  <p className="card-text">Fecha: {new Date(aviso.fecha).toLocaleString()}</p>
                  <button onClick={() => handleEditarClick(aviso.idAviso, aviso.contenido)}>Editar</button>
                  <button onClick={() => handleEliminarClick(aviso.idAviso)}>Borrar</button>
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
