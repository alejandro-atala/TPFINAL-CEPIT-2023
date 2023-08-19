import React from 'react';

const Asistencia = () => {
  return (
    <div>
      <h1>Log de asistencias e inasistencias</h1>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Entrada</th>
            <th>Salida</th>
            <th>Asistencia/Inasistencia</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2023-04-21</td>
            <td>09:00</td>
            <td>09:00</td>
            <td>Asistencia</td>
          </tr>
          <tr>
            <td>2023-04-20</td>
            <td>14:30</td>
            <td>09:00</td>
            <td>Inasistencia</td>
          </tr>
          <tr>
            <td>2023-04-19</td>
            <td>10:15</td>
            <td>09:00</td>
            <td>Asistencia</td>
          </tr>
          <tr>
            <td>2023-04-18</td>
            <td>08:45</td>
            <td>09:00</td>
            <td>Asistencia</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Asistencia;
