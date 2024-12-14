import Appointment from "../models/appointment.model.js";

export const createAppointment = async (appointmentData) => {
  try {
    const newAppointment = new Appointment({
      name: appointmentData.name,
      phone: appointmentData.phone,
      appointmentType: appointmentData.appointmentType,
      date: appointmentData.date,
      hour: appointmentData.hour,
      reminderSent: appointmentData.reminderSent || false,
      status: appointmentData.status || "Pendiente",
    });

    await newAppointment.validate();

    return await newAppointment.save();
  } catch (error) {
    console.error("Error al crear la cita:", error);
    throw new Error(error.message);
  }
};

export const getAppointments = async () => {
  return await Appointment.find();
};

export const getAppointmentById = async (id) => {
  return await Appointment.findById(id);
};

export const getAppointmentByPhone = async (phone) => {
  return await Appointment.findOne({ phone: phone, status: "Pendiente" });
};

export const getAppointmentsByDate = async (date) => {
  try {
    // Valida que la fecha esté en formato DD/MM/AAAA
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(date)) {
      throw new Error(
        "El formato de la fecha es inválido. Debe ser DD/MM/AAAA."
      );
    }

    // Realiza la consulta con el formato adecuado
    return await Appointment.find({ date: date, status: "Confirmado" });
  } catch (error) {
    console.error("Error al buscar citas por fecha:", error);
    throw new Error(error.message);
  }
};

export const updateStatusAppointment = async (id, newStatus) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );

    return appointment;
  } catch (error) {
    console.error("Error al actualizar el estado del turno:", error);
    throw new Error(error.message);
  }
};

export const deleteAppointment = async (id) => {
  return await Appointment.findByIdAndDelete(id);
};

export const updateAppointment = async (id, appointmentData) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      appointmentData,
      { new: true, runValidators: true }
    );

    return updatedAppointment;
  } catch (error) {
    console.error("Error al actualizar la cita:", error);
    throw new Error(error.message);
  }
};
