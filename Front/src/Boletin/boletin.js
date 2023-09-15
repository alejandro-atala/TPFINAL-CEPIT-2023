import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Alert } from 'react-bootstrap';
import { useAlumno } from '../Alumno/AlumnoContext';

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
      const materiasResponse = await axios.get('http://localhost:3000/materias');
      const notasResponse = await axios.get(`http://localhost:3000/notas-examenes/${alumnoLogueado.idAlumno}`); // Obtener notas del usuario registrado

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
    const promediosPorMateria = materias.map((materia) => {
      const notasMateria = notas.filter((nota) => nota.materia.idMateria === materia.idMateria);
  
      if (notasMateria.length === 0) {
        return null; // Indicar que no hay notas para esta materia
      }
  
      const sumaNotas = notasMateria.reduce((suma, nota) => suma + nota.nota, 0);
      return sumaNotas / notasMateria.length;
    }).filter((promedio) => promedio !== null); // Filtrar las materias sin notas
  
    if (promediosPorMateria.length === 0) {
      return '-'; // Si no hay materias con notas, mostrar '-'
    }
  
    const sumaPromedios = promediosPorMateria.reduce((suma, promedio) => suma + promedio, 0);
    const promedioAnual = sumaPromedios / promediosPorMateria.length;
  
    return promedioAnual.toFixed(2);
  };
  
  

  return (
    <div>
      <h2>Boletín de Notas</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
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
  <h4 className="text-center">Su nota final del año es: {calcularPromedioAnual()}</h4>
</Alert>

    </div>
  );
};

export default Boletin;
