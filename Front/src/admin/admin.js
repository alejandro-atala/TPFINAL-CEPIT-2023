import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [selectedTable, setSelectedTable] = useState('');
  const [tableData, setTableData] = useState([]);
  const [editedData, setEditedData] = useState([]);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    // Aquí puedes realizar la autenticación del administrador y verificar la sesión.
    // Si la sesión ha expirado, establece setSessionExpired(true).
  }, []);

  const tableInfo = {
    usuario: {
      name: 'Usuarios',
      columns: [
        { label: 'ID Usuario', key: 'idUsuario' },
        { label: 'Nombre', key: 'nombre' },
        { label: 'DNI', key: 'dni' },
        { label: 'F. Nacimiento', key: 'fechaNac' },
        { label: 'Direccion', key: 'direccion' },
        { label: 'Telefono', key: 'telefono' },
        { label: 'Email', key: 'email' },
        // Agrega más columnas según tu tabla
      ],
    },
    alumno: {
      name: 'Alumnos',
      columns: [
        { label: 'ID Alumno', key: 'idAlumno' },
        { label: 'Nombre', key: 'nombre' },
        { label: 'Usuario ID', key: 'usuarioId' },
        { label: 'Curso ID', key: 'cursoIdCurso' },
        // Agrega más columnas según tu tabla
      ],
    },
    profesor: {
      name: 'Profesores',
      columns: [
        { label: 'ID Profesor', key: 'idProfesor' },
        { label: 'Nombre', key: 'nombre' },
        { label: 'Usuario ID', key: 'usuarioId' },
        // Agrega más columnas según tu tabla
      ],
    },
    curso: {
      name: 'Cursos',
      columns: [
        { label: 'ID Curso', key: 'idCurso' },
        { label: 'Año', key: 'anio' },
        // Agrega más columnas según tu tabla
      ],
    },
    materias: {
      name: 'Materias',
      columns: [
        { label: 'ID Materia', key: 'idMateria' },
        { label: 'Materia', key: 'nombre' },
        // Agrega más columnas según tu tabla
      ],
    },
    // Agrega más tablas según tus necesidades
  };

  const handleTableChange = async (event) => {
    const tableName = event.target.value;
    if (tableName) {
      try {
        const response = await axios.get(`http://localhost:3000/${tableName}`);
        setTableData(response.data);
        setEditedData(response.data.slice()); // Copia de seguridad de los datos originales
        setSelectedTable(tableName);
      } catch (error) {
        console.error(`Error al cargar datos de ${tableName}:`, error);
      }
    } else {
      setTableData([]);
      setEditedData([]);
      setSelectedTable('');
    }
  };

  const handleCellEdit = (e, rowIndex, columnName) => {
    const updatedData = editedData.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [columnName]: e.target.innerText };
      }
      return row;
    });
    setEditedData(updatedData);
  };

  const handleDeleteRow = (rowIndex) => {
    const updatedData = editedData.filter((row, index) => index !== rowIndex);
    setEditedData(updatedData);
  };

  const handleAddRow = async () => {
    try {
      const newRow = {};
      tableInfo[selectedTable].columns.forEach((column) => {
        newRow[column.key] = ''; // Inicializa todas las columnas con valores vacíos
      });

      // Realiza una solicitud POST para agregar la nueva fila
      const response = await axios.post(`http://localhost:3000/${selectedTable}`, newRow);
      newRow.idUsuario = response.data.idUsuario; // Asigna el ID asignado por la base de datos
      setEditedData([...editedData, newRow]);
    } catch (error) {
      console.error('Error al agregar una nueva fila:', error);
    }
  };

  const handleSaveChanges = async (rowIndex) => {
    try {
      const id = editedData[rowIndex].idUsuario;
      await axios.put(`http://localhost:3000/${selectedTable}/${id}`, editedData[rowIndex]);
      console.log('Cambios guardados con éxito.');
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

  return (
    <div className="admin-page">
      {sessionExpired ? (
        <div className="alert alert-danger">
          Tu sesión ha expirado. Por favor, inicia sesión nuevamente.
        </div>
      ) : (
        <div>
          <h2>Selector de Tablas</h2>
          <select onChange={handleTableChange}>
            <option value="">Seleccionar tabla</option>
            {Object.keys(tableInfo).map((tableName) => (
              <option key={tableName} value={tableName}>
                {tableInfo[tableName].name}
              </option>
            ))}
          </select>

          {selectedTable && (
            <div>
              <h2>Tabla {tableInfo[selectedTable].name}</h2>
              <table>
                <thead>
                  <tr>
                    {tableInfo[selectedTable].columns.map((column) => (
                      <th key={column.key}>{column.label}</th>
                    ))}
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {editedData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {tableInfo[selectedTable].columns.map((column) => (
                        <td
                          key={column.key}
                          contentEditable="true"
                          onBlur={(e) => handleCellEdit(e, rowIndex, column.key)}
                        >
                          {row[column.key]}
                        </td>
                      ))}
                      <td>
                        <button onClick={() => handleDeleteRow(rowIndex)}>Borrar</button>
                      </td>
                    </tr>
                  ))}
                  {/* Agrega una fila adicional al final con campos de entrada vacíos */}
                  <tr>
                    {tableInfo[selectedTable].columns.map((column) => (
                      <td key={column.key} contentEditable="true">
                        {/* Campo de entrada vacío */}
                      </td>
                    ))}
                    <td>
                      <button onClick={handleAddRow}>Agregar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* Agrega el botón "Guardar Cambios" para la fila agregada */}
              <button onClick={() => handleSaveChanges(editedData.length - 1)}>Guardar Cambios</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
