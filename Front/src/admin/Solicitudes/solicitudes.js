import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Solicitudes = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);


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
      setLoading(true);
      const response = await axios.post('http://localhost:3000/usuario', user);
 
      console.log('User accepted and added to Usuarios table', response.data);
    
     
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.idUsuario));
      await axios.delete(`http://localhost:3000/solicitudes/${user.idUsuario}`);
      setLoading(false);
      fetchUsers();

      console.log("mailOptions");
      const mailOptions = {
        email: user.email, 
        estado: 'Aprobada', 
 
      };

console.log(mailOptions);
      const mail = await axios.post(`http://localhost:3000/email/solicitud`, mailOptions);
      console.log('Envio de email exitoso', mail.data);


    } catch (error) {
      console.error('Error while accepting the user', error);
    }
  };

  const rejectUser = async (user) => {
    setLoading(true);
    axios.delete(`http://localhost:3000/solicitudes/${user.idUsuario}`)
      .then(async () => {
        setLoading(false);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== user.idUsuario));
  fetchUsers();


  const mailOptions = {
    email: user.email, 
    estado: 'Rechazada',

  };


  const mail = await axios.post(`http://localhost:3000/email/solicitud`, mailOptions);
  console.log('Envio de email exitoso', mail.data);


      })
      .catch((error) => console.error(error));
  };
  

  return (
    <div className='container text-center'>
      <h1 className='text-align-center mt-3'>Solicitudes de nuevos usuarios</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Tipo</th>
            <th>Curso</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
        
              <td>{user.nombre}</td>
              <td>{user.dni}</td>
              <td>{user.tipo}</td>
              <td>{user.curso}</td>
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
      {loading && ( // Condición para mostrar el spinner
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )}
    </div>
  );
}

export default Solicitudes;
