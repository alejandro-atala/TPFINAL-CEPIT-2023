import React from 'react';
import AssistanceItem from './AssistanceItem';

function AssistanceList({ assistances }) {
  return (
    <div>
 
      <table>
        <thead>
          <tr>
            <th>Nombre del Alumno</th>
            <th>Fecha</th>
            <th>Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {assistances.map((assistance, index) => (
            <AssistanceItem key={index} assistance={assistance} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssistanceList;
