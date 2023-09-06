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
      console.log(response.data);
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
      if (selectedTable === 'materias') {
        const id = editedData[rowIndex].idMateria; // Reemplaza con la clave primaria adecuada     
        const url = `http://localhost:3000/${selectedTable}/${id}`;
        await axios.delete(url);
      } 
      // Verifica si estás tratando con una fila de usuario o curso
      if (selectedTable === 'usuario') {
        const id = editedData[rowIndex].idUsuario; // Reemplaza con la clave primaria adecuada     
        const url = `http://localhost:3000/${selectedTable}/${id}`;
        await axios.delete(url);
      } 
      
      else if (selectedTable === 'curso') {
        const id = editedData[rowIndex].idCurso; // Reemplaza con la clave primaria adecuad
        const url = `http://localhost:3000/${selectedTable}/${id}`;
        await axios.delete(url);
      }
  
      const updatedData = editedData.filter((row, index) => index !== rowIndex);
      setEditedData(updatedData);
    } catch (error) {
      console.error('Error al borrar una fila:', error);
    }
  };


  

  const handleSaveChanges = async (rowIndex) => {
    try {
     
      const { isEditing, ...updatedRow } = editedData[rowIndex]; // Elimina 'isEditing'
      const id = updatedRow.idMateria; //  // Reemplaza con la clave primaria adecuada

      if (selectedTable === 'materias') {
 
        // Validación específica para la edición de cursos
        // Verifica si idCurso y anio están definidos en updatedRow
        if (updatedRow.idMateria === undefined || updatedRow.nombre === undefined) {
     
          console.error('Completa todos los campos requeridos para la edición de cursos.');
          return;
        }
        console.log(updatedRow.idMateria);

        // Realiza la lógica de actualización de cursos
        await axios.put(`http://localhost:3000/${selectedTable}/${id}`, {
          idMateria: updatedRow.idMateria,
          nombre: updatedRow.nombre,
        });        console.log(updatedRow.idMateria, updatedRow.nombre)
      }


    else  if (selectedTable === 'curso') {

      const { isEditing, ...updatedRow } = editedData[rowIndex]; // Elimina 'isEditing'
      const id = updatedRow.idCurso; // Reemplaza con la clave primaria adecuada
        // Validación específica para la edición de cursos
        // Verifica si idCurso y anio están definidos en updatedRow
        if (updatedRow.idCurso === undefined || updatedRow.anio === undefined) {
          console.error('Completa todos los campos requeridos para la edición de cursos.');
          return;
        }
      
        // Realiza la lógica de actualización de cursos
        await axios.put(`http://localhost:3000/${selectedTable}/${id}`, {
          idCurso: updatedRow.idCurso,
          anio: updatedRow.anio,
        });
      } else {
        const id = updatedRow.idUsuario; // Reemplaza con la clave primaria adecuada
        // Validación para la edición de usuarios (como se mencionó anteriormente)
        if (!updatedRow.fechaNac) {
          console.error('La fecha de nacimiento es requerida.');
          return;
        }
  
        // Realiza la lógica de actualización de usuarios
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
    const isDataValid = true;
    try {
    
      if (selectedTable === 'materias') {
        // Validación específica para la creación de cursos
        const requiredFields = ['idMateria', 'nombre'];
  
        const isDataValid = requiredFields.every((field) => newRowData[field] !== undefined && newRowData[field] !== '');
   
        if (!isDataValid) {
          console.error('Completa todos los campos requeridos para crear un curso.');
          return;
        }
      }


     else if (selectedTable === 'curso') {
        // Validación específica para la creación de cursos
        const requiredFields = ['idCurso', 'anio'];
  
        const isDataValid = requiredFields.every((field) => newRowData[field] !== undefined && newRowData[field] !== '');
  
        if (!isDataValid) {
          console.error('Completa todos los campos requeridos para crear un curso.');
          return;
        }
      } else {
      
        // Validación para la creación de usuarios (como se mencionó anteriormente)
        const requiredFields = ['nombre', 'dni', 'fechaNac', 'direccion', 'telefono', 'email', 'password', 'tipo', 'curso'];
  
        const isDataValid = requiredFields.every((field) => newRowData[field] !== undefined && newRowData[field] !== '');
  
        if (!isDataValid) {
          console.error('Completa todos los campos requeridos para crear un usuario.');
          return;
        }
      }

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
      console.log("Nueva fila agregada con exito.")
    } catch (error) {
      console.error('Error al agregar una nueva fila:', error);
    }
  };
  

  const handleNewRowInputChange = (e, columnName) => {
    // Actualiza el estado de la nueva fila cuando el usuario completa los campos
    setNewRowData({ ...newRowData, [columnName]: e.target.value });
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
                          value={newRowData[column] || ''} // Usa el valor de newRowData si está definido
                          onChange={(e) => handleNewRowInputChange(e, column)}
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
