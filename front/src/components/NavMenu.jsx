import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { home, services, appointments, contact } from '../routes/routes.js';
import { useAuth } from '../context/AuthContext.jsx';
const NavMenu = () => {
  const { isAuthenticated, login, logout } = useAuth();
  return (
    <Navbar expand="lg" sticky="top" aria-label="Offcanvas navbar large">
      <Container>
        <Navbar.Brand href="#" className="centered-logo color-blue">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${false}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>

            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {
              isAuthenticated ?
              (<Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to={home} className='nav-link-item fw-semibold' >Inicio</Nav.Link>
              <Nav.Link as={Link} to={services} className='nav-link-item fw-semibold' >Servicios</Nav.Link>
              <Nav.Link as={Link} to={appointments} className='nav-link-item fw-semibold' >Turnos</Nav.Link>
              <Nav.Link as={Link} to={contact} className='nav-link-item fw-semibold' >Contactos</Nav.Link>
              <button className="btn btn-nav" onClick={logout}>Cerrar sesión</button>
            </Nav>) : (
              <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="#home" className='nav-link-item fw-semibold' >Inicio</Nav.Link>
              <Nav.Link as={Link} to="#services" className='nav-link-item fw-semibold' >Servicios</Nav.Link>
              <Nav.Link as={Link} to="#appointments" className='nav-link-item fw-semibold' >Turnos</Nav.Link>
              <Nav.Link as={Link} to="#contact" className='nav-link-item fw-semibold' >Contactos</Nav.Link>
              <button className="btn btn-nav" onClick={login}>Iniciar sesión</button>
            </Nav>
            )

            }

          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default NavMenu
