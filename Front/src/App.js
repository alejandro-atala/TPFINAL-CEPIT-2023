import PaginadDeVenta from "./PaginaDeVenta";
import ImagenesDescargadas from "./ImagenesDescargadas";
import Home from "./Home";
import Historial from "./Historial";
import ProyectoInstitutcional from "./ProyectoInstitucional";
import EstatutoYReglamento from "./EstatutoYReglamento";
import IniciarSesion from "./IniciarSesion";
import PaginaProfesor from "./Paginaprofesor";
import PaginaAlumno from "./PaginaAlumno";
import Contacto from "./Contacto";

function App()  {
  return (
    <div>
      <PaginadDeVenta/>
      <Home/>
      <Historial/>
      <ProyectoInstitutcional/>
      <EstatutoYReglamento/>
      <Contacto/>
      <IniciarSesion/>
      <PaginaProfesor/>
      <PaginaAlumno/>
      <ImagenesDescargadas/>     
    </div>
  );
}

export default App;
