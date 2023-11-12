import React from 'react'
import { Link } from 'react-router-dom';
import SessionExpiration from '../SesionExpired';
import './profesor.css';


const Profesor = () => {
  return (
    <>
          <div variant="danger" className="mt-3 text-center">
      <SessionExpiration />
    </div>
    <div className="container mt-4 p-5">
    <div className="row row-cols-1 row-cols-md-3 g-4 ">
       <div className="col ">
          <div className="fondo h-100">
          <img src="https://images4.imagebam.com/ef/e7/3b/MENRF6F_o.jpg" className="img-profe" alt="..." />
            <div className="card-body">
              <h5 className="card-title-profe">Notas de examenes</h5>
              <p className="card-text-profe">Aqui podras cargar las notas de los examenes realizados</p>
             
              <Link to="/Profnotas" className="btn btn-profe" id="myButton">Cargar Notas</Link>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary" >Last updated <span id="elapsedTime"></span> mins ago</small>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="fondo h-100">
          <img src="https://images4.imagebam.com/75/42/5c/MENRF62_o.jpg" className="img-profe" alt="..." />
            <div className="card-body">
              <h5 className="card-title-profe">Trimestre</h5>
              <p className="card-text-profe">Aqui podrás cargar las notas trimestrales de tus alumnos</p>
            
              <Link to="/ProfTrimestre" className="btn btn-profe" id="myButton">Cargar Notas Trimestre</Link>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary" >Last updated <span id="elapsedTime"></span> mins ago</small>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="fondo h-100">
          <img src="https://images4.imagebam.com/08/79/bf/MENRF6G_o.jpg" className="img-profe" alt="..." />
            <div className="card-body">
              <h5 className="card-title-profe">Materias por Año</h5>
              <p className="card-text-profe">Aqui verás las materias con sus días y horarios</p>
              <Link to="/Profmaterias" className="btn btn-profe" id="myButton">Ver Materias de Mis Cursos</Link>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary" >Last updated <span id="elapsedTime"></span> mins ago</small>
            </div>
          </div>
        </div>
        <div className="col">
            <div className="fondo h-100">
            <img src="https://images4.imagebam.com/3e/e8/24/MENRF5Z_o.jpg" className="img-profe" alt="..." />
              <div className="card-body">
                <h5 className="card-title-profe">Asistencias</h5>
                <p className="card-text-profe">Aqui podrás cargar las asistencias de tus Alumnos </p>
                <Link to="/ProfAsistencia" className="btn btn-profe" id="myButton">Cargar Asistencia</Link>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary" >Last updated <span id="elapsedTime"></span> mins ago</small>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="fondo h-100">
            <img src="https://images4.imagebam.com/96/d2/c0/MENRF61_o.jpg" className="img-profe" alt="..." />
              <div className="card-body">
                <h5 className="card-title-profe">Avisos de los Profes</h5>
                <p className="card-text-profe">Aqui podrás cargar los avisos  deseados a tus Cursos </p>
                <Link to="/Profavisos" className="btn btn-profe" id="myButton">Cargar Aviso</Link>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary" >Last updated <span id="elapsedTime"></span> mins ago</small>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="fondo h-100">
            <img src="https://images4.imagebam.com/d5/79/59/MENRF6I_o.jpg" className="img-profe" alt="..." />
              <div className="card-body">
                <h5 className="card-title-profe">Enviar mensaje</h5>
                <p className="card-text-profe">Aqui podrás enviar un mensaje directamente al Alumno</p>
                <Link to="/mensaje" className="btn btn-profe" id="myButton">Mensajes</Link>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary" >Last updated <span id="elapsedTime"></span> mins ago</small>
              </div>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default Profesor
