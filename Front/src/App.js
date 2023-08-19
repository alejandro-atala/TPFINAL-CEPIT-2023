import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Asegúrate de importar tus estilos personalizados si es necesario
import Navbar from './BarraPrincipal/navbar';
import Registro from './Registro';
import Alumno from './Alumno/alumno';
import Footer from './Footer/footer';
import SideMenu from './MenuLateral/sideMenu';

const App = () => {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
            <div className="position-sticky">
              <SideMenu />
            </div>
          </nav>

          {/* Contenido */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Navbar />
            <Routes>
              {/* Ruta para la página de registro */}
              <Route path="/Registro" element={<Registro />} />

              {/* Ruta para la página de inicio (Alumno) */}
              <Route path="/" element={<Alumno />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
