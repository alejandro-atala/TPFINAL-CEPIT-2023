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
        { label: 'ID', key: 'idUsuario' },
        { label: 'Nombre', key: 'nombre' },
        { label: 'DNI', key: 'dni' },
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
    usuario: {
      name: 'Profesores',
      columns: [
        { label: 'ID Profesor', key: 'idProfesor' },
        { label: 'Nombre', key: 'nombre' },
        { label: 'Usuario ID', key: 'usuarioId' },

        // Agrega más columnas según tu tabla
      ],
    },
    // Agrega más tablas según tus necesidades
  };

  const handleTableChange = async (event) => {
    const tableName = event.target.value;
    if (tableName) {
      try {
        const response = await axios.get(`http://localhost:3000/${tableName}`); // Reemplaza con tu ruta de API
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

  const handleCellEdit = (e, rowId, columnName) => {
    const updatedData = editedData.map((row) => {
      if (row.idUsuario === rowId) {
        return { ...row, [columnName]: e.target.innerText };
      }
      return row;
    });
    setEditedData(updatedData);
  };

  const handleDeleteRow = (rowId) => {
    const updatedData = editedData.filter((row) => row.id !== rowId);
    setEditedData(updatedData);
  };

  const handleSaveChanges = async () => {
    try {
      // Envía los cambios al servidor (por ejemplo, mediante una solicitud PUT o POST)
      await axios.put(`http://localhost:3000/${selectedTable}`, editedData); // Reemplaza con tu ruta de API
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
            <option value="usuario">Usuarios</option>
            <option value="alumno">Alumnos</option>
            <option value="profesor">Profesores</option>
            {/* Agregar más opciones según tus tablas */}
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
                  {editedData.map((row) => (
                    <tr key={row.idUsuario}>
                      {tableInfo[selectedTable].columns.map((column) => (
                        <td
                          key={column.key}
                          contentEditable="true"
                          onBlur={(e) => handleCellEdit(e, row.idUsuario, column.key)}
                        >
                          {row[column.key]}
                        </td>
                      ))}
                      <td>
                        <button onClick={() => handleDeleteRow(row.idUsuario)}>Borrar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={handleSaveChanges}>Guardar Cambios</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
