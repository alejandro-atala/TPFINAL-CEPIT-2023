import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Alert } from 'react-bootstrap';
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
import { AuthProvider } from './InicioSesion/tokenContext';
import AdminPage from './admin/admin';
import { ProfesorProvider } from './PaginaProfe/profesorContext';
import ProfeAvisos from './PaginaProfe/AvisosProfe/profeAvisos';
import MateriasProf from './PaginaProfe/Materias/materiasProf';
import { UsuarioProvider } from '../src/usuarioContext'
import Contacto from './Contacto/Contacto';
import NotasExamen from './PaginaProfe/NotasExamen/notasExamen';
import { NotificacionesProvider } from './Alumno/NotificacionesContext';
import ResetPass from './ResetPass/resetpass';
import Venta from './Venta/venta';
import Logo from './Venta/logo';
import Proyectos from './Proyectos/proyectos';
import Historial from './Historial/historial';
import Reglamento from './Reglamento/reglamento';
import { useAuth } from './InicioSesion/tokenContext';



const App = () => {

  // State para almacenar el nombre del usuario que inició sesión
  const [loggedInUser, setLoggedInUser] = useState('');
  const [currentComponent, setCurrentComponent] = useState(null);
  const unreadAvisosCount = 0;
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [showErrorAlert, setShowErrorAlert] = useState(false);


  const marcarAvisosComoLeidos = async () => { };

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




  const ProtectedRoute = ({ element }) => {
    const { token } = useAuth();
 
    if (token && loggedInUser=='Admin') {
      return element;
    } else {
        setShowErrorAlert(true);

      return (
        <div className=''>
           {showErrorAlert && (
            <Alert variant="danger" className="mt-3 text-center">
              <b>Acceso denegado. Debe iniciar sesion con sus credenciales de administrador</b>
            </Alert>
          )}
    
        </div>
      );
    }
  };




  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/venta') {
      setCurrentComponent(<Venta />);
    } else {
      setCurrentComponent(null);
    }
  }, []);

  useEffect(() => {

    // Detectar la ruta actual y ocultar el Sidebar si es /alumno o /profesor
    const path = window.location.pathname;
    setSidebarVisible(!(path === '/alumno' || path === '/profesor'));
  }, [window.location.pathname]);




  return (
    <BrowserRouter>
      <UsuarioProvider>
        <NotificacionesProvider>
          <ProfesorProvider>
            <AlumnoProvider>
              <AuthProvider>
                {currentComponent || (
                  <div >
                    <Navbar
                      loggedInUser={loggedInUser}
                      onLogout={logout}
                      unreadAvisosCount={unreadAvisosCount}
                      marcarAvisosComoLeidos={marcarAvisosComoLeidos}
                    />
                    <div className=" colu  ">

                      <Routes>
                        <Route path="/venta" element={<Venta />} />
                        <Route path="/logo" element={<Logo />} />
                        <Route path="/iniciarSesion/*" element={<InicioSesion onLogin={handleLogin} />} />
                        <Route path="/" element={<Home />} />
                        {/* pagina alumno */}
                        <Route path="/notas" element={<Notas />} />
                        <Route path="/boletin" element={<Boletin loggedInUser={loggedInUser} />} />
                        <Route path="/materias" element={<Materias />} />
                        <Route path="/Asistencia" element={<Asistencia />} />
                        <Route path="/avisos" element={<Avisos />} />
                        <Route path="/mensaje" element={<Mensaje />} />

                        {/* pagina Home */}
                        <Route path="/contacto" element={<Contacto />} />
                        <Route path="/proyectos" element={<Proyectos />} />
                        <Route path="/historial" element={<Historial />} />
                        <Route path="/reglamento" element={<Reglamento />} />


                        <Route path="/plan-de-estudio" element={<PlanDeEstudios />} />
                        <Route path="/beneficios" element={<Beneficios />} />
                        <Route path="/inscripcion-online" element={<Inscripcion />} />
                        <Route path="/directivos" element={<Directivos />} />
                        <Route path="/talleres" element={<Talleres />} />
                        <Route path="/proximos-eventos" element={<ProximosEventos />} />
                        <Route path="/alumno" element={<Alumno />} />


                        {/* pagina profesor */}
                        <Route path="/profesor" element={<Profesor />} />
                        <Route path="/Profmaterias" element={<MateriasProf />} />
                        <Route path="/ProfAsistencia" element={<AsistenciaList />} />
                        <Route path="/Profnotas" element={<NotasExamen />} />
                        <Route path="/ProfTrimestre" element={<NotasExamenesList />} />
                        <Route path="/ProfAvisos" element={<ProfeAvisos />} />
                        <Route path="/Profesor" element={<ProfesorProvider />} />

                        <Route path="/admin"  element={<ProtectedRoute element={<AdminPage />} /> }  />
                        {/* <Route path="/admin" element={<div className="center-content"> <AdminPage /> </div>} /> */}

                        <Route path="/resetpass" element={<ResetPass />} />

                      </Routes>

                    </div>

                    {loggedInUser !== "Admin" && (
                      <div className="footer ">
                        <Footer />
                      </div>
                    )}

                  </div>)}
              </AuthProvider>
            </AlumnoProvider>
          </ProfesorProvider>
        </NotificacionesProvider>
      </UsuarioProvider>
    </BrowserRouter>
  )
};

export default App;