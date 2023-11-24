import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPass = () => {


    const [email, setEmail] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const navigate = useNavigate();
    const [passwordResetData, setPasswordResetData] = useState({
        newPassword: '',
        confirmPassword: ''
    });


    useEffect(() => {
        // Obtén el email de la URL
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('email');
        setEmail(token);
    
        validarToken(token);
    }, []);

    const validarToken = async (token) => {

        try {
            // Realiza una solicitud al servidor para validar el token
            const response = await axios.post('http://localhost:3000/usuario/resetpassword/token', { token });
       
           console.log("esperando...", response)
         
            // La respuesta del servidor indicará si el token es válido
            if (!response.data.message ==='Token activo') {
                console.log('El token no es válido');
                setShowErrorAlert("Token expirado");
                setTimeout(() => {
                    setShowErrorAlert(null);
                    // Puedes redirigir al usuario a otra página aquí si lo deseas
                }, 4000);
            }
        } catch (error) {
            console.error('Error al validar el token:', error);
            setShowErrorAlert("Token expirado");
            setTimeout(() => {
                setShowErrorAlert(null);
            }, 4000);
        }
    };
    
 
 
    
      




    const handlePasswordResetChange = (e) => {
        const { id, value } = e.target;
        setPasswordResetData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const passwordsMatch = passwordResetData.newPassword === passwordResetData.confirmPassword;

    const handlePasswordResetSubmit = async (e) => {
        e.preventDefault();
    
        if (passwordsMatch && passwordResetData.newPassword.length >= 8) {
            try {
                const requestData = {
                    email,
                    newPassword: passwordResetData.newPassword,
                };
    
                // Envia la solicitud para restablecer la contraseña
                const response = await axios.post(
                    `http://localhost:3000/usuario/resetpassword/email/`,
                    requestData
                );
    
                // Maneja la respuesta de la API, por ejemplo, mostrar un mensaje de éxito
                console.log('Contraseña actualizada con éxito:', response.data);
                setShowSuccessAlert(true);
                setTimeout(() => {
                    setShowSuccessAlert(null);
                    navigate('/iniciarSesion');
                }, 2000); // 2000 milisegundos (2 segundos)
    
            } catch (error) {
                console.error('Error al restablecer la contraseña:', error.response.data);
                setShowErrorAlert("Token expirado");
                setTimeout(() => {
                    setShowErrorAlert(null);
                }, 2000); // 2000 milisegundos (2 segundos)
            }
        } else if (!passwordsMatch) {
            setShowErrorAlert("Las contraseñas no coinciden. Inténtalo de nuevo.");
            setTimeout(() => {
                setShowErrorAlert(null);
            }, 4000);
        } else if (passwordResetData.newPassword.length < 8) {
            setShowErrorAlert("La nueva contraseña debe tener al menos 8 caracteres.");
            setTimeout(() => {
                setShowErrorAlert(null);
            }, 4000);
        }
    };
    
    


    return (
        <div className="container d-flex justify-content-center align-items-center ">
        <div className="container rounded text-center col-xs-12 col-md-4 col-sm-3 p-5 align-items-center bg-sesion">
            <form onSubmit={handlePasswordResetSubmit}>
                <div className="form-group ">
                    <label htmlFor="newPassword">Nueva contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        value={passwordResetData.newPassword}
                        onChange={handlePasswordResetChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar nueva contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={passwordResetData.confirmPassword}
                        onChange={handlePasswordResetChange}
                    />
                </div>


                <button
                    type="submit"
                    className="btn btn-primary btn-block m-2"
                    onClick={handlePasswordResetSubmit}
                >
                    Actualizar contraseña
                </button>

                <div>
                    {showErrorAlert && (
                        <Alert variant="danger" className="mt-3 text-center">
                             {showErrorAlert}
                            {/* {passwordsMatch
                                ? "Las contraseñas no coinciden o la nueva contraseña tiene menos de 8 caracteres."
                                : "Las contraseñas no coinciden o la nueva contraseña tiene menos de 8 caracteres."
                            } */}
                        </Alert>
                    )}
                </div>



                <div>
                    {showSuccessAlert && (
                        <Alert variant="success" className="mt-3 text-center">
                            Contraseña actualizada exitosamente.
                        </Alert>
                    )}
                    {/* {showErrorAlert && (
                        <Alert variant="danger" className="mt-3 text-center">
                            Error al actualizar la contraseña. Token expirado
                        </Alert>
                    )} */}
                </div>
            </form>
        </div>
        </div>
    );
};

export default ResetPass;
