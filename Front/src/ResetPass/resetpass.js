import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPass = () => {


    const [email, setEmail] = useState();
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
        const email = queryParams.get('email');
        setEmail(email);
        console.log('Email de la URL:', email);




    }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente



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

        // Verifica si las contraseñas coinciden
        if (passwordsMatch) {
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
                setShowErrorAlert(true);
                setTimeout(() => {
                    setShowErrorAlert(null);
                }, 2000); // 2000 milisegundos (2 segundos)
            }
        } else {
            alert('Las contraseñas no coinciden. Inténtalo de nuevo.');
        }
    };


    return (
        <div className="container rounded text-center col-xs-12 col-md-4 col-sm-3 p-5 mt-4 bg-sesion">
            <form onSubmit={handlePasswordResetSubmit}>
                <div className="form-group">
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
                    disabled={
                        !passwordsMatch ||
                        passwordResetData.newPassword.trim() === '' ||
                        passwordResetData.confirmPassword.trim() === ''
                    }
                >
                    Actualizar contraseña
                </button>

                <div>
                    {showSuccessAlert && (
                        <Alert variant="success" className="mt-3 text-center">
                            Contraseña actualizada exitosamente.
                        </Alert>
                    )}
                    {showErrorAlert && (
                        <Alert variant="danger" className="mt-3 text-center">
                            Error al actualizar la contraseña
                        </Alert>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ResetPass;
