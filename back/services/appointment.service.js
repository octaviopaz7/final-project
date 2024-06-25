import Appointment from '../models/appointment.model.js';

export const createAppointment = async (appointmentData) => {
    const appointment = new Appointment(appointmentData);
    return await appointment.save();
};

export const getAppointments = async () => {
    return await Appointment.find().populate('patient professional service');
};

export const getAppointmentById = async (id) => {
    return await Appointment.findById(id).populate('patient professional service');
};

export const updateAppointment = async (id, appointmentData) => {
    return await Appointment.findByIdAndUpdate(id, appointmentData, { new: true });
};

export const deleteAppointment = async (id) => {
    return await Appointment.findByIdAndDelete(id);
};
