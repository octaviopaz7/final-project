import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login, home, services, appointments, contact } from '../routes/routes.js'; 
import Swal from 'sweetalert2';

const NavMenu = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate(); 

    const handleLogout = () => {
        logout();
        Swal.fire({
            icon: 'success',
            title: 'Sesión cerrada',
            text: 'Has cerrado sesión correctamente.',
        }).then(() => {
            navigate(login); // Redirige a la ruta de login
        });
    };

    return (
        <>
            <Navbar expand="lg" sticky="top" style={{ backgroundColor: '#88b5bf' }}>
                <Container>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-lg`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                        placement="center"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-center flex-grow-1 pe-3">
                                {isAuthenticated ? (
                                    <>
                                        <Nav.Link as={Link} to={home} className='nav-link-item fw-semibold'>Inicio</Nav.Link>
                                        <Nav.Link as={Link} to={services} className='nav-link-item fw-semibold'>Servicios</Nav.Link>
                                        <Nav.Link as={Link} to={appointments} className='nav-link-item fw-semibold'>Turnos</Nav.Link>
                                        <Nav.Link as={Link} to={contact} className='nav-link-item fw-semibold'>Contactos</Nav.Link>
                                        <button className="btn btn-nav-b ms-4" onClick={handleLogout}>Cerrar sesión</button>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link href='#services' className='nav-link-item fw-semibold'>Servicios</Nav.Link>
                                        <Nav.Link href='#abtus' className='nav-link-item fw-semibold'>Sobre Nosotros</Nav.Link>
                                        <Nav.Link href='#appointment' className='nav-link-item fw-semibold'>Turno</Nav.Link>
                                        <Nav.Link href='#contact' className='nav-link-item fw-semibold'>Contacto</Nav.Link>
                                        <button className="btn btn-nav ms-4" onClick={() => navigate(login)}>Iniciar sesión</button>
                                    </>
                                )}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
};

export default NavMenu;
