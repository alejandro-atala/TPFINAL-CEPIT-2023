import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './BarraPrincipal/navbar';
import Registro from './Registro';
import Alumno from './Alumno/alumno';
import Footer from './Footer/footer';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
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
