import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Alert } from 'react-bootstrap';
import { useAlumno } from '../Alumno/AlumnoContext';
import './boletin.css';

const Boletin = () => {
  const { alumnoLogueado } = useAlumno(); // Acceder a la información del usuario desde el contexto
  const [materias, setMaterias] = useState([]);
  const trimestres = [1, 2, 3];
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, [alumnoLogueado]); // Disparar una búsqueda cada vez que cambie el usuario (alumno)

  const obtenerDatos = async () => {
    if (!alumnoLogueado) return; // Asegurarse de que el alumno esté disponible antes de buscar datos

    try {
      // Obtener datos de materias y notas del estudiante aquí
      const materiasResponse = await axios.get('https://app-9d7fdcc2-2916-41fd-93f1-ef602d6afbcc.cleverapps.io/materias');
      const notasResponse = await axios.get(`https://app-9d7fdcc2-2916-41fd-93f1-ef602d6afbcc.cleverapps.io/notas-examenes/${alumnoLogueado.idAlumno}`); // Obtener notas del usuario registrado

      setMaterias(materiasResponse.data);
      setNotas(notasResponse.data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const obtenerNotasPorMateriaYTrimestre = (idMateria, trimestre) => {
    // Filtrar las notas por materia y trimestre
    return notas.filter((nota) => nota.materia.idMateria === idMateria && nota.trimestre === trimestre);
  };

  const calcularPromedioFinal = (idMateria) => {
    // Filtrar las notas de la materia y los trimestres
    const notasMateria = notas.filter((nota) => nota.materia.idMateria === idMateria && trimestres.includes(nota.trimestre));
    
    // Calcular el promedio
    const sumaNotas = notasMateria.reduce((suma, nota) => suma + nota.nota, 0);
    const promedio = sumaNotas / notasMateria.length;

    return isNaN(promedio) ? '-' : promedio.toFixed(2); // Mostrar '-' si no se puede calcular el promedio
  };

  const calcularPromedioAnual = () => {
    const promediosFinales = materias.map((materia) => {
      // Obtener las notas de los trimestres 1, 2 y 3 para la materia actual
      const notasMateria = [1, 2, 3].flatMap((trimestre) => obtenerNotasPorMateriaYTrimestre(materia.idMateria, trimestre));
  
      if (notasMateria.length === 0) {
        return null; // No hay notas para estos trimestres
      }
  
      // Filtrar solo las notas que son válidas
      const notasValidas = notasMateria
        .filter((nota) => !isNaN(parseFloat(nota.nota)))
        .map((nota) => parseFloat(nota.nota)); // Obtener solo las notas como números
  
      if (notasValidas.length === 0) {
        return null; // No hay notas válidas para estos trimestres
      }
  
      // Calcular el promedio de las notas válidas
      const sumaNotas = notasValidas.reduce((suma, nota) => suma + nota, 0);
      const promedioTrimestres123 = sumaNotas / notasValidas.length;
  
      return promedioTrimestres123;
    }).filter((promedio) => promedio !== null);
  
    if (promediosFinales.length === 0) {
      return '-';
    }
  
    const sumaPromedios = promediosFinales.reduce((suma, promedio) => suma + promedio, 0);
    const promedioAnual = sumaPromedios / promediosFinales.length;
  
    return promedioAnual.toFixed(2);
  };
  
  return (
    <div className='mt-5'>
      <h2 className='titulo-boletin'>Boletín de Notas</h2>
      <Table className='tabla-boletin'striped bordered hover>
        <thead>
          <tr className='boletin'>
            <th>Materia</th>
            {trimestres.map((trimestre) => (
              <th key={trimestre}>Trimestre {trimestre}</th>
            ))}
            <th>Promedio Final</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((materia) => (
            <tr key={materia.idMateria}>
              <td>{materia.nombre}</td>
              {trimestres.map((trimestre) => (
                <td key={trimestre}>
                  {obtenerNotasPorMateriaYTrimestre(materia.idMateria, trimestre).map((nota) => (
                    <div key={nota.idNota}>
                      {nota.nota}
                    </div>
                  ))}
                </td>
              ))}
              <td>{calcularPromedioFinal(materia.idMateria)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Alert variant="success" className="col-md-4 mx-auto mt-4">
  <h4 className="text-center cuadro-boletin">Su nota final del año es: {calcularPromedioAnual()}</h4>
</Alert>

    </div>
  );
};

export default Boletin;
