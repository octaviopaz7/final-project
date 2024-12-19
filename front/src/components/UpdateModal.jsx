import { useState, useEffect } from "react";
import { Button, Modal, Col, Row } from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { appointmentSchema } from "./validationSchemas";

const UpdateModal = ({ show, handleClose, appointmentId, handleAddAppointment, updateAppointments }) => {
  const [occupiedTimes, setOccupiedTimes] = useState([]);
  const { token } = useAuth();

  const now = new Date();

  const fetchAppointmentDetails = async () => {
    if (appointmentId) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/appointments/${appointmentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { name, phone, appointmentType, date, hour } = response.data;
        const [day, month, year] = date.split("/"); // dd/MM/yyyy
        const dateObject = new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T00:00:00`);

        formik.setValues({
          name,
          phone,
          appointmentType,
          date: dateObject,
          hour,
        });

        const allAppointmentsResponse = await axios.get("http://localhost:5000/api/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const allAppointments = allAppointmentsResponse.data;

        const occupiedTimes = allAppointments
          .filter(
            (appointment) =>
              appointment.date === date && appointment._id !== appointmentId // Excluir la cita actual
          )
          .map((appointment) => appointment.hour);

        setOccupiedTimes(occupiedTimes);
      } catch (error) {
        console.error("Error fetching appointment details:", error);
        Swal.fire({
          icon: "error",
          title: "Error al obtener los detalles",
          text: "No se pudieron cargar los datos del turno.",
        });
      }
    }
  };

  useEffect(() => {
    if (show && appointmentId) {
      fetchAppointmentDetails();
    }
  }, [appointmentId, token, show]);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      appointmentType: "",
      date: new Date(),
      hour: "",
    },
    validationSchema: appointmentSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const updatedAppointment = {
          ...values,
          date: `${values.date.getDate()}/${values.date.getMonth() + 1}/${values.date.getFullYear()}`,
        };

        await axios.put(
          `http://localhost:5000/api/appointments/${appointmentId}`,
          updatedAppointment,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        await handleAddAppointment();
        updateAppointments(); // Llama la función para ordenar y actualizar las citas

        Swal.fire({
          icon: "success",
          title: "Turno actualizado",
          text: "El turno se modificó correctamente.",
        });

        handleCloseAndReset();
      } catch (error) {
        console.error("Error updating appointment:", error);
        Swal.fire({
          icon: "error",
          title: "Error al actualizar",
          text: "No se pudo modificar el turno. Por favor, inténtalo de nuevo.",
        });
      }
    },
  });

  const handleCloseAndReset = () => {
    handleClose();
    formik.resetForm();
    updateAppointments(); // Llama la función para ordenar y actualizar las citas
  };

  const handleDateChange = async (date) => {
    formik.setFieldValue("date", date);

    try {
      const response = await axios.get("http://localhost:5000/api/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allAppointments = response.data;

      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      const occupiedTimes = allAppointments
        .filter((appointment) => appointment.date === formattedDate && appointment._id !== appointmentId)
        .map((appointment) => appointment.hour);

      setOccupiedTimes(occupiedTimes);
    } catch (error) {
      console.error("Error fetching occupied times:", error);
    }
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
          const hourFormatted = hour.toString().padStart(2, "0");
          const minuteFormatted = minute.toString().padStart(2, "0");
          const timeString = `${hourFormatted}:${minuteFormatted}`;

          if (!occupiedTimes.includes(timeString)) {
            times.push(timeString);
          }
        }
      }
    });

    return times;
  };

  return (
    <Modal show={show} onHide={handleCloseAndReset}>
      <Modal.Header closeButton>
        <Modal.Title>Modificar Turno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="invalid-feedback">{formik.errors.name}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="phone">Teléfono</label>
            <input
              id="phone"
              type="text"
              className={`form-control ${formik.touched.phone && formik.errors.phone ? "is-invalid" : ""}`}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="invalid-feedback">{formik.errors.phone}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="appointmentType">Tipo de consulta</label>
            <select
              id="appointmentType"
              className={`form-control ${formik.touched.appointmentType && formik.errors.appointmentType ? "is-invalid" : ""}`}
              value={formik.values.appointmentType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Seleccionar tipo</option>
              <option value="Consulta">Consulta</option>
              <option value="Limpieza">Limpieza</option>
              <option value="Tratamiento">Tratamiento</option>
              <option value="Control">Control</option>
              <option value="Otro">Otro</option>
            </select>
            {formik.touched.appointmentType && formik.errors.appointmentType && (
              <div className="invalid-feedback">{formik.errors.appointmentType}</div>
            )}
          </div>

          <Row>
            <Col md="6">
              <div className="mb-3">
                <label htmlFor="date">Fecha de la cita</label>
                <DatePicker
                  id="date"
                  selected={formik.values.date}
                  onChange={(date) => handleDateChange(date)}
                  dateFormat="dd/MM/yyyy"
                  locale={es}
                  className="form-control"
                  minDate={new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)}
                />
                {formik.touched.date && formik.errors.date && (
                  <div className="invalid-feedback d-block">{formik.errors.date}</div>
                )}
              </div>
            </Col>
            <Col md="6">
              <div className="mb-3">
                <label htmlFor="hour">Hora de la cita</label>
                <select
                  id="hour"
                  className="form-control"
                  value={formik.values.hour}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Seleccionar hora</option>
                  {generateTimes().map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {formik.touched.hour && formik.errors.hour && (
                  <div className="invalid-feedback d-block">{formik.errors.hour}</div>
                )}
              </div>
            </Col>
          </Row>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAndReset}>
              Cerrar
            </Button>
            <Button className="basic-btn" type="submit">
              Modificar
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateModal;
