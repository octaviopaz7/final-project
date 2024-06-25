
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { home, services, appointments, contact } from '../routes/routes'; 
import LogoDiente from '../assets/img/LogoDiente.png';

import { useState } from 'react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { home, services, appointments, contact, users } from '../routes/routes.js';
import { useAuth } from '../context/AuthContext.jsx';
import Login from './Login';

const NavMenu = () => {
    const { isAuthenticated, login, logout } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleShowLogin = () => setShowLoginModal(true);
    const handleCloseLogin = () => setShowLoginModal(false);

    return (
        <>
            <Navbar expand="lg" sticky="top" style={{ backgroundColor: '#3d367a' }}>
      <Container>
        <Navbar.Brand as={Link} to={home} className="d-flex align-items-center" style={{ color: '#ffffff' }}>
          <img src={LogoDiente} alt="Logo de Smile Clinic" className="logo-image me-2" style={{ width: '40px', height: 'auto' }} />
          Smile Clinic
        </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-lg`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">


                                {isAuthenticated ? (
                                    <>
                                        <Nav.Link as={Link} to={home} className='nav-link-item fw-semibold' >Inicio</Nav.Link>
                                        <Nav.Link as={Link} to={services} className='nav-link-item fw-semibold' >Servicios</Nav.Link>
                                        <Nav.Link as={Link} to={appointments} className='nav-link-item fw-semibold' >Turnos</Nav.Link>
                                        <Nav.Link as={Link} to={contact} className='nav-link-item fw-semibold' >Contactos</Nav.Link>
                                        <Nav.Link as={Link} to={users} className='nav-link-item fw-semibold' >Registrar</Nav.Link>
                                        <button className="btn btn-nav" onClick={logout}>Cerrar sesión</button>
                                    </>
                                ) : (
                                    <>
                                         <Nav.Link href='#services' className='nav-link-item fw-semibold'>Servicios</Nav.Link>
                                         <Nav.Link href='#abtus' className='nav-link-item fw-semibold' >Sobre Nosotros</Nav.Link>
                                         <Nav.Link href='#appointment' className='nav-link-item fw-semibold'>Turno</Nav.Link>
                                         <Nav.Link href='#contact' className='nav-link-item fw-semibold'>Contacto</Nav.Link>
                                        <button className="btn btn-nav" onClick={handleShowLogin}>Iniciar sesión</button>
                                    </>
                                )}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <Login show={showLoginModal} handleClose={handleCloseLogin} />
        </>
    );
};

export default NavMenu;

