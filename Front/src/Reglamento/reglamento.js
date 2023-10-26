// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { IsNull } from 'typeorm';

// const Reglamento = () => {
//   const [reglamento1, setTextoReglamento] = useState('');
//   const [tituloRegalmento1, setTituloReglamento1] = useState('');
//   const [tituloRegalmento2, setTituloReglamento2] = useState('');
//   const [tituloRegalmento3, setTituloReglamento3] = useState('');
//   const [imagenReglamdento1, setImagenReglamento1] = useState(null);
//   const [imagenReglamdento2, setImagenReglamento2] = useState(null);
//   const [imagenReglamdento3, setImagenReglamento3] = useState(null);
//   const [url1, setUrl1] = useState(null);
//   const [url2, setUrl2] = useState(null);
//   const [url3, setUrl3] = useState(null);

//   const handleDescargarDocumento = async (referencia, setUrl) => {
//     try {
//       const responseUrl = await axios.get(`http://localhost:3000/carga/${referencia}`);
//       const url = responseUrl.data.url;
  
//       if (url) {
//         setUrl(url);
//         window.open(url, '_blank');
//       } else {
//         console.error(`La URL para ${referencia} no se ha encontrado.`);
//       }
//     } catch (error) {
//       console.error(`Error al obtener datos de ${referencia}:`, error);
//     }
//   };
  

//   useEffect(() => {
//     const obtenerTextoPorReferencia = async (referencia, setTextoReglamento) => {
//       try {
//         const responseTexto = await axios.get(`http://localhost:3000/carga/${referencia}`);
//         setTextoReglamento(responseTexto.data.texto);
//       } catch (error) {
//         console.error(`Error al obtener datos de ${referencia}:`, error);
//       }
//     };

//     const obtenerImagenPorReferencia = async (referencia, setImagen) => {
//       try {
//         const responseImagen = await axios.get(`http://localhost:3000/imagenes/nombre/${referencia}`);

//         if (responseImagen.data) {

//           setImagen(responseImagen.data.url);
//         }
//       } catch (error) {
//         console.error(`Error al obtener datos de ${referencia}:`, error);
//       }
//     };

  
//     obtenerTextoPorReferencia('Reglamento1', setTextoReglamento);

//     obtenerTextoPorReferencia('Titulo_Reglamento_1', setTituloReglamento1);
//     obtenerTextoPorReferencia('Titulo_Reglamento_2', setTituloReglamento2);
//     obtenerTextoPorReferencia('Titulo_Reglamento_3', setTituloReglamento3);

//     obtenerImagenPorReferencia('imagenReglamento1', setImagenReglamento1);
//     obtenerImagenPorReferencia('imagenReglamento2', setImagenReglamento2);
//     obtenerImagenPorReferencia('imagenReglamento3', setImagenReglamento3);
//   }, []);


//   return (
//     <div className="container mt-4 d-flex flex-column justify-content-center align-items-center" style={{ height: '50vh' }}>
//         <div className="card-body">
//           <h1 className="card-title">{reglamento1}</h1>
//           <div class="col-md-6">
//             <div class="row">
//               <div class="col-md-12">
//                 <div className="cuadro-imagen">
//                   {imagenReglamdento1 && <img src={imagenReglamdento1} alt="foto del reglamento 1" />}
//                 </div>
//                 <h3>{tituloRegalmento1}</h3>
//                 <button onClick={() =>  handleDescargarDocumento('url1', setUrl1)}>Descargar Documento</button>
//               </div>
//             </div>
//             <div class="card">
//               <div class="col-md-6">
//                 <div className="cuadro-imagen">
//                   {imagenReglamdento2 && <img src={imagenReglamdento2} alt="foto del reglamento 2" />}
//                 </div>
//                 <h3>{tituloRegalmento2}</h3>
//                 <button onClick={() =>  handleDescargarDocumento('url2', setUrl2)}>Descargar Documento</button>
//               </div>
//               <div class="card">
//               <div class="col-md-6">
//                 <div className="cuadro-imagen">
//                   {imagenReglamdento3 && <img src={imagenReglamdento3} alt="foto del reglamento 3" />}
//                 </div>
//                 <h3>{tituloRegalmento3}</h3>
//                 <button onClick={() => handleDescargarDocumento('url3', setUrl3)}>Descargar Documento</button>
//               </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//   );
// };

// export default Reglamento;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reglamento = () => {
  const [reglamento1, setTextoReglamento] = useState('');
  const [tituloRegalmento1, setTituloReglamento1] = useState('');
  const [tituloRegalmento2, setTituloReglamento2] = useState('');
  const [tituloRegalmento3, setTituloReglamento3] = useState('');
  const [imagenReglamento1, setImagenReglamento1] = useState(null);
  const [imagenReglamento2, setImagenReglamento2] = useState(null);
  const [imagenReglamento3, setImagenReglamento3] = useState(null);
  const [url1, setUrl1] = useState(null);
  const [url2, setUrl2] = useState(null);
  const [url3, setUrl3] = useState(null);

  useEffect(() => {
    const obtenerTextoPorReferencia = async (referencia, setTextoReglamento) => {
      try {
        const responseTexto = await axios.get(`http://localhost:3000/carga/${referencia}`);
        setTextoReglamento(responseTexto.data.texto);
      } catch (error) {
        console.error(`Error al obtener datos de ${referencia}:`, error);
      }
    };

    const obtenerImagenPorReferencia = async (referencia, setTituloReglamento, setImagenReglamento) => {
      try {
        const responseTexto = await axios.get(`http://localhost:3000/carga/${referencia}`);
        setTituloReglamento(responseTexto.data.titulo);

        const responseImagen = await axios.get(`http://localhost:3000/imagenes/nombre/${referencia}`);

        if (responseImagen.data) {
          setImagenReglamento(responseImagen.data.url);
        }
      } catch (error) {
        console.error(`Error al obtener datos de ${referencia}:`, error);
      }
    };
  
      const cargarDatosPorReferencia = async (referencia, setDato) => {
          try {
              const response = await axios.get(`http://localhost:3000/carga/${referencia}`);
              setDato(response.data.texto);
          } catch (error) {
              console.error(`Error al cargar los datos de ${referencia}:`, error);
          }
      };

      cargarDatosPorReferencia('URL_1', setUrl1);
      cargarDatosPorReferencia('URL_2', setUrl2);
      cargarDatosPorReferencia('URL_3', setUrl3);
  
  
    obtenerTextoPorReferencia('Reglamento1', setTextoReglamento);
    obtenerTextoPorReferencia('Titulo_Reglamento_1', setTituloReglamento1);
    obtenerTextoPorReferencia('Titulo_Reglamento_2', setTituloReglamento2);
    obtenerTextoPorReferencia('Titulo_Reglamento_3', setTituloReglamento3);

    obtenerImagenPorReferencia('imagenReglamento1', setTituloReglamento1, setImagenReglamento1);
    obtenerImagenPorReferencia('imagenReglamento2', setTituloReglamento2, setImagenReglamento2);
    obtenerImagenPorReferencia('imagenReglamento3', setTituloReglamento3, setImagenReglamento3);
  }, []);

  const abrirURL = (url) => {
    window.open(url, '_blank');
};


  return (
    <div className="container mt-5 d-flex flex-column justify-content-center align-items-center" style={{ height: '50vh' }}>
      <div className="card-body">
        <h1 className="card-title">{reglamento1}</h1>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              {imagenReglamento1 && <img className="card-img-top" src={imagenReglamento1} alt="foto del reglamento 1" />}
              <div className="card-body">
                <h3 className="card-title">{tituloRegalmento1}</h3>
                <button className="btn btn-primary mx-2" onClick={() => abrirURL(url1)}>
                            Ver Documento
                        </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              {imagenReglamento2 && <img className="card-img-top" src={imagenReglamento2} alt="foto del reglamento 2" />}
              <div className="card-body">
                <h3 className="card-title">{tituloRegalmento2}</h3>
                <button className="btn btn-primary mx-2" onClick={() => abrirURL(url2)}>
                            Ver Documento
                        </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              {imagenReglamento3 && <img className="card-img-top" src={imagenReglamento3} alt="foto del reglamento 3" />}
              <div className="card-body">
                <h3 className="card-title">{tituloRegalmento3}</h3>
                <button className="btn btn-primary mx-2" onClick={() => abrirURL(url3)}>
                            Ver Documento
                        </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reglamento;