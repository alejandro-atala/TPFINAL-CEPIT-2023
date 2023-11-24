import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAlumno } from './AlumnoContext';
import { useNotificaciones } from './NotificacionesContext';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './alumno.css' ;


const Alumno = () => {
  const [unreadAvisosCount, setUnreadAvisosCount] = useState(0);
  const { markAvisosComoLeidos } = useNotificaciones();
  const { alumnoLogueado } = useAlumno();
  const [avisos, setAvisos] = useState([]);
  const [avisosSinLeer, setAvisosSinLeer] = useState([]);
  const location = useLocation();
  const [isCardDisabled, setIsCardDisabled] = useState(true);
  
  useEffect(() => {
    const fetchAvisos = async () => {
      if (!alumnoLogueado) {
        console.error('Alumno no logueado.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/avisos');
        const avisosData = response.data;
        setAvisos(avisosData);

        if (Array.isArray(avisosData)) {
          const idsAvisosSinLeer = avisosData
            .filter((aviso) => !aviso.leido)
            .map((aviso) => aviso.idAviso);
          setAvisosSinLeer(idsAvisosSinLeer);
          setUnreadAvisosCount(idsAvisosSinLeer.length);
        

          const unreadCount = await Promise.all(
            idsAvisosSinLeer.map(async (idAviso) => {
              try {
                const response = await axios.get(`http://localhost:3000/alumno-aviso/existe/${idAviso}/${alumnoLogueado.idAlumno}`);
                const existeAviso = response.data;
                return !existeAviso;
              } catch (error) {
                console.error('Error al verificar existencia de aviso:', error);
                return true;
              }
            })
          );

          const unreadCountTrue = unreadCount.filter((val) => val === true).length;
          setUnreadAvisosCount(unreadCountTrue);
        }
      } catch (error) {
        console.error('Error al cargar avisos:', error);
      }
    };

    fetchAvisos();
  }, [ alumnoLogueado]);

  const marcarAvisosVistos = async () => {
    try {
      if (!alumnoLogueado || !alumnoLogueado.idAlumno) {
        console.error('ID de alumno no válido.');
        return;
      }
  
      if (avisosSinLeer.length === 0) {
        console.warn('No hay avisos sin leer para marcar.');
        return;
      }
  
      const avisoId = avisosSinLeer[0]; // Aquí deberías seleccionar el aviso correcto
      const response = await axios.put(`http://localhost:3000/alumno-aviso/marcar-leidos/${avisoId}/${alumnoLogueado.idAlumno}`);
  
      if (response.status === 200) {
        const avisoSeleccionado = avisos.find((aviso) => aviso.idAviso === avisoId);
        if (avisoSeleccionado) {
          markAvisosComoLeidos(avisoSeleccionado.idAviso);
        }
  
        // Actualiza el estado después de marcar el aviso
        setAvisosSinLeer(avisosSinLeer.filter((idAviso) => idAviso !== avisoSeleccionado.idAviso));
        setUnreadAvisosCount(avisosSinLeer.length);
      } else {
        console.error('Error al marcar avisos como leídos:', response.statusText);
      }
    } catch (error) {
      console.error('Error al marcar avisos como leídos:', error);
    }
  };

  const guardarAvisosLeidos = async (idsAvisos, idAlumno) => {
    try {
      if (!Array.isArray(idsAvisos) || idsAvisos.length === 0) {
        console.error('IDs de avisos no válidos.');
        return;
      }

      for (const idAviso of idsAvisos) {
        const response = await axios.get(`http://localhost:3000/alumno-aviso/existe/${idAviso}/${idAlumno}`);

        if (!response.data) {
          console.log('Mostrar notificación para el aviso con ID:', idAviso);

          const data = {
            avisoIdAviso: idAviso,
            alumnoIdAlumno: idAlumno,
          };

          const responseGuardar = await axios.post('http://localhost:3000/alumno-aviso', data);

          if (responseGuardar.status === 201) {
            console.log('AlumnoAviso creado exitosamente.');
          } else if (responseGuardar.status === 200) {
            console.log('AlumnoAviso actualizado exitosamente.');
          } else {
            console.error('Error al guardar AlumnoAviso:', responseGuardar.statusText);
          }
        }
      }
    } catch (error) {
      console.error('Error al guardar AlumnoAviso:', error);
    }
  };



  return (
   
    <div className="container pb-5 ">
      <div className="row row-cols-1 row-cols-md-3 g-4 ">
        <div className="col">
          <div className="fondo h-100 ">
            <img src="https://images4.imagebam.com/ef/e7/3b/MENRF6F_o.jpg" className="img-profe" alt="..." />
            <div className="card-body">
              <h5 className="card-title-profe">Notas de exámenes</h5>
              <p className="card-text-profe">Aquí podrás ver las notas de los exámenes realizados.</p>
              <Link to="/notas" className="btn btn-profe" id="myButton">Ver notas</Link>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">Last updated <span id="elapsedTime"></span> mins ago</small>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="fondo h-100">
            <img src="https://images4.imagebam.com/75/42/5c/MENRF62_o.jpg" className="img-profe" alt="..." />
            <div className="card-body">
              <h5 className="card-title-profe">Boletín</h5>
              <p className="card-text-profe">Aquí podrás ver todas las notas del boletín.</p>
              <Link to="/boletin" className="btn btn-profe" id="myButton">Ver Boletín</Link>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">Last updated <span id="elapsedTime"></span> mins ago</small>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="fondo h-100">
            <img src="https://images4.imagebam.com/08/79/bf/MENRF6G_o.jpg" className="img-profe" alt="..." />
            <div className="card-body">
              <h5 className="card-title-profe">Materias del año en curso</h5>
              <p className="card-text-profe">Aquí verás las materias con sus días y horarios.</p>
              <Link to="/materias" className="btn btn-profe" id="myButton">Ver Materias</Link>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">Last updated <span id="elapsedTime"></span> mins ago</small>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="fondo h-100">
            <img src="https://images4.imagebam.com/3e/e8/24/MENRF5Z_o.jpg" className="img-profe" alt="..." />
            <div className="card-body">
              <h5 className="card-title-profe">Asistencias</h5>
              <p className="card-text-profe">Aquí verás las asistencias.</p>
              <Link to="/Asistencia" className="btn btn-profe" id="myButton">Asistencias</Link>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">Last updated <span id="elapsedTime"></span> mins ago</small>
            </div>
          </div>
        </div>
        <div className="col">
  <div className="fondo h-100">
    <img src="https://images4.imagebam.com/96/d2/c0/MENRF61_o.jpg" className="img-profe" alt="..." />
    <div className="card-body">
      <h5 className="card-title-profe">
        Avisos de los profesores
        <span className={`notification-badge ${unreadAvisosCount > 0 ? 'show' : 'hide'}`}>🔔</span>
      </h5>
      <p className="card-text">Aquí verás los mensajes que envían los profesores a sus alumnos.</p>
      
      <Link
        to="/avisos"
        className="btn btn-profe"
        onClick={() => {
          marcarAvisosVistos();
          guardarAvisosLeidos(avisosSinLeer, alumnoLogueado.idAlumno);
        }}
      >
        Ver avisos ({unreadAvisosCount} no leídos)
      </Link>
    </div>
    <div className="card-footer">
      <small className="text-body-secondary">Last updated <span id="elapsedTime"></span> mins ago</small>
    </div>
  </div>
</div>

<div className={`col ${isCardDisabled ? 'disabled-card' : ''}`}>
  <div className="fondo h-100">
    <img src="https://images4.imagebam.com/d5/79/59/MENRF6I_o.jpg" className="img-profe" alt="..." />
    <div className="card-body">
      <h5 className="card-title-profe">Enviar mensaje</h5>
      <p className="card-text-profe">Aquí podrás enviar un mensaje directamente al profesor.</p>
      <Link to="/mensaje" className="btn btn-profe" id="myButton" disabled>
        Enviar Mensaje
      </Link>
    </div>
    <div className="card-footer">
      <small className="text-body-secondary">Last updated <span id="elapsedTime"></span> mins ago</small>
    </div>
  </div>
</div>

   
        </div>
    </div>
  
    );
  };
export default Alumno;
