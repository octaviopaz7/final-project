import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import '../assets/css/TableStyles.css';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
import axios from 'axios'
import { useAppointments } from '../context/AppointmentsContext';

const Table = ({ appointments }) => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const { fetchAppointments } = useAppointments();

    const handleShowUpdateModal = (appointmentId) => {
        setSelectedAppointmentId(appointmentId);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const handleShowDeleteModal = (appointmentId) => {
        setSelectedAppointmentId(appointmentId);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    const handleStatusChange = async (appointmentId, newStatus) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/appointments/${appointmentId}`, { status: newStatus }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (response.status !== 200) {
                throw new Error('Error al actualizar el estado de la cita');
            }

            fetchAppointments();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            {appointments && appointments.length > 0 ? (
                <table className="table table-striped table-dark caption-top">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Tipo de Consulta</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={appointment._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{appointment.firstName}</td>
                                <td>{appointment.lastName}</td>
                                <td>{appointment.phone}</td>
                                <td>{appointment.appointmentType}</td>
                                <td>{formatDate(appointment.dateAppointment)}</td>
                                <td>
                                    <select
                                        className="form-select"
                                        aria-label="Estado del turno"
                                        value={appointment.status}
                                        onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                                    >
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="Confirmado">Confirmado</option>
                                        <option value="Completado">Completado</option>
                                        <option value="Cancelado">Cancelado</option>
                                    </select>

                                </td>
                                <td className="table-actions">
                                    <Button className="btn btn-table" onClick={() => handleShowUpdateModal(appointment._id)}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </Button>
                                    <UpdateModal show={showUpdateModal} handleClose={handleCloseUpdateModal} appointmentId={selectedAppointmentId} />
                                    <Button className="btn btn-table basic-btn" onClick={() => handleShowDeleteModal(appointment._id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                    <DeleteModal show={showDeleteModal} handleClose={handleCloseDeleteModal} appointmentId={selectedAppointmentId} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h3 className="text-center">No hay turnos disponibles</h3>
            )}
        </>
    );
};

export default Table;




