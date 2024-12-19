import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoDiente from '../assets/img/LogoDiente.png';
import { useState } from 'react';
import { home, services, appointments, contact } from '../routes/routes.js'; 
//import Login from './Login';
import Swal from 'sweetalert2';

const NavMenu = () => {

    return (
        <>
            <Navbar expand="lg" sticky="top" style={{ backgroundColor: '#88b5bf' }}>
                <Container>
                    {/*<Navbar.Brand as={Link} to={home} className="d-flex align-items-center" style={{ color: '#ffffff' }}>
                        <img src={LogoDiente} alt="Logo de Smile Clinic" className="logo-image me-2" style={{ width: '40px', height: 'auto' }} />
                        Smile Clinic
                    </Navbar.Brand>*/}
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-lg`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                        placement="start"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-center flex-grow-1 pe-3">
                            
                                        <Nav.Link as={Link} to={home} className='nav-link-item fw-semibold' >Inicio</Nav.Link>
                                        <Nav.Link as={Link} to={services} className='nav-link-item fw-semibold' >Servicios</Nav.Link>
                                        <Nav.Link as={Link} to={appointments} className='nav-link-item fw-semibold' >Turnos</Nav.Link>
                                        <Nav.Link as={Link} to={contact} className='nav-link-item fw-semibold' >Contactos</Nav.Link>
                                    
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
};

export default NavMenu;


