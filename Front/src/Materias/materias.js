import React, { useState } from 'react';
import './materias.css';
import axios from 'axios';

const Materias = () => {
  const [materiaInputs, setMateriaInputs] = useState([
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
  ]);

  const handleInputChange = (index, value) => {
    const updatedInputs = [...materiaInputs];
    updatedInputs[index] = value;
    setMateriaInputs(updatedInputs);
  };

  const handleSaveClick = async () => {
    try {
      const daysAndTimes = [
        'Lunes 8:00-9:00', 'Lunes 9:00-10:00', 'Lunes 10:00-11:00', 'Lunes 11:00-12:00', 'Lunes 12:00-13:00',
        'Martes 8:00-9:00', 'Martes 9:00-10:00', 'Martes 10:00-11:00', 'Martes 11:00-12:00', 'Martes 12:00-13:00',
        'Miércoles 8:00-9:00', 'Miércoles 9:00-10:00', 'Miércoles 10:00-11:00', 'Miércoles 11:00-12:00', 'Miércoles 12:00-13:00',
        'Jueves 8:00-9:00', 'Jueves 9:00-10:00', 'Jueves 10:00-11:00', 'Jueves 11:00-12:00', 'Jueves 12:00-13:00',
        'Viernes 8:00-9:00', 'Viernes 9:00-10:00', 'Viernes 10:00-11:00', 'Viernes 11:00-12:00', 'Viernes 12:00-13:00',
      ];

      const materiaData = daysAndTimes.map((dayAndTime, index) => ({
        diaHora: dayAndTime,
        materia: materiaInputs[index],
      }));

      const response = await axios.post('http://localhost:3000/materias/guardar', materiaData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(materiaData);
      if (response.status === 200) {
        console.log('Materias guardadas exitosamente');
      } else {
        console.error('Error al guardar las materias');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div>
      {/* ... other components ... */}
      <div className="table-responsive m-5">
        <table>
          <thead>
          <tr>
          <td></td>
              <td>8:00-9:00</td>
              <td>9:00-10:00</td>
              <td>10:00-11:00</td>
              <td>11:00-12:00</td>
              <td>12:00-13:00</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lunes</td>
              {materiaInputs.slice(0, 5).map((input, index) => (
                <td key={index}>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td>Martes</td>
              {materiaInputs.slice(5, 10).map((input, index) => (
                <td key={index + 5}>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => handleInputChange(index + 5, e.target.value)}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td>Miércoles</td>
              {materiaInputs.slice(10, 15).map((input, index) => (
                <td key={index + 10}>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => handleInputChange(index + 10, e.target.value)}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td>Jueves</td>
              {materiaInputs.slice(15, 20).map((input, index) => (
                <td key={index + 15}>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => handleInputChange(index + 15, e.target.value)}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td>Viernes</td>
              {materiaInputs.slice(20, 25).map((input, index) => (
                <td key={index + 20}>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => handleInputChange(index + 20, e.target.value)}
                  />
                </td>
              ))}
            </tr>


          </tbody>
        </table>
      </div>
      <button onClick={handleSaveClick}>Guardar Materias</button>
    </div>
  );
};

export default Materias;
