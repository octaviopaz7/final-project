import { Button, Modal } from 'react-bootstrap';
import { useAppointments } from "../context/AppointmentsContext";
import axios from 'axios';

const DeleteModal = ({ show, handleClose, appointmentId }) => {
    const { fetchAppointments } = useAppointments();

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/appointments/${appointmentId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });


            if (response.status === 204) {
                await fetchAppointments();
                handleClose(); 
            } else {
                throw new Error('Error al eliminar la cita');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Estás seguro de que quieres eliminar esta cita?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;



