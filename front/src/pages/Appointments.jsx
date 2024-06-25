import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import AddForm from "../components/AddForm";
import Table from "../components/Table";
import axios from 'axios';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/appointments', { withCredentials: true });
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <Container>
            <section className="services-section d-flex flex-column">
                <Row>
                    <h2 className="text-center subtitle">Agregar Turno</h2>
                    <AddForm fetchAppointments={fetchAppointments} />
                </Row>
            </section>
            <section className="services-section d-flex flex-column">
                <Row>
                    <h2 className="text-center subtitle">Lista de turnos</h2>
                    <Table appointments={appointments} />
                </Row>
            </section>
        </Container>
    );
};

export default Appointments;

