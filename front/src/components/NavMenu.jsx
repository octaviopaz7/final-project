import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { home, services, appointments, contact } from '../routes/routes'; // Asumiendo que estas son las variables de ruta definidas
import LogoDiente from '../assets/img/LogoDiente.png';

const NavMenu = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <Navbar expand="lg" sticky="top" style={{ backgroundColor: '#3d367a' }}>
      <Container>
        <Navbar.Brand as={Link} to={home} className="d-flex align-items-center" style={{ color: '#ffffff' }}>
          <img src={LogoDiente} alt="Logo de Smile Clinic" className="logo-image me-2" style={{ width: '40px', height: 'auto' }} />
          Smile Clinic
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={home} className="nav-link fw-semibold" style={{ color: '#ffffff' }}>
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to={services} className="nav-link fw-semibold" style={{ color: '#ffffff' }}>
              Servicios
            </Nav.Link>
            <Nav.Link as={Link} to={appointments} className="nav-link fw-semibold" style={{ color: '#ffffff' }}>
              Turnos
            </Nav.Link>
            <Nav.Link as={Link} to={contact} className="nav-link fw-semibold" style={{ color: '#ffffff' }}>
              Contactos
            </Nav.Link>
            {isAuthenticated ? (
              <Button variant="outline-light" onClick={logout}>
                Cerrar sesión
              </Button>
            ) : (
              <Button variant="outline-light" onClick={login}>
                Iniciar sesión
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavMenu
