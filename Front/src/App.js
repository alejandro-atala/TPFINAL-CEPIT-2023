// import PaginadDeVenta from "./PaginaDeVenta";
// import ImagenesDescargadas from "./ImagenesDescargadas";
// import Home from "./Home";
// import Historial from "./Historial";
// import ProyectoInstitutcional from "./ProyectoInstitucional";
// import EstatutoYReglamento from "./EstatutoYReglamento";
// import IniciarSesion from "./IniciarSesion";
// import PaginaProfesor from "./Paginaprofesor";
// import PaginaAlumno from "./PaginaAlumno";
// import Contacto from "./Contacto";
import Navbar from "./BarraPrincipal/navbar";
//import RegistrationForm from "./Registro/registro";
import Footer from "./Footer/footer";
import MenuLateral from "./MenuLateral/sideMenu";

function App()  {
  return (
    <div>
      <Navbar />
      <MenuLateral/>
      <Footer />
      {/* <PaginadDeVenta/>
      <Home/>
      <RegistrationForm />
      <Historial/>
      <ProyectoInstitutcional/>
      <EstatutoYReglamento/>
      <Contacto/>
      <IniciarSesion/>
      <PaginaProfesor/>
      <PaginaAlumno/>
      <ImagenesDescargadas/>      */}
    </div>
  );
}

export default App;
