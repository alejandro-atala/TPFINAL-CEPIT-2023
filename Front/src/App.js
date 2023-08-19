import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './BarraPrincipal/navbar'; // Asegúrate de importar correctamente el componente Navbar
import Registro from './Registro'; // Asegúrate de importar correctamente el componente Registro

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Ruta para la página de inicio */}
        {/* <Route exact path="/" component={HomePage} /> */}
        {/* Ruta para la página de registro */}
        <Route path="/Registro" element={<Registro/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
