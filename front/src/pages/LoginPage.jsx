
import { useState } from "react";
import { Button, Form} from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import video from '../assets/video/video8.mp4'
import '../assets/css/LoginPage.css'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [loginError, setLoginError] = useState(null);
    const [redirectToAdmin, setRedirectToAdmin] = useState(false); 

    const handleLogin = async (event) => {
        event.preventDefault();
        const { success, error } = await login(email, password);
        if (success) {
            setRedirectToAdmin(true);  
            Swal.fire({
                icon: 'success',
                title: '¡Bienvenido!',
                text: 'Has iniciado sesión correctamente.',
            });
        } else {
            setLoginError( 'Usuario o Contraseña incorrecta'); 
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario o Contraseña incorrecta',
            });
        }
    };

    if (redirectToAdmin) {
        return <Navigate to="/inicio" />;
    }

  return (
     <section className='video-container d-flex justify-content-center'>
        <video autoPlay loop muted playsInline src={video} preload="metadata"></video>
        <div className='login-wrap d-flex flex-column justify-content-center align-items-center'>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-center pt-4">
                        <Button className="basic-btn" type="submit">
                            Iniciar Sesión
                        </Button>
                    </div>
                    {loginError && (
                        <div className="text-danger text-center mt-2">{loginError}</div>
                    )}
                </Form>
        </div>
    </section>
  )
}

export default LoginPage