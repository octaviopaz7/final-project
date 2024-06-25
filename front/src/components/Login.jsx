import { useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 

const Login = ({ show, handleClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (response.status === 201) {
                login(); 
                handleClose(); 
            } else {
                console.error('Error durante el inicio de sesión:', response.statusText);
            }
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
        }
    };
    

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Iniciar Sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Correo electronico</Form.Label>
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
                    <div className="d-flex justify-content-center">
                    <Button className="basic-btn" type="submit">
                        Iniciar Sesión
                    </Button>
                    </div>
                </Form>
            </Modal.Body>
    
        </Modal>
    );
};

export default Login;


