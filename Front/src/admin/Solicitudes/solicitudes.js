import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Solicitudes = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetchUsers();
  }, []);
  


    const fetchUsers= async () => {
    try {
      const response = await axios.get('http://localhost:3000/solicitudes');
      const data = response.data;
      console.log(data)
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
    }

  const acceptUser = async (user) => {
    try {
      // Send a request to accept the user and save their data in the Usuarios table.
      const response = await axios.post('http://localhost:3000/usuario', user);
 
      console.log('User accepted and added to Usuarios table', response.data);

      // After successfully accepting the user, filter out the accepted user and update the state.
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.idUsuario));
      await axios.delete(`http://localhost:3000/solicitudes/${user.idUsuario}`);
      //fetchUsers();

      console.log("mailOptions");
      const mailOptions = {
        email: user.email, // Remitente (debe coincidir con el correo configurado en el transporte)
        estado: 'Aprobada', // Reemplaza con la dirección de correo del destinatario
 
      };

console.log(mailOptions);
      const mail = await axios.post(`http://localhost:3000/email/solicitud`, mailOptions);
      console.log('Envio de email exitoso', mail.data);


    } catch (error) {
      console.error('Error while accepting the user', error);
    }
  };

  const rejectUser = async (user) => {
    // Send a request to reject the user to your backend.
    axios.delete(`http://localhost:3000/solicitudes/${user.idUsuario}`)
      .then(async () => {
        // After successfully rejecting the user, update the local state to remove the rejected user.
        setUsers((prevUsers) => prevUsers.filter((user) => user.idUsuario !== user.idUsuario));
  fetchUsers();


  const mailOptions = {
    email: user.email, // Remitente (debe coincidir con el correo configurado en el transporte)
    estado: 'Rechazada', // Reemplaza con la dirección de correo del destinatario

  };


  const mail = await axios.post(`http://localhost:3000/email/solicitud`, mailOptions);
  console.log('Envio de email exitoso', mail.data);


      })
      .catch((error) => console.error(error));
  };
  

  return (
    <div>
      <h1>Solicitudes de nuevos usuarios</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Tipo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
        
              <td>{user.nombre}</td>
              <td>{user.dni}</td>
              <td>{user.tipo}</td>
              <td>
                <button
                  className="btn btn-success m-2"
                  onClick={() => acceptUser(user)}
                >
                  Aceptar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => rejectUser(user)}
                >
                  Rechazar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Solicitudes;
