import React from 'react';

function AssistanceItem({ assistance }) {
  const { studentName, entryDate, attendanceStatus } = assistance;
  let backgroundColor = "";

  if (attendanceStatus === "Presente") {
    backgroundColor = "green";
  } else if (attendanceStatus === "Media falta") {
    backgroundColor = "yellow";
  } else {
    backgroundColor = "red";
  }

  return (
    <tr>
      <td>{studentName}</td>
      <td>{entryDate}</td>
      <td style={{ backgroundColor }}>
        {attendanceStatus}
      </td>
    </tr>
  );
}

export default AssistanceItem;
