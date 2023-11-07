import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Solicitudes = () => {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.get('http://localhost:3000/solicitudes');
      const data = response.data;
      console.log(data)
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const acceptUser = async (user) => {
    try {
      // Send a request to accept the user and save their data in the Usuarios table.
      const response = await axios.post('http://localhost:3000/usuario', user);
      console.log(users);
      console.log('User accepted and added to Usuarios table', response.data);

      // After successfully accepting the user, filter out the accepted user and update the state.
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    } catch (error) {
      console.error('Error while accepting the user', error);
    }
  };

  const rejectUser = (userId) => {
    // Send a request to reject the user to your backend.
    axios.post(`/api/reject-user/${userId}`)
      .then(() => {
        // Update the local state or fetch the updated user list.
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Solicitudes de nuevos usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nombre}</td>
              <td>{user.dni}</td>
              <td>
                <button onClick={() => acceptUser(user)}>Accept</button>
                <button onClick={() => rejectUser(user.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Solicitudes;
