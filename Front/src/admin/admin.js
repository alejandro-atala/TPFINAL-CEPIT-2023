import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css'
const AdminPage = () => {
  const [selectedTable, setSelectedTable] = useState('');
  const [tableData, setTableData] = useState([]);
  const [editedData, setEditedData] = useState([]);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    // cargarTablas();
  }, []);

  useEffect(() => {
    if (selectedTable) {
      cargarDatos();
    }
  }, [selectedTable]);

  const tableInfo = {
    usuario: {
      name: 'Usuarios',
    },
    alumno: {
      name: 'Alumnos',
    },
    profesor: {
      name: 'Profesores',
    },
    curso: {
      name: 'Cursos',
    },
    materias: {
      name: 'Materias',
    },
    // Agrega más tablas según tus necesidades
  };

  const cargarDatos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/${selectedTable}`);
      setTableData(response.data);
      setEditedData(response.data.map((row) => ({ ...row, isEditing: false }))); // Inicialmente, ninguna fila está en modo de edición
      setColumns(Object.keys(response.data[0])); // Obtener automáticamente los nombres de las columnas
    } catch (error) {
      console.error(`Error al cargar datos de ${selectedTable}:`, error);
    }
  };

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
  };

  const handleCellEdit = (e, rowIndex, columnName) => {
    const updatedData = editedData.map((row, index) => {
      if (index === rowIndex) {
        return { ...row, [columnName]: e.target.value };
      }
      return row;
    });
    setEditedData(updatedData);
  };

  const handleDeleteRow = async (rowIndex) => {
    try {
      const id = editedData[rowIndex].idUsuario; // Reemplaza con la clave primaria adecuada
      await axios.delete(`http://localhost:3000/${selectedTable}/${id}`);
      const updatedData = editedData.filter((row, index) => index !== rowIndex);
      setEditedData(updatedData);
    } catch (error) {
      console.error('Error al borrar una fila:', error);
    }
  };

  const handleSaveChanges = async (rowIndex) => {
    try {
      if (!editedData[rowIndex].fechaNac) {
        console.error('La fecha de nacimiento es requerida.');
        return;
      }
  
      const { isEditing, ...updatedRow } = editedData[rowIndex]; // Elimina 'isEditing'
      const id = updatedRow.idUsuario; // Reemplaza con la clave primaria adecuada
      await axios.put(`http://localhost:3000/${selectedTable}/${id}`, updatedRow);
      const updatedData = [...editedData];
      updatedData[rowIndex] = updatedRow;
      setEditedData(updatedData);
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };
  

  const handleEditRow = (rowIndex) => {
    // Habilita la edición de la fila en el índice especificado
    const updatedRow = { ...editedData[rowIndex], isEditing: true };
    const updatedData = [...editedData];
    updatedData[rowIndex] = updatedRow;
    setEditedData(updatedData);
  };

  const handleAddRow = async () => {
    try {
      const newRow = {
        idUsuario: '',
        nombre: '',
        dni: '',
        fechaNac: '',
        direccion: '',
        telefono: '',
        email: '',
        password: '',
        tipo: '',
        curso: 0,
        isEditing: true, // Nueva fila está en modo de edición
      };
      const response = await axios.post(`http://localhost:3000/${selectedTable}`, newRow);
      const addedRow = response.data;
      setEditedData([...editedData, addedRow]);
    } catch (error) {
      console.error('Error al agregar una nueva fila:', error);
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
          <select onChange={handleTableChange} value={selectedTable}>
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
                    {columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {editedData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {columns.map((column) => (
                        <td key={column}>
                          {row.isEditing ? (
                            <input
                              type="text"
                              value={row[column]}
                              onChange={(e) => handleCellEdit(e, rowIndex, column)}
                            />
                          ) : (
                            row[column]
                          )}
                        </td>
                      ))}
                      <td>
                        {row.isEditing ? (
                          <button onClick={() => handleSaveChanges(rowIndex)}>Guardar</button>
                        ) : (
                          <button onClick={() => handleEditRow(rowIndex)}>Editar</button>
                        )}
                        <button onClick={() => handleDeleteRow(rowIndex)}>Borrar</button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    {columns.map((column) => (
                      <td key={column}>
                        <input
                          type="text"
                          value={editedData[editedData.length - 1][column]}
                          onChange={(e) => handleCellEdit(e, editedData.length - 1, column)}
                        />
                      </td>
                    ))}
                    <td>
                      <button onClick={handleAddRow}>Agregar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
