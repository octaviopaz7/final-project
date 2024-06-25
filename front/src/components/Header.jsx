import { Container, Row, Col } from 'react-bootstrap'
import '../assets/css/HeaderStyles.css'
const Header = () => {
  return (
    <>
      <Container fluid className='header-container'>
        <Row className='header-row'>
          <Col md={4} sm={12}>
            <div className="card card-header-img">
            </div>
          </Col>
          <Col md={4} sm={12} className='d-flex flex-column flex-end'>
            <div className="card card-header-title">
              <div className="card-body d-flex flex-column justify-content-end">
                <h1 className='color-white'>Inicio administración</h1>
                <h3 className='color-white'>Administrar turnos</h3>
              </div>
            </div>
          </Col>
        </Row>

      </Container>
    </>
  )
}

export default Header
