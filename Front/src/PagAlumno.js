import React from 'react';
import Notas from './Notas/notas';
import Boletin from './Boletin/boletin';
import Materias from './Materias/materias';
import Asistencia from './Asistencia/asistencia';
import Avisos from './Avisos/avisos';
import Mensaje from './Mensaje/mensaje';
import SideMenu from './MenuLateral/sideMenu';
import Alumno from './Alumno/alumno';
import { Route, Routes } from 'react-router-dom';

function PagAlumno() {
  return (
    <div>
      <Alumno />
      <SideMenu />
      <Routes>
        {/* Rutas para las páginas */}
        <Route path="/notas" element={<Notas />} />
        <Route path="/boletin" element={<Boletin />} />
        <Route path="/materias" element={<Materias />} />
        <Route path="/asistencia" element={<Asistencia />} />
        <Route path="/avisos" element={<Avisos />} />
        <Route path="/mensaje" element={<Mensaje />} />
      </Routes>
    </div>
  );
}

export default PagAlumno;
