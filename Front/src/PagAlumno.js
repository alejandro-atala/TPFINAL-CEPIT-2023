
import Navbar from "./BarraPrincipal/navbar";
import Footer from "./Footer/footer";
import Alumno from "./Alumno/alumno";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function PagAlumno()  {
  return (
    
    <div>
      <Navbar />
     <Alumno />
      <Footer />
 
    </div>
  );
}

export default PagAlumno;
