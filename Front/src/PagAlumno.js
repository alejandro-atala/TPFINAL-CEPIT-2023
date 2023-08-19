import Notas from './Notas/notas'
import Boletin from './Boletin/boletin'
import Materias from './Materias/materias'
import Asistencia from './Asistencia/asistencia'
import Avisos from './Avisos/avisos'
import Mensaje from './Mensaje/mensaje'
import SideMenu from "./MenuLateral/sideMenu";
import Alumno from "./Alumno/alumno";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function PagAlumno()  {
  return (
    
    <div>

<BrowserRouter>

      <SideMenu />
      <Routes>
        {/* Ruta para la página de registro */}
        <Route path="/notas" element={<Notas />} />
        <Route path="/boletin" element={<Boletin />} />
        <Route path="/materias" element={<Materias />} />
        <Route path="/asistencia" element={<Asistencia />} />
        <Route path="/avisos" element={<Avisos />} />
        <Route path="/mensaje" element={<Mensaje />} />
        {/* Ruta para la página de inicio (Alumno) */}
        <Route path="/" element={<Alumno />} />
      </Routes>
      
  
    </BrowserRouter>
 
 
    </div>
  );
}

export default PagAlumno;
