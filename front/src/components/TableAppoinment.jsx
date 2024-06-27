import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import UpdateModal from "./UpdateModal";

const Table = ({ appointments }) => {
  const [show, setShow] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentsData, setAppointmentsData] = useState(appointments);
  const handleClose = () => setShow(false);
  const handleShow = (appointmentId) => {
    setSelectedAppointment(appointmentId);
    setShow(true);
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments",
        { withCredentials: true }
      );
      setAppointmentsData(response.data);
    } catch (error) {
      console.error("Error al traer datos de turnos:", error);
    }
  };

  const handleShowUpdateModal = (appointmentId) => {
    setSelectedAppointment(appointmentId);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/appointments/${appointmentId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 204 || response.status === 200) {
        setAppointmentsData((prevAppointments) =>
          prevAppointments.filter(
            (appointment) => appointment._id !== appointmentId
          )
        );
        handleClose();
      } else {
        throw new Error("Error al eliminar el turno");
      }
    } catch (error) {
      console.error("Error al eliminar el turno:", error);
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    // Implementar la lógica para cambiar el estado de la cita
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <>
      {appointmentsData && appointmentsData.length > 0 ? (
        <>
          <table className="table table-striped table-dark caption-top">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Fecha</th>
                <th scope="col">Horario</th>
                <th scope="col">Estado</th>
                <th scope="col">Tipo de Consulta</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {appointmentsData.map((appointment, index) => (
                <tr key={appointment._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{appointment.name}</td>
                  <td>{appointment.phone}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.hour}</td>
                  <td>
                    <select
                      className="form-select"
                      aria-label="Estado del turno"
                      value={appointment.status || ""}
                      onChange={(e) =>
                        handleStatusChange(appointment._id, e.target.value)
                      }
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Confirmado">Confirmado</option>
                      <option value="Completado">Completado</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </td>
                  <td>{appointment.appointmentType}</td>
                  <td className="table-actions">
                    {/*<Button
                      className="btn btn-table"
                      onClick={() => handleShowUpdateModal(appointment._id)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                    <UpdateModal
                      show={showUpdateModal}
                      handleClose={handleCloseUpdateModal}
                      appointmentId={selectedAppointment}
                    />*/}
                    <Button
                      className="btn btn-table basic-btn"
                      onClick={() => handleShow(appointment)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Confirmar Eliminación</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {selectedAppointment && (
                          <>
                            <strong>Paciente:</strong>{" "}
                            {selectedAppointment.name} <br />
                            <strong>Día:</strong> {selectedAppointment.date}
                            <br />
                            <strong>Hora:</strong> {selectedAppointment.hour}
                            <br />
                            <br />
                            <h5>
                              ¿Estás seguro de que quieres eliminar este turno?
                            </h5>
                          </>
                        )}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Cancelar
                        </Button>
                        <Button
                          className="btn basic-btn"
                          onClick={() =>
                            handleDeleteAppointment(selectedAppointment._id)
                          }
                        >
                          Eliminar
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <h3 className="text-center">No hay turnos disponibles</h3>
      )}
    </>
  );
};

export default Table;
