import { Container, Col, Row } from "react-bootstrap"
import { useState, useEffect } from "react";
import axios from "axios";
import AddForm from "../components/AddForm"
import Table from '../components/TableAppoinment';
import '../assets/css/HeaderStyles.css'
import '../assets/css/ServicesStyles.css'

const Services = () => {
  const [services, setServices] = useState([]);

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/services',  { credentials:"include" });
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);
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
            <Table services={services}/>
          </Row>
        </section>
      </Container>
    </>
  )
}

export default Services
