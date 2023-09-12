import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
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
    </div>
  );
};

export default Boletin;
