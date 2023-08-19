import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './BarraPrincipal/navbar'; // Asegúrate de importar correctamente el componente Navbar
import Registro from './Registro'; // Asegúrate de importar correctamente el componente Registro
import Alumno from './Alumno/alumno';
import Footer from './Footer/footer';


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Alumno />
      <Footer />
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
