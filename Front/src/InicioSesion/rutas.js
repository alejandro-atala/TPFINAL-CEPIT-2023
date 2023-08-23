import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InicioSesion from '../InicioSesion/inicioSesion';
import Alumno from '../Alumno/alumno';
import Profesor from '../Profesor/profesor';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/alumno" element={<Alumno />} />
        <Route path="/profesor" element={<Profesor />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
