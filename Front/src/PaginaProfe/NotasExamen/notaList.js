import React, { useState, useEffect } from 'react';
import { Form, ListGroup, Button, Col, Alert } from 'react-bootstrap';
import './notas.css';
import axios from 'axios';
import { useUsuario } from '../../usuarioContext';


const NotasExamenesList = () => {
  const [anios, setAnios] = useState([]);
  const [selectedAnio, setSelectedAnio] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [selectedTrimestre, setSelectedTrimestre] = useState(1);
  const [selectedMateria, setSelectedMateria] = useState('');
  const [materias, setMaterias] = useState([]); // Agregado
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const { usuarioLogueado } = useUsuario();
  const [cursos, setCursos] = useState([]);

useEffect(() => {
    // Initialize cursos when usuarioLogueado changes
    if (usuarioLogueado && usuarioLogueado.curso) {
      const cursoIds = usuarioLogueado.curso.split(',').map((id) => id.trim());
      const cursoTexts = cursoIds.map((id) => convertCursoIdToText(id));
      setCursos(cursoTexts);
    } else {
      // Reset cursos when usuarioLogueado is empty or curso is empty
      setCursos([]);
    }
  }, [usuarioLogueado]);

  const fetchAnios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/curso/anios');
      setAnios(response.data);

    } catch (error) {
      console.error('Error fetching años:', error);
    }
  };

  const fetchMaterias = async () => {
    try {
      const response = await axios.get('http://localhost:3000/materias');
      setMaterias(response.data); // Asegúrate de que response.data sea la estructura correcta
    } catch (error) {
      console.error('Error fetching materias:', error);
    }
  };

  useEffect(() => {
    fetchAnios();
    fetchMaterias();
  }, []);

  const fetchAlumnosPorAnio = async (anio) => {
    try {

      const response = await axios.get(`http://localhost:3000/alumno/por-anio/${anio}`);

      setAlumnos(response.data);
    } catch (error) {
      console.error(`Error fetching alumnos del año ${anio}:`, error);
    }
  };


  const handleAnioChange = async (event) => {
    const selectedAnio = event.target.value;
    setSelectedAnio(selectedAnio);
    setSelectedTrimestre(1); // Reiniciar el trimestre seleccionado
    setSelectedMateria('');

    if (selectedAnio) {
      setAlumnos([]); // Vaciar la lista de alumnos
      await fetchAlumnosPorAnio(selectedAnio);
    }
  };

  const handleTrimestreChange = (trimestre) => {
    setSelectedTrimestre(trimestre);
  };

  const handleMateriaChange = (event) => {
    setSelectedMateria(event.target.value);
  };

  const handleNotaChange = (event, alumnoId) => {
    const updatedAlumnos = alumnos.map((alumno) =>
      alumno.idAlumno === alumnoId ? { ...alumno, selectedNota: event.target.value } : alumno
    );
    setAlumnos(updatedAlumnos);
  };

  const saveNotasExamenes = async () => {

    if (!selectedMateria) {
      // Mostrar mensaje de error si falta seleccionar materia
      setShowSuccessAlert(false);
      setShowErrorAlert(true);

      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);

      return;
    }


    const notasIncompletas = alumnos.some((alumno) => !alumno.selectedNota);

    if (notasIncompletas) {
      // Mostrar mensaje de error si faltan notas
      setShowSuccessAlert(false);
      setShowErrorAlert(true);

      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);

      return;
    }


    console.log('Guardando notas de exámenes...');
    const notasToSave = alumnos.map((alumno) => ({
      idAlumno: alumno.idAlumno,
      nombre: alumno.nombre,
      anio: selectedAnio,
      fechaNota: new Date().toISOString().split('T')[0],
      nota: alumno.selectedNota,
      trimestre: selectedTrimestre,
      materia: selectedMateria,
    }));
    console.log(notasToSave)
    try {
      await axios.post('http://localhost:3000/notas-examenes', notasToSave, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setShowSuccessAlert(true);
      console.log('Notas de exámenes guardadas');


      setTimeout(() => {
        setShowSuccessAlert(false);
        setAlumnos([]);
        setSelectedAnio('');
        setSelectedMateria('');
      }, 2000);
    }
    catch (error) {
      console.error('Error al guardar notas de exámenes:', error);
    }
  };

  const convertCursoIdToText = (cursoId) => {
    switch (cursoId) {
      case '1':
        return 'Primero';
      case '2':
        return 'Segundo';
      case '3':
        return 'Tercero';
      case '4':
        return 'Cuarto';
      case '5':
        return 'Quinto';
      case '6':
        return 'Sexto';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="col-9">
      <h2>Registro de Notas de Exámenes</h2>
      <Form className="text-center mb-3">
        <Form.Group controlId="formAnio" className="mx-auto" style={{ maxWidth: '200px' }}>
          <Form.Label>Seleccionar Año</Form.Label>
          <Form.Control as="select" onChange={handleAnioChange} value={selectedAnio}>
            <option value="">Seleccione un año</option>
            {cursos.map((anio) => (
              <option key={anio} value={anio}>
                {anio}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
      {selectedAnio && (
        <>
          <Form.Group controlId="formMateria" className="mx-auto" style={{ maxWidth: '200px' }}>
            <Form.Label>Seleccionar Materia</Form.Label>
            <Form.Control as="select" onChange={handleMateriaChange} value={selectedMateria}>
              <option value="">Seleccione una materia</option>
              {materias.map((materia) => (
                <option key={materia.idMateria} value={materia.idMateria}>
                  {materia.nombre}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <div className="text-center mb-3">
            <h3>Fecha: {new Date().toLocaleDateString()}</h3>
            {[1, 2, 3].map((trimestre) => (
              <Form.Check
                key={trimestre}
                className="d-inline-block mx-3"
                type="radio"
                label={`${trimestre}° Trimestre`}
                name="trimestre"
                onChange={() => handleTrimestreChange(trimestre)}
                checked={selectedTrimestre === trimestre}
              />
            ))}
          </div>
          <h2 className="text-center">Alumnos de {selectedAnio}</h2>
          <ListGroup>
            {alumnos.map((alumno) => (
              <ListGroup.Item key={alumno.idAlumno} className="d-flex align-items-center justify-content-between">
                <span>{alumno.nombre}</span>
                <Col sm={3} className="px-0">
                  <Form.Control
                    as="select"
                    onChange={(e) => handleNotaChange(e, alumno.idAlumno)}
                    value={alumno.selectedNota}
                    className="custom-select"
                    style={{ width: '70px' }}
                  >
                    <option value="">Nota</option>
                    {Array.from({ length: 10 }, (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="text-center mt-3">
            <Button variant="primary" type="button" onClick={saveNotasExamenes}>
              Guardar Notas de Exámenes
            </Button>
          </div>
          {showSuccessAlert && (
            <Alert variant="success" className="mt-3 text-center">
              Notas de exámenes guardadas exitosamente.
            </Alert>
          )}
             {showErrorAlert && (
            <Alert variant="danger" className="mt-3 text-center">
              Error al guardar notas. Faltan datos.
            </Alert>
          )}
        </>
      )}
    </div>
  );
};

export default NotasExamenesList;