import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './BarraPrincipal/navbar';
import Registro from './Registro';
import Alumno from './Alumno/alumno';
import Footer from './Footer/footer';
import SideMenu from './MenuLateral/sideMenu';
import InicioSesion from './InicioSesion/inicioSesion';
const App = () => {
  return (
    <BrowserRouter>
    <InicioSesion />
      <Navbar />
      <SideMenu />
      <Routes>
        {/* Ruta para la página de registro */}
        <Route path="/Registro" element={<Registro />} />

        {/* Ruta para la página de inicio (Alumno) */}
        <Route path="/" element={<Alumno />} />
      </Routes>
      
      <Footer />
    </BrowserRouter>
  );
};

export default App;
