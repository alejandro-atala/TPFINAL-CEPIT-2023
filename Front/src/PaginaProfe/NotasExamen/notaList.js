import React, { useState, useEffect } from 'react';
import { Form, ListGroup, Button, Col } from 'react-bootstrap';
import axios from 'axios';

const NotasExamenesList = () => {
  const [anios, setAnios] = useState([]);
  const [selectedAnio, setSelectedAnio] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [selectedTrimestre, setSelectedTrimestre] = useState(1);

  useEffect(() => {
    fetchAnios();
  }, []);

  const fetchAnios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/curso/anios');
      setAnios(response.data);
    } catch (error) {
      console.error('Error fetching años:', error);
    }
  };

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

    setAlumnos([]); // Vaciar la lista de alumnos
    setSelectedTrimestre(1); // Reiniciar el trimestre seleccionado
    if (selectedAnio) {
      await fetchAlumnosPorAnio(selectedAnio);
    }
  };

  const handleTrimestreChange = (trimestre) => {
    setSelectedTrimestre(trimestre);
  };

  const handleNotaChange = (event, alumnoId) => {
    const updatedAlumnos = alumnos.map((alumno) =>
      alumno.idAlumno === alumnoId ? { ...alumno, selectedNota: event.target.value } : alumno
    );
    setAlumnos(updatedAlumnos);
  };

  const saveNotasExamenes = async () => {
    console.log('Guardando notas de exámenes...');
    const notasToSave = alumnos.map((alumno) => ({
      idAlumno: alumno.idAlumno,
      nombre: alumno.nombre,
      anio: selectedAnio,
      fechaNota: new Date().toISOString(),
      nota: alumno.selectedNota,
      trimestre: selectedTrimestre,
    }));

    try {
      await axios.post('http://localhost:3000/notas-examenes', notasToSave, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Notas de exámenes guardadas');

      // Mostrar un alert y limpiar los datos de notas de exámenes
      alert('Notas de exámenes guardadas');
      setAlumnos([]);
    } catch (error) {
      console.error('Error al guardar notas de exámenes:', error);
    }
  };

  return (
    <div>
      <h2>Registro de Notas de Exámenes</h2>
      <Form className="text-center mb-3">
        <Form.Group controlId="formAnio" className="mx-auto" style={{ maxWidth: '200px' }}>
          <Form.Label>Seleccionar Año</Form.Label>
          <Form.Control as="select" onChange={handleAnioChange} value={selectedAnio}>
            <option value="">Seleccione un año</option>
            {anios.map((anio) => (
              <option key={anio} value={anio}>
                {anio}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
      {selectedAnio && (
        <>
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
            <Button variant="primary" onClick={saveNotasExamenes}>
              Guardar Notas de Exámenes
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default NotasExamenesList;
