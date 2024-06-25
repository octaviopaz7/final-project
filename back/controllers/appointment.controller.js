import * as appointmentsService from '../services/appointment.service.js';

export const createAppointment = async (req, res) => {
    try {
        const appointment = await appointmentsService.createAppointment(req.body);
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAppointments = async (req, res) => {
    try {
        const appointments = await appointmentsService.getAppointments();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAppointmentById = async (req, res) => {
    try {
        const appointment = await appointmentsService.getAppointmentById(req.params.id);
        if (!appointment) {
            res.status(404).json({ message: 'Appointment not found' });
        } else {
            res.status(200).json(appointment);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateAppointment = async (req, res) => {
    try {
        const appointment = await appointmentsService.updateAppointment(req.params.id, req.body);
        if (!appointment) {
            res.status(404).json({ message: 'Appointment not found' });
        } else {
            res.status(200).json(appointment);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteAppointment = async (req, res) => {
    try {
        const appointment = await appointmentsService.deleteAppointment(req.params.id);
        if (!appointment) {
            res.status(404).json({ message: 'Appointment not found' });
        } else {
            res.status(200).json({ message: 'Appointment deleted' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
