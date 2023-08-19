import React, { useState } from 'react';

const Materias = () => {
  const [editableCells, setEditableCells] = useState([]);

  const handleCellClick = (cellIndex) => {
    setEditableCells((prevEditableCells) => {
      if (!prevEditableCells.includes(cellIndex)) {
        return [...prevEditableCells, cellIndex];
      } else {
        return prevEditableCells.filter((index) => index !== cellIndex);
      }
    });
  };

  const handleCellBlur = (cellIndex) => {
    setEditableCells((prevEditableCells) =>
      prevEditableCells.filter((index) => index !== cellIndex)
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
              <th contentEditable={editableCells.includes(0)} onClick={() => handleCellClick(0)}>
                8:00-9:00
              </th>
              <th contentEditable={editableCells.includes(1)} onClick={() => handleCellClick(1)}>
                9:00-10:00
              </th>
              <th contentEditable={editableCells.includes(2)} onClick={() => handleCellClick(2)}>
                10:00-11:00
              </th>
              <th contentEditable={editableCells.includes(3)} onClick={() => handleCellClick(3)}>
                11:00-12:00
              </th>
              <th contentEditable={editableCells.includes(4)} onClick={() => handleCellClick(4)}>
                12:00-1:00
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lunes</td>
              <td contentEditable={editableCells.includes(5)} onClick={() => handleCellClick(5)}>
                Matematicas
              </td>
              <td contentEditable={editableCells.includes(6)} onClick={() => handleCellClick(6)}>
                Fisica
              </td>
              <td contentEditable={editableCells.includes(7)} onClick={() => handleCellClick(7)}>
                Ingles
              </td>
              <td contentEditable={editableCells.includes(8)} onClick={() => handleCellClick(8)}>
                Historia
              </td>
              <td contentEditable={editableCells.includes(9)} onClick={() => handleCellClick(9)}>
                Recreo
              </td>
            </tr>
            <tr>
              <td>Martes</td>
              <td contentEditable={editableCells.includes(10)} onClick={() => handleCellClick(10)}>
                Biologia
              </td>
              <td contentEditable={editableCells.includes(11)} onClick={() => handleCellClick(11)}>
                Educación Física
              </td>
              <td contentEditable={editableCells.includes(12)} onClick={() => handleCellClick(12)}>
                Matematicas
              </td>
              <td contentEditable={editableCells.includes(13)} onClick={() => handleCellClick(13)}>
                Fisica
              </td>
              <td contentEditable={editableCells.includes(14)} onClick={() => handleCellClick(14)}>
                Recreo
              </td>
            </tr>
            <tr>
              <td>Miércoles</td>
              <td contentEditable={editableCells.includes(15)} onClick={() => handleCellClick(15)}>
                Ingles
              </td>
              <td contentEditable={editableCells.includes(16)} onClick={() => handleCellClick(16)}>
                Historia
              </td>
              <td contentEditable={editableCells.includes(17)} onClick={() => handleCellClick(17)}>
                Biologia
              </td>
              <td contentEditable={editableCells.includes(18)} onClick={() => handleCellClick(18)}>
                Educación Física
              </td>
              <td contentEditable={editableCells.includes(19)} onClick={() => handleCellClick(19)}>
                Recreo
              </td>
            </tr>
            <tr>
              <td>Jueves</td>
              <td contentEditable={editableCells.includes(20)} onClick={() => handleCellClick(20)}>
                Matematicas
              </td>
              <td contentEditable={editableCells.includes(21)} onClick={() => handleCellClick(21)}>
                Fisica
              </td>
              <td contentEditable={editableCells.includes(22)} onClick={() => handleCellClick(22)}>
                Ingles
              </td>
              <td contentEditable={editableCells.includes(23)} onClick={() => handleCellClick(23)}>
                Historia
              </td>
              <td contentEditable={editableCells.includes(24)} onClick={() => handleCellClick(24)}>
                Recreo
              </td>
            </tr>
            <tr>
              <td>Viernes</td>
              <td contentEditable={editableCells.includes(25)} onClick={() => handleCellClick(25)}>
                Biologia
              </td>
              <td contentEditable={editableCells.includes(26)} onClick={() => handleCellClick(26)}>
                Educación Física
              </td>
              <td contentEditable={editableCells.includes(27)} onClick={() => handleCellClick(27)}>
                Matematicas
              </td>
              <td contentEditable={editableCells.includes(28)} onClick={() => handleCellClick(28)}>
                Fisica
              </td>
              <td contentEditable={editableCells.includes(29)} onClick={() => handleCellClick(29)}>
                Recreo
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Materias;
