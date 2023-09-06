import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';

const AdminPage = () => {
  const [selectedTable, setSelectedTable] = useState('');
  const [tableData, setTableData] = useState([]);
  const [editedData, setEditedData] = useState([]);
  const [newRowData, setNewRowData] = useState({}); // Estado para la nueva fila
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
      setColumns(Object.keys(response.data[0] || {})); // Obtener automáticamente los nombres de las columnas
      setEditedData(response.data.map((row) => ({ ...row, isEditing: false }))); // Inicialmente, ninguna fila está en modo de edición
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
      let idFieldName = '';
      if (selectedTable === 'materias') {
        idFieldName = 'idMateria';
      } else if (selectedTable === 'usuario') {
        idFieldName = 'idUsuario';
      } else if (selectedTable === 'curso') {
        idFieldName = 'idCurso';
      }
      const id = editedData[rowIndex][idFieldName];
      const url = `http://localhost:3000/${selectedTable}/${id}`;
      await axios.delete(url);

      const updatedData = editedData.filter((row, index) => index !== rowIndex);
      setEditedData(updatedData);
    } catch (error) {
      console.error('Error al borrar una fila:', error);
    }
  };

  const handleSaveChanges = async (rowIndex) => {
    try {
      const { isEditing, ...updatedRow } = editedData[rowIndex]; // Elimina 'isEditing'
      let idFieldName = '';
      if (selectedTable === 'materias') {
        idFieldName = 'idMateria';
      } else if (selectedTable === 'curso') {
        idFieldName = 'idCurso';
      } else if (selectedTable === 'usuario') {
        idFieldName = 'idUsuario';
      }
      const id = updatedRow[idFieldName];

      if (selectedTable === 'materias') {
        if (updatedRow.idMateria === undefined || updatedRow.nombre === undefined) {
          console.error('Completa todos los campos requeridos para la edición de cursos.');
          return;
        }
        await axios.put(`http://localhost:3000/${selectedTable}/${id}`, {
          idMateria: updatedRow.idMateria,
          nombre: updatedRow.nombre,
        });
      } else if (selectedTable === 'curso') {
        if (updatedRow.idCurso === undefined || updatedRow.anio === undefined) {
          console.error('Completa todos los campos requeridos para la edición de cursos.');
          return;
        }
        await axios.put(`http://localhost:3000/${selectedTable}/${id}`, {
          idCurso: updatedRow.idCurso,
          anio: updatedRow.anio,
        });
      } else if (selectedTable === 'usuario') {
        if (!updatedRow.fechaNac) {
          console.error('La fecha de nacimiento es requerida.');
          return;
        }
        await axios.put(`http://localhost:3000/${selectedTable}/${id}`, updatedRow);
      }

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
      let requiredFields = [];
      if (selectedTable === 'materias') {
        requiredFields = ['idMateria', 'nombre'];
      } else if (selectedTable === 'curso') {
        requiredFields = ['idCurso', 'anio'];
      } else if (selectedTable === 'usuario') {
        requiredFields = [
          'nombre',
          'dni',
          'fechaNac',
          'direccion',
          'telefono',
          'email',
          'password',
          'tipo',
          'curso',
        ];
      }
      const isDataValid = requiredFields.every((field) => newRowData[field] !== undefined && newRowData[field] !== '');

      if (!isDataValid) {
        console.error('Completa todos los campos requeridos.');
        return;
      }

      // Envía la nueva fila al servidor para su creación
      const response = await axios.post(`http://localhost:3000/${selectedTable}`, newRowData);
      const addedRow = response.data;

      // Agrega la fila completa al estado local
      setEditedData([...editedData, addedRow]);
      setNewRowData({}); // Restablece la nueva fila después de agregarla
      console.log('Nueva fila agregada con éxito.');
    } catch (error) {
      console.error('Error al agregar una nueva fila:', error);
    }
  };

  const handleNewRowInputChange = (e, columnName) => {
    // Actualiza el estado de la nueva fila cuando el usuario completa los campos
    setNewRowData({ ...newRowData, [columnName]: e.target.value });
  };

  return (
    <div className="admin-page d-flex flex-column">
      {sessionExpired ? (
        <div className="alert alert-danger">
          Tu sesión ha expirado. Por favor, inicia sesión nuevamente.
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <select
              className="form-select m-3"
              style={{ maxWidth: '200px' }}
              onChange={handleTableChange}
              value={selectedTable}
            >
              <option value="">Seleccionar tabla</option>
              {Object.keys(tableInfo).map((tableName) => (
                <option key={tableName} value={tableName}>
                  {tableInfo[tableName].name}
                </option>
              ))}
            </select>
            {selectedTable && (
              <h2>Tabla {tableInfo[selectedTable].name}</h2>
            )}
          </div>
          {selectedTable && (
            <div>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length + 1}>No hay datos disponibles.</td>
                    </tr>
                  ) : (
                    <>
                      {editedData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {columns.map((column) => (
                            <td key={column}>
                              {row.isEditing ? (
                                <input
                                  type="text"
                                  className="form-control"
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
                              <div className="btn-group">
                                <button className="btn btn-primary" onClick={() => handleSaveChanges(rowIndex)}>Guardar</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteRow(rowIndex)}>Borrar</button>
                              </div>
                            ) : (
                              <div className="btn-group">
                                <button className="btn btn-warning" onClick={() => handleEditRow(rowIndex)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteRow(rowIndex)}>Borrar</button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                  <tr>
                    {columns.map((column) => (
                      <td key={column}>
                        <input
                          type="text"
                          className="form-control"
                          value={newRowData[column] || ''}
                          onChange={(e) => handleNewRowInputChange(e, column)}
                        />
                      </td>
                    ))}
                    <td>
                      <button className="btn btn-success" onClick={handleAddRow}>Agregar</button>
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
