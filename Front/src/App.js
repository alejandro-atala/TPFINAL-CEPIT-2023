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
import { AuthProvider } from './InicioSesion/tokenContext';
import AdminPage from './admin/admin';
import { ProfesorProvider } from './PaginaProfe/profesorContext';



const App = () => {

  // State para almacenar el nombre del usuario que inició sesión
  const [loggedInUser, setLoggedInUser] = useState('');

  // Función para actualizar el nombre del usuario cuando inicie sesión
  const handleLogin = (username) => {
    setLoggedInUser(username);
  };

  const logout = () => {
    // Elimina el token del almacenamiento local
    localStorage.removeItem('token');
    // Limpia loggedInUser
    setLoggedInUser('');

    // Redirige a /iniciarSesion
    window.location.href = '/iniciarSesion'; // Utiliza window.location.href para redirigir
  };
  


  return (
    <BrowserRouter>
      <AlumnoProvider>
<<<<<<< HEAD
<<<<<<< HEAD
        <ProfesorProvider>
=======
       <ProfesorProvider>
>>>>>>> cd1e83b (agrego cambio de idUsuario por idProfesor)
=======
       <ProfesorProvider>
>>>>>>> cd1e83b8526b9a3b62b8c85d005b6f36dc14b8b4
        <AuthProvider>
          <div className="d-flex flex-column min-vh-100">
            <Navbar loggedInUser={loggedInUser}  onLogout={logout} />
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

                      <Route path="/iniciarSesion/*" element={<InicioSesion onLogin={handleLogin} />} />


                      <Route path="/" element={<Home />} />
                      {/* pagina alumno */}
                      <Route path="/notas" element={<Notas />} />
                      <Route path="/boletin" element={<Boletin loggedInUser={loggedInUser}/>}  />
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
                      <Route path="/Profmaterias" element={<Materias />} /> 
                      <Route path="/ProfAsistencia" element={<AsistenciaList />} />
                      <Route path="/Profnotas" element={<NotasExamenesList />} />


                      <Route path="/admin" element={<div className="center-content"> <AdminPage /> </div>} />


                    </Routes>
                  </div>
                </div>
              </div>
            </div>
            {loggedInUser !== "Admin" && (
    <div className="footer">
      <Footer />
    </div>
  )}
          </div>
        </AuthProvider>
        </ProfesorProvider>
      </AlumnoProvider>

    </BrowserRouter>
  );
};

export default App;
