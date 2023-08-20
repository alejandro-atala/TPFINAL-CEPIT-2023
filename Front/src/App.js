import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Asegúrate de importar tus estilos personalizados si es necesario
import Navbar from './BarraPrincipal/navbar';
import Registro from './Registro';
import Alumno from './Alumno/alumno';
import Footer from './Footer/footer';
import Asistencia from './Asistencia/asistencia';
import Notas from './Notas/notas';
import Boletin from './Boletin/boletin';
import Materias from './Materias/materias';
import Avisos from './Avisos/avisos';
import Mensaje from './Mensaje/mensaje';

const App = () => {
  return (

    <BrowserRouter>


      <Navbar />


      <Routes>
        <Route path="/Registro" element={<Registro />} />
        <Route path="/" element={<Alumno />} />
        <Route path="/notas" element={<Notas />} />
        <Route path="/boletin" element={<Boletin />} />
        <Route path="/materias" element={<Materias />} />
        <Route path="/Asistencia" element={<Asistencia />} />
        <Route path="/avisos" element={<Avisos />} />
        <Route path="/mensaje" element={<Mensaje />} />

      </Routes>
      <Footer />


    </BrowserRouter>
  );
};

export default App;