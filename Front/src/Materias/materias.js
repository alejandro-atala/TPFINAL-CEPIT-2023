import React, { useState } from 'react';
import './materias.css';

const Materias = () => {
  //const [editableCells, setEditableCells] = useState([]);
  const [editingCell, setEditingCell] = useState(null);

  const handleEditClick = (cellIndex) => {
    setEditingCell(cellIndex);
  };

  const handleCellBlur = () => {
    setEditingCell(null);
  };

  const renderEditableCell = (cellContent, cellIndex) => {
    return (
      <td
        contentEditable={editingCell === cellIndex}
        onBlur={handleCellBlur}
        onClick={() => handleEditClick(cellIndex)}
      >
        {cellContent}
      </td>
    );
  };

  return (
    <div>
      <h1>
        <a href="usuario-alumno.html">Atras</a>
      </h1>
      <h4>Aquí podrás editar las materias según los días y horarios</h4>
      <div className="table-responsive m-5">
        <table>
          <thead>
            <tr>
              <th>Día/Hora</th>
              <th>8:00-9:00</th>
              <th>9:00-10:00</th>
              <th>10:00-11:00</th>
              <th>11:00-12:00</th>
              <th>12:00-1:00</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lunes</td>
              {renderEditableCell('Matematicas', 0)}
              {renderEditableCell('Fisica', 1)}
              {renderEditableCell('Ingles', 2)}
              {renderEditableCell('Historia', 3)}
              {renderEditableCell('Recreo', 4)}
            </tr>
            <tr>
              <td>Martes</td>
              {renderEditableCell('Biologia', 5)}
              {renderEditableCell('Educación Física', 6)}
              {renderEditableCell('Matematicas', 7)}
              {renderEditableCell('Fisica', 8)}
              {renderEditableCell('Recreo', 9)}
            </tr>
            <tr>
              <td>Miércoles</td>
              {renderEditableCell('Ingles', 10)}
              {renderEditableCell('Historia', 11)}
              {renderEditableCell('Biologia', 12)}
              {renderEditableCell('Educación Física', 13)}
              {renderEditableCell('Recreo', 14)}
            </tr>
            <tr>
              <td>Jueves</td>
              {renderEditableCell('Matematicas', 15)}
              {renderEditableCell('Fisica', 16)}
              {renderEditableCell('Ingles', 17)}
              {renderEditableCell('Historia', 18)}
              {renderEditableCell('Recreo', 19)}
            </tr>
            <tr>
              <td>Viernes</td>
              {renderEditableCell('Biologia', 20)}
              {renderEditableCell('Educación Física', 21)}
              {renderEditableCell('Matematicas', 22)}
              {renderEditableCell('Fisica', 23)}
              {renderEditableCell('Recreo', 24)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Materias;
