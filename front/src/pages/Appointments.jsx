import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import AddForm from "../components/AddForm";
import Table from "../components/TableAppoinment";
import axios from 'axios';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/appointments',  { credentials:"include" });
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
            <section className="appointment-section d-flex flex-column align-items-center justify-content-center">
                <Row className='w-100 py-5'>
                    <h2 className="text-center subtitle">Agregar Turno</h2>
                    <AddForm fetchAppointments={fetchAppointments} />
                </Row>
                <Row className='py-5'>
                    <h2 className="text-center subtitle">Lista de turnos</h2>
                    <Table appointments={appointments} />
                </Row>
            </section>
        </Container>
    );
};

export default Appointments;

