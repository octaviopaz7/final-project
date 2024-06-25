// Login.js
import { useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Asegúrate de importar el contexto correctamente

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password }, { withCredentials: true });
            if (response.status === 201) {
                login(); 
                handleClose(); 
            }
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Iniciar sesión
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Login;

