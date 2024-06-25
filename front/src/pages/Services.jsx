import { Container, Col, Row } from "react-bootstrap"
import AddForm from "../components/AddForm"
import Table from '../components/Table';
import '../assets/css/HeaderStyles.css'
import '../assets/css/ServicesStyles.css'

const Services = () => {
  return (
    <>
      <Container>
        <section className="services-section d-flex flex-column">
          <Row>
            <h2 className="text-center subtitle">Agregar Servicio</h2>
            <AddForm />
          </Row>
        </section>
        <section className="services-section d-flex flex-column">
          <Row >
            <h2 className="text-center subtitle">Lista de turnos</h2>
            <Table />
          </Row>
        </section>
      </Container>
    </>
  )
}

export default Services
