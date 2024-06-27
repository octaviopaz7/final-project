import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../context/AuthContext';
import { useAppointments } from '../context/AppointmentsContext';

registerLocale('es', es);

const UpdateModal = ({ show, handleClose, appointmentId }) => {
    const [name, setname] = useState('');
    const [phone, setPhone] = useState('');
    const [appointmentType, setAppointmentType] = useState('');
    const [date, setDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);

    const { token } = useAuth();
    const { fetchAppointments } = useAppointments();

    useEffect(() => {
        const fetchAppointmentDetails = async () => {
            if (appointmentId) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/appointments/${appointmentId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const { name, phone, appointmentType, date } = response.data;
                    setname(name);
                    setPhone(phone);
                    setAppointmentType(appointmentType);
                    const appointmentDate = new Date(date);
                    setDate(appointmentDate);
                    setSelectedTime(appointmentDate);
                } catch (error) {
                    console.error('Error fetching appointment details:', error);
                }
            }
        };

        if (show) {
            fetchAppointmentDetails();
        }
    }, [appointmentId, token, show]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const updatedAppointment = {
                name,
                phone,
                appointmentType,
                date: combineDateAndTime(date, selectedTime).toISOString(),
            };

            const response = await axios.put(`http://localhost:5000/api/appointments/${appointmentId}`, updatedAppointment, {
                headers: { Authorization: `Bearer ${token}` },
            });
            await fetchAppointments();

            handleClose();
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };

    const combineDateAndTime = (date, time) => {
        const combinedDateTime = new Date(date);
        combinedDateTime.setHours(time.getHours());
        combinedDateTime.setMinutes(time.getMinutes());
        return combinedDateTime;
    };

    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleTimeChange = (event) => {
        const time = new Date(event.target.value);
        setSelectedTime(time);
    };

    const generateTimes = () => {
        const times = [];
        const intervals = [
            { start: 9, end: 13 },
            { start: 16, end: 19 },
        ];
        const intervalMinutes = 30;

        intervals.forEach(({ start, end }) => {
            for (let hour = start; hour < end; hour++) {
                for (let minute = 0; minute < 60; minute += intervalMinutes) {
                    const time = new Date();
                    time.setHours(hour, minute, 0, 0);
                    times.push(new Date(time));
                }
            }
        });

        return times;
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modificar Turno</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleUpdate}>
                    <Form.Group className="mb-3" controlId="formname">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            required
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAppointmentType">
                        <Form.Label>Tipo de consulta</Form.Label>
                        <Form.Control
                            as="select"
                            value={appointmentType}
                            onChange={(e) => setAppointmentType(e.target.value)}
                            required
                        >
                            <option value="">Seleccionar tipo</option>
                            <option value="Consulta">Consulta</option>
                            <option value="Limpieza">Limpieza</option>
                            <option value="Tratamiento">Tratamiento</option>
                            <option value="Control">Control</option>
                            <option value="Otro">Otro</option>
                        </Form.Control>
                    </Form.Group>
                    <Row>
                        <Col md="6">
                            <Form.Group className="mb-3" controlId="formDate">
                                <Form.Label>Fecha de la cita</Form.Label>
                                <DatePicker
                                    selected={date}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    locale="es"
                                    className="form-control"
                                />
                            </Form.Group>
                        </Col>
                        <Col md="6">
                            <Form.Group className="mb-3" controlId="formTimeAppointment">
                                <Form.Label>Hora de la cita</Form.Label>
                                <select
                                    value={selectedTime ? selectedTime.toISOString() : ''}
                                    onChange={handleTimeChange}
                                    className="form-control"
                                >
                                    <option value="">Seleccionar hora</option>
                                    {generateTimes().map((time, index) => (
                                        <option key={index} value={time.toISOString()}>
                                            {time.toLocaleTimeString('es-ES', { hour: 'numeric', minute: '2-digit' })}
                                        </option>
                                    ))}
                                </select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button className="basic-btn" onClick={handleUpdate}>
                    Modificar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateModal;


