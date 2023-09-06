import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './BarraPrincipal/navbar';
import Footer from './Footer/footer';
import Asistencia from './Asistencia/asistencia';
import Notas from './Notas/notas';
import Boletin from './Boletin/boletin';
import Materias from './Materias/materias';
import Avisos from './Avisos/avisos';
import Mensaje from './Mensaje/mensaje';
import InicioSesion from './InicioSesion/inicioSesion';
import Sidebar from './MenuLateral/sideMenu';
import Home from './Home/home';
import PlanDeEstudios from './MenuLateral/PlanDeEstudio/planDeEstudio';
import Beneficios from './MenuLateral/Beneficios/beneficios';
import Inscripcion from './MenuLateral/InscripcionOnline/inscripcion'
import Talleres from './MenuLateral/Talleres/talleres';
import Directivos from './MenuLateral/Directivos/directivos'
import ProximosEventos from './MenuLateral/ProximosEventos/eventos';
import Alumno from './Alumno/alumno'
import Profesor from './PaginaProfe/profesor';
import AsistenciaList from './PaginaProfe/Asistencia/asistenciaList';
import NotasExamenesList from './PaginaProfe/NotasExamen/notaList';
import { AlumnoProvider } from './Alumno/AlumnoContext';
import MateriasList from './PaginaProfe/Materias/materiasList';
import AdminPage from './admin/admin';

// const App = () => {

//   // State para almacenar el nombre del usuario que inició sesión
//   const [loggedInUser, setLoggedInUser] = useState('');

//   // Función para actualizar el nombre del usuario cuando inicie sesión
//   const handleLogin = (username) => {
//     setLoggedInUser(username);
//   };

const App = () => {
  // State para almacenar el nombre del usuario que inició sesión
  const [loggedInUser, setLoggedInUser] = useState('');
  // State para verificar si el usuario actual es un administrador


  // Función para actualizar el nombre del usuario y su rol cuando inicia sesión
  const handleLogin = (username) => {
    setLoggedInUser(username);





  }

  return (
    <BrowserRouter>
      <AlumnoProvider>
        <div className="d-flex flex-column min-vh-100">
          <Navbar loggedInUser={loggedInUser} />
          <div className="flex-grow-1">
            <div className="container-fluid">
              <div className="row">
                {loggedInUser === "Admin" ? null : (
                  <div className="col-md-3">
                    <Sidebar />
                  </div>
                )}
                <div className="col-md-9">
                  {/* Contenido principal */}
                  <Routes>

                    <Route path="/iniciarSesion" element={<InicioSesion onLogin={handleLogin} />} />

                    {/* <Route path="/iniciarSesion" element={<InicioSesion />} /> */}
                    <Route path="/" element={<Home />} />
                    {/* pagina alumno */}
                    <Route path="/notas" element={<Notas />} />
                    <Route path="/boletin" element={<Boletin />} />
                    <Route path="/materias" element={<Materias />} />

                    <Route path="/Asistencia" element={<Asistencia />} />

                    <Route path="/avisos" element={<Avisos />} />
                    <Route path="/mensaje" element={<Mensaje />} />

                    <Route path="/plan-de-estudio" element={<PlanDeEstudios />} />
                    <Route path="/beneficios" element={<Beneficios />} />
                    <Route path="/inscripcion-online" element={<Inscripcion />} />
                    <Route path="/directivos" element={<Directivos />} />
                    <Route path="/talleres" element={<Talleres />} />
                    <Route path="/proximos-eventos" element={<ProximosEventos />} />
                    <Route path="/alumno" element={<Alumno />} />
                    {/* pagina profesor */}

                    <Route path="/profesor" element={<Profesor />} />
                    {/* <Route path="/Profnotas" element={<ProfNotas />} /> */}
                    {/* <Route path="/Profboletin" element={<ProfBoletin />} /> */}
                    <Route path="/Profmaterias" element={<MateriasList />} />
                    <Route path="/ProfAsistencia" element={<AsistenciaList />} />
                    <Route path="/Profnotas" element={<NotasExamenesList />} />
                    {/* <Route path="/Profavisos" element={<ProfAvisos />} />
              <Route path="/Profmensaje" element={<ProfMensaje />} /> */}

                    {/* <Route path="/admin" element={<AdminPage />} /> */}
                    <Route
                      path="/admin"
                      element={
                        <div className="center-content"> {/* Contenedor para centrar */}
                          <AdminPage />
                        </div>
                      }
                    />

                  </Routes>
                </div>
              </div>
            </div>
          </div>
          <Footer className="fixed-bottom" />
        </div>
      </AlumnoProvider>
    </BrowserRouter>
  );
};

export default App;

