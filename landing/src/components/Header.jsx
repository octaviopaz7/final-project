import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/css/HeaderStyles.css";
const Header = () => {
  return (
    <>
      <Container fluid className="header-container">
        <Row className="header-row">
          <Col md={4} sm={12}>
            <div className="card card-header-img"></div>
          </Col>
          <Col
            md={4}
            sm={12}
            className="d-flex flex-column flex-end justify-content-center"
          >
            <div className="card card-header-title">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h1 className="color-white fs-1 fw-bold">
                  Inicio administración
                </h1>
              </div>
            </div>
          
            <div className="mt-5 d-flex flex-column align-items-center justify-content-center">
              <Link to="/turnos" className="btn basic-btn w-50 mb-2">
                Administrar turnos
              </Link>
              <Link to="/contactos" className="btn basic-btn w-50 mb-2">
                Mensajes de contacto
              </Link>
              <Link to="/servicios" className="btn basic-btn w-50">
                Ver servicios
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Header;
