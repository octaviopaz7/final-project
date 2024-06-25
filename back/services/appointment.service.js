import Appointment from '../models/appointment.model.js';

export const createAppointment = async (appointmentData) => {
    try {
        const newAppointment = new Appointment({
            firstName: appointmentData.firstName,
            lastName: appointmentData.lastName,
            phone: appointmentData.phone,
            appointmentType: appointmentData.appointmentType,
            dateAppointment: appointmentData.dateAppointment,
            reminderSent: appointmentData.reminderSent || false,
            status: appointmentData.status || "Pendiente"
        });

        await newAppointment.validate();

        return await newAppointment.save();
    } catch (error) {
        console.error('Error al crear la cita:', error);
        throw new Error(error.message);
    }
};

export const getAppointments = async () => {
    return await Appointment.find();
};

export const getAppointmentById = async (id) => {
    return await Appointment.findById(id);
};

export const updateAppointment = async (id, appointmentData) => {
    return await Appointment.findByIdAndUpdate(id, appointmentData, { new: true });
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
        console.error('Error al actualizar el estado del turno:', error);
        throw new Error(error.message);
    }
};

export const deleteAppointment = async (id) => {
    return await Appointment.findByIdAndDelete(id);
};
